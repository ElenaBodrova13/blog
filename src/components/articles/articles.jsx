import React from 'react'
import { connect } from 'react-redux'

import Avatar from '../avatar'
import Author from '../author'
import * as actions from '../../actions'
import reduseText from '../reduserText'

import s from './articles.module.css'

function Articles({ slug, title, text, avatar, name, time, tag, countHearts, favorited }) {
  const newText = text || ''

  return (
    <div className={s.wrapperMain}>
      <div className={s.wrapperTitle}>
        <Author slug={slug} title={title} countHearts={countHearts} tag={tag} favorited={favorited} />

        <div className={s.text}>{reduseText(newText, 30)}</div>
      </div>
      <Avatar time={time} avatar={avatar} name={name} />
    </div>
  )
}

function mapSate() {
  return {}
}
export default connect(mapSate, actions)(Articles)
