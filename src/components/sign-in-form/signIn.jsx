import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import * as actions from '../../actions'
import ErrorMessage from '../errorMessage'

import s from './signIn.module.css'

function SignIn({ logIn, currentUser }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const user = {}
  function onSubmit(data) {
    user.email = data.email
    user.password = data.password
    logIn(user)
  }

  if (currentUser) {
    return <Redirect to="/" />
  }
  return (
    <div className={s.formConteiner}>
      <h1>Sign In</h1>

      <form action="#" method="get" className={s.formInput} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={s.labelData}>
          Email
          <input
            id="email"
            className={errors.email ? s.error : s.formData}
            type="email"
            required
            placeholder="Email address"
            /* eslint-disable react/jsx-props-no-spreading */
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
            })}
          />
          <ErrorMessage someErr={errors.password} />
        </label>

        <div className={s.btnWrapper}>
          <button id="fast" className={s.btn} type="submit">
            Login
          </button>
        </div>
        <p className={s.signIn}>
          Don’t have an account? <Link to="sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  )
}

function mapSate(state) {
  return {
    currentUser: state.user,
  }
}
export default connect(mapSate, actions)(SignIn)
