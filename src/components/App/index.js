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
  },
  function App({ currentPage }) {
    const Page = pages[currentPage || 'home']

    return [
      <Header key="header" />,
      <Page key="page" />,
      <Footer key="footer" />,
    ]
  }
)
