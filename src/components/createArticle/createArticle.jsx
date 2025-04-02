import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import * as actions from '../../actions'
import ErrorMessage from '../errorMessage'

import s from './createArticle.module.css'

function CreateArticle({ articleCreate, newSlug, delSlug, slugId, onEdit, oldArticle, delEditArticle }) {
  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [{ name: ' ' }],
    },
  })

  const article = {}
  const onSubmit = (data) => {
    article.title = data.title
    article.description = data.description
    article.body = data.text
    article.tagList = data.tags.map((item) => item.name)

    articleCreate(article, slugId)

    reset()
  }
  const { fields, append, remove, update } = useFieldArray({
    name: 'tags',
    control,
  })

  useEffect(() => {
    if (onEdit) {
      reset({
        title: oldArticle.title,
        description: oldArticle.description,
        text: oldArticle.body,
      })
      oldArticle.tagList.forEach((oldTag, index) => {
        update(index, { name: oldTag })
      })
    }
  }, [reset])

  if (newSlug) {
    delSlug()
    delEditArticle()
    return <Redirect to="/" />
  }
  return (
    <form className={s.gridConteiner} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.h1}>Create new article</h1>

      <div className={s.title}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            placeholder="Title"
            /* eslint-disable react/jsx-props-no-spreading */ {...register('title', {
              required: 'Username field is required.',
            })}
          />
          <ErrorMessage someErr={errors.title} />
        </label>
      </div>
      <div className={s.description}>
        <label htmlFor="description">
          Short description
          <input
            id="description"
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Username field is required.',
            })}
          />
          <ErrorMessage someErr={errors.description} />
        </label>
      </div>
      <div className={s.text}>
        <label htmlFor="text">
          Text
          <textarea
            id="text"
            type="text"
            placeholder="Text"
            {...register('text', { required: 'Username field is required.' })}
          />
          <ErrorMessage someErr={errors.text} />
        </label>
      </div>
      <div className={s.tags}>
        <label htmlFor="tag">
          Tags
          <div className={s.tagsbuttons}>
            <div className={s.forLabel}>
              {fields.map((item, index) => (
                <div key={item.id} className={s.row}>
                  <input
                    id="tag"
                    type="text"
                    placeholder="Tag"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(`tags.${index}.name`, { required: 'Username field is required.' })}
                  />

                  <button type="button" onClick={() => remove(index)} className={s.delete}>
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  append({ name: '' })
                }}
              >
                Add tag
              </button>
            </div>
          </div>
        </label>
      </div>
      <div className={s.btnWrapper}>
        <button className={s.btn} type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
function mapSate(state) {
  return {
    newSlug: state.newSlug,
    onEdit: state.onEdit,
    oldArticle: state.article,
  }
}
export default connect(mapSate, actions)(CreateArticle)
