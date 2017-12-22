import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'
import HttpProvider from '@cerebral/http'
import { redirectToSignal } from '@cerebral/router/operators'
import storage from '@cerebral/storage'

import app from './modules/app'
import blog from './modules/blog'
import profile from './modules/profile'
import auth from './modules/auth'
import router from './router'
import { AuthenticationError } from './modules/app/errors'

const jwtHeader = localStorage.getItem('jwtHeader')
  ? JSON.parse(localStorage.getItem('jwtHeader'))
  : null

const devtools =
  process.env.NODE_ENV === 'production'
    ? null
    : Devtools({ host: 'localhost:8585' })

export default Controller({
  devtools,
  modules: {
    app,
    blog,
    profile,
    auth,
    router,
    storage: storage({ target: localStorage }),
  },
  providers: [
    HttpProvider({
      baseUrl: 'https://conduit.productionready.io/api',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Authorization: 'Token ' + jwtHeader,
      },
    }),
  ],
  catch: new Map([
    [
      AuthenticationError,
      redirectToSignal('app.pageRouted', { page: 'login' }),
    ],
  ]),
})
