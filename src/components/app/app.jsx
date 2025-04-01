import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from '../header'
import SignUp from '../sign-up-form'
import SignIn from '../sign-in-form'
import ArticlesList from '../articlesList'
import Topic from '../topic'
import CreateArticle from '../createArticle'
import EditProfile from '../editProfile'

import s from './app.module.css'

function App() {
  return (
    <Router>
      <div className={s.fon}>
        <div className={s.wrapper}>
          <Header />
          <div className={s.mane}>
            <Route path="/" exact component={ArticlesList} />

            <Route path="/sign-up" component={SignUp} />

            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/profile" exact component={EditProfile} />
            <Route path="/articles" exact component={ArticlesList} />
            <Route path="/new-article" exact component={CreateArticle} />
            <Route
              path="/articles/:slug"
              exact
              render={({ match }) => {
                const { slug } = match.params
                return <Topic slugId={slug} />
              }}
            />
            <Route
              path="/articles/:slug/edit"
              exact
              render={({ match }) => {
                const { slug } = match.params
                return <CreateArticle slugId={slug} />
              }}
            />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
