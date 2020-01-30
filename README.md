# use-form

![NPM Version](https://img.shields.io/npm/v/@pickjunk/use-form.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@pickjunk/use-form.svg)

React Form Hook, so young, so simple.

### Quick Start

```bash
$ npm i -S @pickjunk/use-form
```

```javascript
import React from 'react';
import useForm from '@pickjunk/use-form';

export default function Greeting() {
  const form = useForm({
    who: {
      initValue: '',
      validators: [v => (!v ? 'who is required!' : '')],
    },
  });

  return (
    <div>
      <div style={{ marginBottom: 8 }}>hello {form.data('who') || '____'}</div>

      {form.field('who', function({
        value,
        setValue,
        validate,
        error,
        status,
      }) {
        return (
          <>
            <div>
              <input
                value={value}
                onChange={function(e) {
                  const v = e.currentTarget.value;
                  validate(v);
                  setValue(v);
                }}
              />
            </div>
            {status === 'fail' && <div style={{ color: 'red' }}>{error}</div>}
          </>
        );
      })}

      <button
        style={{ marginTop: 8 }}
        onClick={async function() {
          const valid = await form.validate();
          if (valid) {
            // submit
          }
        }}
      >
        submit
      </button>
    </div>
  );
}
```

### Define Fields

`useForm` accept one argument to define fields.

```typescript
interface Fields {
  [field: string]: {
    initValue: any;
    validators?: ((v: any) => string)[];
  };
}
```

Caution that you must not change the number and the sort of the fields in every rendering within the component. Because `useForm` will iterate the fields object and use react hook in the iteration. More details could be found in [react hook official document](https://reactjs.org/docs/hooks-rules.html).

### Form Field

Once you have defined a form, feel free to render every field by `form.field` decorators. The decorator has two parameters, the first is field name, the second is a rendering callback.

In the rendering callback, things are intuitive. All status and methods about the field will be exported from the first parameter of the callback. They are `value`, `setValue`, `validate`, `status` and `error`.

Quick Start have demonstrated how things work. No much more to tell. If you want to know more details, typescript hints may help you when typing code.

### Form Data

Get field data by `form.data`.

- If you provide a field name, it will return the single field value: `const who = form.data('who')`.

- If you don't provide any field name, it will return all values of the fields, as a data object: `const { who } = form.data()`.

Besides, remember the data object returned from `form.data()` is immutable, whick means it will always be a different reference as long as any of its properties has been changed.

### Form Validate

Simply call `await form.validate()` when you want to validate all form fields before submitting, as Quick Start shows.

### Internal Debounce

The validators of @pickjunk/use-form support debounce internally:

```javascript
async function nameValid(name: string) {
  await new Promise(function (r) {
    setTimeout(r, 2000);
  });

  return '';
}
nameValid.debounce = 1500;

const form = useForm({
  name: {
    initValue: '',
    validators: [nameValid],
  },
});
```

### Sub Form

The most powerful feature of @pickjunk/use-form is the elegant sub form. Look at the following example:

```TSX
import React from 'react';
import useForm from '@pickjunk/use-form';

function SubForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const form = useForm({
    value: {
      initValue: '',
      validators: [v => (!v ? 'who is required!' : '')],
    },
  });

  form.link('value', { value, onChange });

  return form.field('value', function({
    value,
    setValue,
    validate,
    error,
    status,
  }) {
    return (
      <>
        <div>
          <input
            value={value}
            onChange={function(e) {
              const v = e.currentTarget.value;
              validate(v);
              setValue(v);
            }}
          />
        </div>
        {status === 'fail' && <div style={{ color: 'red' }}>{error}</div>}
      </>
    );
  });
}

export default function Greeting() {
  const form = useForm({
    who: {
      initValue: '',
    },
  });

  return (
    <div>
      <div style={{ marginBottom: 8 }}>hello {form.data('who') || '____'}</div>

      {form.field('who', function({ value, setValue }) {
        return <SubForm value={value} onChange={setValue} />;
      })}

      <button
        style={{ marginTop: 8 }}
        onClick={async function() {
          const valid = await form.validate();
          if (valid) {
            // submit
          }
        }}
      >
        submit
      </button>
    </div>
  );
}
```

Obviously, it is equal to Quick Start. The different point is in the example in Sub Form, the input component is wrapped as a sub component. And in the sub component, a sub form is created.

Noticed that when we talk about sub form, actually it means two points:

- In one hand, we want the sub form to take charge of its own validators. Besides, when calling `form.validate()` in the parent form, we expect the parent can notify all children to validate themselves.

- In the other hand, we want to collect data from every children as a parent field value.

@pickjunk/use-form concrete these two points so wisely.

For the first point, an internal context will be created by every `form.field` decorator. Through these contexts, a tree of the form instances could be maintained. So it's easy to call `form.validate` in the parent form to notify all children validating themselves.

For the second point, `form.link` is provided to connect the data flow between parent and chilren easily. It has two types:

- If you provide the field name, it links a single field of the sub form: `form.link('field', { value, onChange })`.

- If you don't provide any field name, it links the whole data object of the sub form: `form.link({ value, onChange })`. Once again to remind, the data object is immutable.
