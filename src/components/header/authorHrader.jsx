import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Avatar from '../avatar'
import * as actions from '../../actions'

import s from './header.module.css'

function AuthorHeader({ name, logOut, user }) {
  return (
    <>
      <div className={s.btnWrapperAuthor}>
        <button className={s.btnAutor} type="button">
          <Link to="/new-article">Create article</Link>
        </button>
      </div>
      <Link to="/profile">
        <Avatar name={name} avatar={user.image} />
      </Link>
      <div className={s.btnWrapperAuthor}>
        <button
          className={s.btnLogout}
          type="button"
          onClick={() => {
            logOut()
          }}
        >
          Log Out
        </button>
      </div>
    </>
  )
}
function mapSate(state) {
  return {
    user: state.user,
  }
}
export default connect(mapSate, actions)(AuthorHeader)
