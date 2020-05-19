import React, {
  useState,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Subject, timer } from 'rxjs';
import { switchMap, map, debounce } from 'rxjs/operators';

export interface Fields {
  [field: string]: {
    initValue?: any;
    validators?: {
      validator: (v: any) => Promise<string> | string;
      debounce?: number;
    }[];
  };
}

interface InnerForm {
  fields: {
    [field: string]: FormField;
  };
  values: {
    [field: string]: any;
  };
  children: Set<InnerForm>;
  mutex: boolean;

  field: FieldDecorator;
  data: Data;
  validate: Validate;
  link: Link;
}

// status machine:
// none -> pending
// pending -> success / fail
// success / fail -> pending
export type Status = 'none' | 'pending' | 'success' | 'fail';

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

export interface Validate {
  (field?: string, value?: any): Promise<any>;
}

export interface Data {
  (
    field?:
      | string
      | {
          [field: string]: any;
        },
    value?: any,
  ): any;
}

export interface FieldDecorator {
  (field: string, render: FieldRender): ReactNode;
}

export interface Link {
  (field: string | LinkProps, props?: LinkProps): void;
}

export interface LinkProps {
  value?: any;
  onChange?: (v: any) => void;
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

export interface Form {
  field: FieldDecorator;
  data: Data;
  validate: Validate;
  link: Link;
}

const ctx = React.createContext<Set<InnerForm> | null>(null);

export default function useForm(fields: Fields): Form {
  const [form] = useState(function () {
    const form: InnerForm = {
      fields: {},
      values: {},
      children: new Set<InnerForm>(),

      field(field, render) {
        if (!form.fields[field]) {
          throw new Error(`unknown form field [${field}]`);
        }

        const { value, setValue, status = 'none', error = '' } = form.fields[
          field
        ];

        return (
          <ctx.Provider value={form.children}>
            {render({
              value,
              setValue,
              status,
              error,
              validate: function (value) {
                return form.validate(field, value);
              },
            })}
          </ctx.Provider>
        );
      },

      data(field, value) {
        if (typeof field === 'string') {
          const formField = form.fields[field];
          if (!formField) {
            throw new Error(`unknown form field [${field}]`);
          }

          if (value !== undefined) {
            formField.setValue(value);
            return;
          }

          return form.values[field];
        }

        if (typeof field === 'object') {
          for (let f in field) {
            form.data(f, field[f]);
          }
          return;
        }

        return form.values;
      },

      async validate(field, v) {
        if (field) {
          if (!form.fields[field]) {
            throw new Error(`unknown form field [${field}]`);
          }

          const { validate$, validated, value } = form.fields[field];

          if (!validate$) {
            throw new Error(
              `form field [${field}] has not any validator, can not be validated`,
            );
          }

          validate$.next(v !== undefined ? v : value);
          return validated;
        }

        const validations = [];
        // breadth-first validating
        const queue = [form];
        while (true) {
          const form = queue.shift();
          if (!form) break;

          for (let field in form.fields) {
            const { validate$, validated, value } = form.fields[field];
            if (validate$ && validated) {
              validate$.next(value);
              validations.push(validated);
            }
          }

          queue.push(...form.children);
        }

        return Promise.all(validations).then(function (results) {
          for (let r of results) {
            if (r === false) {
              return false;
            }
          }

          return true;
        });
      },

      // We must use a mutex to make sure "set value" and "onChange"
      // are not triggered at the same data flow circle.
      // Or infinite loop occurs if the initial value are not
      // equal to the value from props, which often happens!
      mutex: false,
      link(field, props) {
        let f: string | undefined;
        if (typeof field === 'string') {
          f = field;
        }

        let p: LinkProps;
        if (!props) {
          p = field as LinkProps;
        } else {
          p = props;
        }

        if ('value' in p) {
          useEffect(
            function () {
              if ('onChange' in p) {
                form.mutex = !form.mutex;
                if (!form.mutex) return;
              }

              if (f !== undefined) {
                form.data(f, p.value[f]);
                return;
              }

              form.data(p.value);
            },
            [p.value],
          );
        }
        if ('onChange' in p) {
          useEffect(
            function () {
              if ('value' in p) {
                form.mutex = !form.mutex;
                if (!form.mutex) return;
              }

              p.onChange!(form.data(f));
            },
            [form.data(f)],
          );
        }
      },
    };

    // init field validation pipelines
    for (let field in fields) {
      const { validators = [] } = fields[field];

      form.fields[field] = {} as FormField;
      const formField = form.fields[field];

      if (validators.length > 0) {
        const validate$ = new Subject<any>();
        formField.validate$ = validate$;

        let pipeline$ = validate$.pipe(
          switchMap(async function (v) {
            formField.setStatus!('pending');
            formField.setError!('');
            return {
              value: v,
              error: '',
            };
          }),
        );
        for (let v of validators) {
          if (v.debounce) {
            pipeline$ = pipeline$.pipe(
              debounce(function ({ error }) {
                // console.log(
                //   `debounce-${field}-${validators.indexOf(validator)}`,
                // );
                return timer(error ? 0 : v.debounce);
              }),
            );
          }

          pipeline$ = pipeline$.pipe(
            switchMap(async function ({ value, error }) {
              // console.log(`validate-${field}-${validators.indexOf(validator)}`);
              if (!error) {
                error = await v.validator(value);
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
        formField.validated = new Promise(function (resolve, reject) {
          validateResolve = resolve;
          validateReject = reject;
        });
        pipeline$
          .pipe(
            map(function ({ error }) {
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
            function (r) {
              validateResolve(r);
              formField.validated = new Promise(function (resolve, reject) {
                validateResolve = resolve;
                validateReject = reject;
              });
            },
            function (e) {
              validateReject(e);
              formField.validated = new Promise(function (resolve, reject) {
                validateResolve = resolve;
                validateReject = reject;
              });
            },
          );
      }
    }

    return form;
  });

  // attach value, setValue, status, setStatus, error, setError to form field
  for (let field in fields) {
    const { initValue, validators = [] } = fields[field];

    const formField = form.fields[field];

    const [value, setValue] = useState(initValue);
    form.values[field] = value;
    formField.value = value;
    formField.setValue = function (v: any) {
      form.values = { ...form.values };
      setValue(v);
    };

    if (validators.length > 0) {
      const [status, setStatus] = useState<Status>('none');
      formField.status = status;
      formField.setStatus = setStatus;

      const [error, setError] = useState('');
      formField.error = error;
      formField.setError = setError;
    }
  }

  // if parent form exists, attach form instance to it as a child
  const children = useContext(ctx);
  if (children) {
    useEffect(function () {
      children.add(form);
      return function () {
        children.delete(form);
      };
    }, []);
  }

  return form;
}
