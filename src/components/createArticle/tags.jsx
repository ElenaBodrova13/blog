import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

export default function Tags() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      tag: [{ firstName: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  })

  const onSubmit = (data) => console.log('data', data)

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(`tag.${index}.firstName`, { required: true })}
            />

            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ firstName: '6' })
          }}
        >
          append
        </button>
      </section>

      <input type="submit" />
    </form>
  )
}
