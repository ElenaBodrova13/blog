import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import * as actions from '../../actions'
import ErrorMessage from '../errorMessage'
import AlertMessage from '../alertMassege'

import s from './signUp.module.css'

function SignUp({ getToken, currentUser, dellError }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,

    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const user = {}
  function onSubmit(data) {
    user.username = data.username
    user.email = data.email
    user.password = data.password

    getToken(user)
    reset()
  }

  const passwordWatch = watch('password')
  if (currentUser) {
    return <Redirect to="/" />
  }
  return (
    <div className={s.formConteiner}>
      <h1>Create new account</h1>

      <form
        className={s.formInput}
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          dellError()
        }}
      >
        <label htmlFor="name" className={s.labelData}>
          Username
          <input
            id="name"
            className={errors.username ? s.error : s.formData}
            type="text"
            required
            placeholder="Username"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('username', {
              required: 'Username field is required.',
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
            required
            placeholder="Email address"
            {...register('email', {
              required: 'email field is required.',
              pattern: {
                value: /^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <ErrorMessage someErr={errors.email} />
        </label>
        <label htmlFor="password" className={s.labelData}>
          Password
          <input
            id="password"
            className={errors.password ? s.error : s.formData}
            type="password"
            required
            placeholder="Password"
            {...register('password', {
              required: 'Password field is required.',
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
        <label htmlFor="repeat" className={s.labelData}>
          Repeat Password
          <input
            id="repeat"
            className={errors.repeatPassword ? s.error : s.formData}
            type="password"
            required
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Password field is required.',
              validate: {
                passwordEqual: (value) => value === passwordWatch || 'Password must match!',
              },
            })}
          />
          <ErrorMessage someErr={errors.repeatPassword} />
        </label>

        <div>
          <div className={s.checkboxWrapper}>
            <label htmlFor="check" className={s.label}>
              <input id="check" type="checkbox" {...register('isAgree', { required: 'field is required.' })} />
              <span className={s.span}>I agree to the processing of my personal information</span>
            </label>
          </div>

          <div className={s.btnWrapper}>
            <button id="fast" className={s.btn} type="submit">
              Create
            </button>
          </div>
          <p className={s.signIn}>
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </p>
        </div>
      </form>
      <AlertMessage />
    </div>
  )
}

function mapSate(state) {
  return {
    currentUser: state.user,
  }
}
export default connect(mapSate, actions)(SignUp)
