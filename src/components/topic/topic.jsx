import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import Avatar from '../avatar'
import Author from '../author'
import * as actions from '../../actions'

import ButtonsTopic from './buttonsTopic'
import s from './topic.module.css'

function Topic({ getArticle, putSlug, slugId, article }) {
  putSlug(slugId)
  useEffect(() => {
    getArticle()
  }, [slugId])

  if (article) {
    return (
      <div className={s.wrapperMain}>
        <div className={s.wrapperTitle}>
          <Author
            slug={slugId}
            title={article.title}
            countHearts={article.favoritesCount}
            tag={article.tagList}
            favorited={article.favorited}
          />

          <div className={s.description}>{article.description}</div>
          <div className={s.text}>
            {' '}
            <Markdown>{article.body}</Markdown>{' '}
          </div>
        </div>
        <div>
          <Avatar time={article.createdAt} avatar={article.author.image} name={article.author.username} />
          <ButtonsTopic currentSlug={slugId} />
        </div>
      </div>
    )
  }
}
function mapSate(state) {
  return {
    article: state.article,
    user: state.user,
  }
}
export default connect(mapSate, actions)(Topic)
