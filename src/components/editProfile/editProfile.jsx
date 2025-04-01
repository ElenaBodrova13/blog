import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import * as actions from '../../actions'
import ErrorMessage from '../errorMessage'

import s from './editProfile.module.css'

function EditProfile({ editProfile, ready, isReady }) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const userdata = {}

  function onSubmit(data) {
    if (!Object.keys(data).every((key) => data[key] === undefined || data[key] === '')) {
      userdata.email = data.email
      userdata.username = data.username

      userdata.password = data.password
      userdata.image = data.URL

      editProfile(userdata)

      reset()
    }
  }

  if (ready) {
    isReady()
    return <Redirect to="/" />
  }

  return (
    <div className={s.formConteiner}>
      <h1>Edit Profile</h1>

      <form className={s.formInput} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className={s.labelData}>
          Username
          <input
            id="name"
            className={errors.username ? s.error : s.formData}
            type="text"
            placeholder="Username"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('username', {
              required: false,
              minLength: {
                value: 3,
                message: 'Your Username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your Username must consist of no more than 20 characters.',
              },
            })}
          />
          <ErrorMessage someErr={errors.username} />
        </label>

        <label htmlFor="email" className={s.labelData}>
          Email
          <input
            id="email"
            className={errors.email ? s.error : s.formData}
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: false,
              pattern: {
                value: /^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <ErrorMessage someErr={errors.email} />
        </label>
        <label htmlFor="password" className={s.labelData}>
          New password
          <input
            id="password"
            className={errors.password ? s.error : s.formData}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: false,
              minLength: {
                value: 3,
                message: 'Your Password needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your Password must consist of no more than 40 characters.',
              },
            })}
          />
          <ErrorMessage someErr={errors.password} />
        </label>
        <label htmlFor="url" className={s.labelData}>
          Avatar Image (url)
          <input
            id="url"
            className={errors.repeatPassword ? s.error : s.formData}
            type="url"
            placeholder="Avatar Image"
            {...register('URL', {})}
          />
          <ErrorMessage someErr={errors.repeatPassword} />
        </label>
        <ErrorMessage someErr={errors.message} />
        <div>
          <div className={s.btnWrapper}>
            <button className={s.btn} type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function mapSate(state) {
  return {
    ready: state.ready,
  }
}
export default connect(mapSate, actions)(EditProfile)
