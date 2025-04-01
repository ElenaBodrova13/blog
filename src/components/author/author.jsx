import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import reduseText from '../reduserText'
import reduseTags from '../reduserTTags'

import s from './author.module.css'

function Author({
  slug,
  title,
  tag,
  countHearts,
  estimateArticle,
  favoriteArticle,
  delHeart,
  toggleHeart,
  user,
  articles,
  favorited,
}) {
  let newCount = countHearts

  newCount = favoriteArticle && favoriteArticle.slug === slug ? favoriteArticle.favoritesCount : newCount

  const link = slug ? <Link to={`/articles/${slug}`}>{reduseText(title, 5)}</Link> : null
  const showTitle = !slug ? <div>{title}</div> : null

  const tagElement = tag.map((t) => <Tag tagText={t} key={`${t}${Math.random()}`} />)
  const topicElement = !slug ? tagElement : reduseTags(tagElement, 10)

  let flagShow =
    articles.length > 0 && slug ? articles.filter((article) => article.slug === slug)[0].favorited : favorited

  flagShow = favoriteArticle && favoriteArticle.slug === slug ? favoriteArticle.favorited : flagShow

  const showHeart = !flagShow ? (
    <HeartOutlined
      onClick={() => {
        if (user) {
          estimateArticle(slug)
          toggleHeart(true, slug)
        }
      }}
      style={{
        color: '#000000BF',
        alignItems: 'flex-start',
      }}
    />
  ) : (
    <HeartFilled
      onClick={() => {
        if (user) {
          delHeart(slug)
          toggleHeart(false, slug)
        }
      }}
      style={{
        color: '#FF0707',
        alignItems: 'flex-start',
      }}
    />
  )

  return (
    <>
      <div className={s.conteinerTitle}>
        <div className={s.title}>
          {link}
          {showTitle}
        </div>
        {showHeart}
        <p className={s.count}>{newCount}</p>
      </div>
      <div className={s.tagConteiner}>{topicElement}</div>
    </>
  )
}

function mapSate(state) {
  return {
    favoriteArticle: state.favoriteArticle,
    articles: state.articles,
    user: state.user,
  }
}
export default connect(mapSate, actions)(Author)

function Tag({ tagText }) {
  if (tagText) return <div className={s.tag}>{tagText}</div>
}
