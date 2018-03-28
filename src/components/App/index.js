import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import Settings from '../Settings'
import Profile from '../Profile'
import Article from '../Article'
import Editor from '../Editor'
import Header from './Header'
import Footer from './Footer'

const pages = {
  home: Home,
  login: Login,
  register: Register,
  settings: Settings,
  profile: Profile,
  article: Article,
  editor: Editor,
}

export default connect(
  {
    currentPage: state`currentPage`,
    pageIsLoading: state`pageIsLoading`,
  },
  function App({ currentPage, pageIsLoading }) {
    const Page = pages[currentPage || 'home']

    return (
      <div style={{ opacity: pageIsLoading ? 0.7 : 1 }}>
        <Header />
        <Page />
        <Footer />
      </div>
    )
  }
)
