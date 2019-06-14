import React, { useState, ReactNode } from 'react';
import { Subject, timer } from 'rxjs';
import { switchMap, map, debounce } from 'rxjs/operators';

// status machine:
// none -> pending
// pending -> success / fail
// success / fail -> pending

export interface Fields {
  [field: string]: {
    initValue?: any;
    validators?: Validate[];
  };
}

export interface Validate {
  (v: any): Promise<string> | string;
  debounce?: number;
}

interface InnerForm {
  [field: string]: FormField;
}

type Status = 'none' | 'pending' | 'success' | 'fail';

interface FormField {
  value: any;
  setValue: React.Dispatch<any>;
  status?: Status;
  setStatus?: React.Dispatch<React.SetStateAction<Status>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  validate$?: Subject<any>;
  validated?: Promise<boolean>;
}

export interface FieldRender {
  (params: {
    value: any;
    setValue: React.Dispatch<any>;
    status: Status;
    error: string;
    validate: (value: any) => Promise<any>;
  }): ReactNode;
}

export interface FormData {
  [field: string]: any;
}

export interface Form {
  field(field: string, render: FieldRender): ReactNode;
  validate: (field?: string, value?: any) => Promise<any>;
  data: (
    field?:
      | string
      | {
          [field: string]: any;
        },
    value?: any,
  ) => any;
}

export default function useForm(fields: Fields): Form {
  const [form] = useState(function() {
    const form: InnerForm = {};

    for (let field in fields) {
      const { validators = [] } = fields[field];

      form[field] = {} as FormField;
      const formField = form[field];

      if (validators.length > 0) {
        const validate$ = new Subject<any>();
        formField.validate$ = validate$;

        let pipeline$ = validate$.pipe(
          switchMap(async function(v) {
            formField.setStatus!('pending');
            formField.setError!('');
            return {
              value: v,
              error: '',
            };
          }),
        );
        for (let validator of validators) {
          if (validator.debounce) {
            pipeline$ = pipeline$.pipe(
              debounce(function({ error }) {
                // console.log(
                //   `debounce-${field}-${validators.indexOf(validator)}`,
                // );
                return timer(error ? 0 : validator.debounce);
              }),
            );
          }

          pipeline$ = pipeline$.pipe(
            switchMap(async function({ value, error }) {
              // console.log(`validate-${field}-${validators.indexOf(validator)}`);
              if (!error) {
                error = await validator(value);
              }

              return {
                value,
                error,
              };
            }),
          );
        }

        let validateResolve: (v?: boolean) => void;
        let validateReject: (e?: any) => void;
        formField.validated = new Promise(function(resolve, reject) {
          validateResolve = resolve;
          validateReject = reject;
        });
        pipeline$
          .pipe(
            map(function({ error }) {
              if (error) {
                formField.setStatus!('fail');
                formField.setError!(error);
                return false;
              }

              formField.setStatus!('success');
              formField.setError!('');
              return true;
            }),
          )
          .subscribe(
            function(r) {
              validateResolve(r);
              formField.validated = new Promise(function(resolve, reject) {
                validateResolve = resolve;
                validateReject = reject;
              });
            },
            function(e) {
              validateReject(e);
              formField.validated = new Promise(function(resolve, reject) {
                validateResolve = resolve;
                validateReject = reject;
              });
            },
          );
      }
    }

    return form;
  });

  for (let field in fields) {
    const { initValue, validators = [] } = fields[field];

    const formField = form[field];

    const [value, setValue] = useState(initValue);
    formField.value = value;
    formField.setValue = setValue;

    if (validators.length > 0) {
      const [status, setStatus] = useState<Status>('none');
      formField.status = status;
      formField.setStatus = setStatus;

      const [error, setError] = useState('');
      formField.error = error;
      formField.setError = setError;
    }
  }

  async function validate(field?: string, value?: any): Promise<any> {
    if (field) {
      if (!form[field]) {
        throw new Error(`unknown form field [${field}]`);
      }

      const { validate$, validated } = form[field];

      if (!validate$) {
        throw new Error(
          `form field [${field}] has not any validator, can not be validated`,
        );
      }

      validate$.next(value !== undefined ? value : form[field].value);
      return validated;
    }

    const validations = [];
    for (let field in form) {
      if (form[field].validate$) {
        validations.push(validate(field));
      }
    }

    return Promise.all(validations).then(function(results) {
      for (let r of results) {
        if (r === false) {
          return false;
        }
      }

      return true;
    });
  }

  function data(field?: string | { [field: string]: any }, value?: any) {
    if (typeof field === 'string') {
      const formField = form[field];
      if (!formField) {
        throw new Error(`unknown form field [${field}]`);
      }

      if (value !== undefined) {
        formField.setValue(value);
        return;
      } else {
        return formField.value;
      }
    }

    if (typeof field === 'object') {
      for (let f in field) {
        data(f, field[f]);
      }
      return;
    }

    const result = {} as {
      [field: string]: any
    };
    for (let field in form) {
      result[field] = data(field);
    }
    return result;
  }

  return {
    field(field: string, render: FieldRender): ReactNode {
      if (!form[field]) {
        throw new Error(`unknown form field [${field}]`);
      }

      const { value, setValue, status = 'none', error = '' } = form[field];

      return render({
        value,
        setValue,
        status,
        error,
        validate: function(value) {
          return validate(field, value);
        },
      });
    },
    validate,
    data,
  };
}
