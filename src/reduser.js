const initialState = {
  article: null,
  articles: [],
  isDone: false,
  error: null,
  user: JSON.parse(window.sessionStorage.getItem('currentUser')),
  currentPage: [1],
  totalPages: [10],
  offset: 0,
  slug: '',
  newSlug: '',
  ready: false,
  onEdit: false,
  heart: false,
  favoriteArticle: null,
}

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_HEART':
      return {
        ...state,
        articles: state.articles.map((article) => {
          article.new = article.slug === action.slug ? action.flag : article.new
          return article
        }),
      }

    case 'CLICK_EDIT_ARTICLE':
      return { ...state, onEdit: true }
    case 'DEL_EDIT_ARTICLE':
      return { ...state, onEdit: false }
    case 'PAGINATION':
      return { ...state, currentPage: action.payload, offset: action.offset }
    case 'GET_ARTICLES_COUNT':
      return { ...state, totalPages: action.payload }
    case 'PUT_FAVORITE':
      return { ...state, favoriteArticle: action.payload }
    case 'REC_DONE':
      return { ...state, isDone: true }
    case 'IS_READY':
      return { ...state, ready: !state.ready }
    case 'PUT_SLUG':
      return { ...state, slug: action.payload }
    case 'PUT_CREATED_SLUG':
      return { ...state, newSlug: action.payload }
    case 'DEL_SLUG':
      return { ...state, newSlug: '' }
    case 'PUT_CURRENT_USER':
      window.sessionStorage.setItem('currentUser', JSON.stringify(action.payload))
      return { ...state, user: JSON.parse(window.sessionStorage.getItem('currentUser')) }
    case 'LOG_OUT':
      window.sessionStorage.removeItem('currentUser')
      return { ...state, user: null, isAuthor: false }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        articles: [...action.payload],
      }
    case 'PUT_ARTICLE':
      return { ...state, article: action.payload }
    case 'REQ_ERROR':
      return {
        ...state,

        error: action.payload,
      }

    default:
      return state
  }
}

export default rootReducer
