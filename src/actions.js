import axios from 'axios'

import FetchServise from './fetchServise'

const f = new FetchServise()

export const clickEditArticle = () => ({ type: 'CLICK_EDIT_ARTICLE' })

export const delEditArticle = () => ({ type: 'DEL_EDIT_ARTICLE' })
export const fetchSuccess = (articles) => ({
  type: 'FETCH_SUCCESS',
  payload: articles,
})

export const putFavorite = (article) => ({
  type: 'PUT_FAVORITE',
  payload: article,
})

export const toggleHeart = (flag, slug) => ({
  type: 'TOGGLE_HEART',
  slug,
  flag,
})
export const putArticle = (article) => ({
  type: 'PUT_ARTICLE',
  payload: article,
})
export const pagination = (page) => ({ type: 'PAGINATION', payload: page, offset: (page - 1) * 5 })

export const getArticlesCount = (count) => ({ type: 'GET_ARTICLES_COUNT', payload: Math.floor(count / 5) })
export const reqDone = () => ({ type: 'REC_DONE' })

export const reqTicketsError = (e) => ({
  type: 'REQ_ERROR',
  payload: e,
})

export const dellError = () => ({
  type: 'DEL_ERROR',
})

export const errWork = () => async (dispatch) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      dispatch(reqTicketsError(err.response))
      if (axios.isAxiosError(err)) {
        console.log(err.response, 'err1')
        console.log(err.response.data.errors, 'err2')
      } else if (err instanceof Error) {
        console.log(err.message)
      }

      return Promise.reject(err)
    }
  )
}
export const putSlug = (slug) => ({
  type: 'PUT_SLUG',
  payload: slug,
})

export const putCreatedSlug = (slug) => ({
  type: 'PUT_CREATED_SLUG',
  payload: slug,
})

export const delSlug = () => ({
  type: 'DEL_SLUG',
})
export const isReady = () => ({
  type: 'IS_READY',
})
export const logOut = () => ({
  type: 'LOG_OUT',
})
export const putCarrentUser = (user) => ({ type: 'PUT_CURRENT_USER', payload: user })

export const logIn = (dataUser) => async (dispatch) => {
  try {
    const response = await f.loginUser(dataUser)
    console.log(4, response)
    if (response && response.status === 200) {
      dispatch(putCarrentUser(response.data.user))
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    dispatch(errWork())
  }
}

export const getToken = (dataUser) => async (dispatch) => {
  try {
    const response = await f.registrationUser(dataUser)

    if (response.status === 200) {
      dispatch(putCarrentUser(response.data.user))
      const TOKEN = response.data.user.token

      axios.interceptors.request.use((config) => {
        axios.defaults.headers.common.Authorization = `Token ${TOKEN}`

        return config
      })
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const getAllOfsetArticles = () => async (dispatch, getState) => {
  try {
    const response = await f.getAllArticles(getState().offset)

    if (response.status === 200) {
      dispatch(fetchSuccess(response.data.articles))
      dispatch(getArticlesCount(response.data.articlesCount))
      dispatch(reqDone())
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const getArticle = () => async (dispatch, getState) => {
  try {
    const response = await f.fetchArticle(getState().slug)
    if (response.status === 200) {
      dispatch(putArticle(response.data.article))
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}
export const articleCreate = (article, slugId) => async (dispatch, getState) => {
  try {
    const onEd = getState().onEdit

    const response = !onEd ? await f.createArticle(article) : await f.editArticle(article, slugId)

    if (response.status === 200) {
      dispatch(putCreatedSlug(response.data.article.slug))
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    dispatch(errWork())
  }
}

export const articleEdit = (article, slugId) => async (dispatch) => {
  try {
    const response = await f.editArticle(article, slugId)

    if (response.status === 200) {
      dispatch(putCreatedSlug(response.data.article.slug))
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const articleDelete = (slug) => async (dispatch) => {
  try {
    const response = await f.deleteArticle(slug)

    if (response.status < 300) {
      dispatch(isReady())
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const getEditedProfile = () => async (dispatch) => {
  try {
    const response = await f.getProfile()

    if (response.status === 200) {
      dispatch(putCarrentUser(response.data.user))
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const editProfile = (data) => async (dispatch) => {
  try {
    const response = await f.putProfile(data)

    if (response.status === 200) {
      dispatch(isReady())
      dispatch(getEditedProfile())
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      // For any other server error
      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}

export const estimateArticle = (slug) => async (dispatch) => {
  try {
    const response = await f.putHeart(slug)

    if (response.status === 200) {
      dispatch(putFavorite(response.data.article))
      dispatch(getAllOfsetArticles())
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}
export const delHeart = (slug) => async (dispatch) => {
  try {
    const response = await f.deleteHeart(slug)

    if (response.status === 200) {
      dispatch(putFavorite(response.data.article))
      dispatch(getAllOfsetArticles())
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(errWork())
  }
}
