import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import AuthorHeader from './authorHrader'
import s from './header.module.css'

function Header({ user, delEditArticle }) {
  const visualElement = user ? <AuthorHeader name={user.username} /> : <CommonProfile />
  return (
    <header>
      <div className={s.header}>
        <button
          type="button"
          className={s.h1}
          onClick={() => {
            delEditArticle()
          }}
        >
          <Link to="/">Realword Blog</Link>
        </button>

        <div className={s.buttons}>{visualElement}</div>
      </div>
    </header>
  )
}
function mapSate(state) {
  return {
    user: state.user,
  }
}
export default connect(mapSate, actions)(Header)

function CommonProfile() {
  return (
    <>
      <div className={s.btnWrapper}>
        <button className={s.btn} type="button">
          <Link to="/sign-in">Sign In</Link>
        </button>
      </div>
      <div className={s.btnWrapper}>
        <button className={s.btn} type="button">
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    </>
  )
}
