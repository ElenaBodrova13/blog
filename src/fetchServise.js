import axios from 'axios'

const BASE_TOKEN = JSON.parse(window.sessionStorage.getItem('currentUser'))
  ? `Token ${JSON.parse(window.sessionStorage.getItem('currentUser')).token}`
  : null

const BASE_URL_API = 'https://blog-platform.kata.academy/api/'
axios.defaults.baseURL = BASE_URL_API

axios.defaults.headers.common = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: BASE_TOKEN,
}

export default class FetchServise {
  registrationUser = async (user) => {
    const res = await axios.post('users', { user })

    return res
  }

  loginUser = async (user) => {
    const res = await axios.post('users/login', { user })

    return res
  }

  getAllArticles = async (set) => {
    const res = await axios.get('articles', {
      params: { offset: set, limit: 5 },
    })

    return res
  }

  fetchArticle = async (slug) => {
    const res = await axios.get(`articles/${slug}`, {})

    return res
  }

  createArticle = async (article) => {
    const res = await axios.post('articles', { article })

    return res
  }

  editArticle = async (article, slug) => {
    const res = await axios.put(`articles/${slug}`, { article })

    return res
  }

  deleteArticle = async (slug) => {
    const res = await axios.delete(`articles/${slug}`)

    return res
  }

  putProfile = async (user) => {
    const res = await axios.put('user', { user })

    return res
  }

  getProfile = async () => {
    const res = await axios.get('user')

    return res
  }

  putHeart = async (slug) => {
    const res = await axios.post(`articles/${slug}/favorite`)

    return res
  }

  deleteHeart = async (slug) => {
    const res = await axios.delete(`articles/${slug}/favorite`)

    return res
  }
}
