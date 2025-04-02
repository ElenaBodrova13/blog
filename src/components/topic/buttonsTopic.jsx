import React from 'react'
import { connect } from 'react-redux'
import { message, Popconfirm } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import * as actions from '../../actions'

import s from './topic.module.css'

function ButtonsTopic({ articleDelete, currentSlug, ready, isReady, clickEditArticle, user, article }) {
  const confirm = (e) => {
    articleDelete(currentSlug)
    console.log(e)
    message.success('Click on Yes')
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  if (ready) {
    isReady()
    return <Redirect to="/" />
  }
  let blockButtons = true

  if (user) {
    blockButtons = article.author.username !== user.username
  }

  const clasDel = blockButtons ? s.dis : s.delete
  const clasEdit = blockButtons ? s.dis : s.btn
  return (
    <div className={s.twoButtons}>
      <div className={s.btnWrapper}>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          placement="rightTop"
        >
          <button className={clasDel} type="button" disabled={blockButtons}>
            Delete
          </button>
        </Popconfirm>
      </div>
      <div className={s.btnWrapper}>
        <Link to={`/articles/${currentSlug}/edit`}>
          <button
            disabled={blockButtons}
            className={clasEdit}
            type="button"
            onClick={() => {
              clickEditArticle()
            }}
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  )
}

function mapSate(state) {
  return {
    article: state.article,
    ready: state.ready,
    user: state.user,
  }
}
export default connect(mapSate, actions)(ButtonsTopic)
