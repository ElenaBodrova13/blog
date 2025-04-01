import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert, Pagination } from 'antd'

import * as actions from '../../actions'
import Articles from '../articles'
import Loading from '../loading'

function ArticlesList({
  articles,
  getAllOfsetArticles,
  pagination,
  currentPage,
  totalPages,
  isDone,

  error,
}) {
  useEffect(() => {
    getAllOfsetArticles()
  }, [])
  const elements = articles.map((a) => (
    <Articles
      title={a.title}
      name={a.author.username}
      text={a.body}
      avatar={a.author.image}
      time={a.createdAt}
      tag={a.tagList}
      countHearts={a.favoritesCount}
      slug={a.slug}
      favorited={a.favorited}
      key={a.slug}
    />
  ))

  let louder
  if (!isDone && articles.length === 0) {
    louder = <Loading />
  }

  const mistake = error ? (
    <Alert message="Что то пошло не совсем по плану" description={`Произошла ошибка: ${error.message}`} type="error" />
  ) : null
  return (
    <>
      {mistake}
      {elements}
      {louder}
      <Pagination
        align="center"
        current={currentPage}
        total={totalPages}
        onChange={(page) => {
          pagination(page)

          getAllOfsetArticles()
        }}
        pageSize={5}
      />
    </>
  )
}
function mapSate(state) {
  return {
    articles: state.articles,
    isDone: state.isDone,
    error: state.error,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
  }
}
export default connect(mapSate, actions)(ArticlesList)
