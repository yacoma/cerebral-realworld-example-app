import mock from 'xhr-mock'
import storage from '@cerebral/storage'
import http from '@cerebral/http'
import { redirectToSignal } from '@cerebral/router/operators'
import { CerebralTest } from 'cerebral/test'

import app from '.'
import auth from '../auth'
import { AuthenticationError } from './errors'

let cerebral

beforeEach(() => {
  mock.setup()
  localStorage.removeItem('jwtHeader')
  cerebral = CerebralTest({
    modules: {
      app,
      auth,
      storage: storage({ target: localStorage }),
    },
    providers: [
      http({
        baseUrl: '/api',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Token ' + validJWT,
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
})

test('should authenticate when valid token in localStorage', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(validJWT))
  return cerebral
    .runSignal('app.appMounted')
    .then(({ state }) => [expect(state.auth.authenticated).toBe(true)])
})

test('unauthenticated route to settings should redirect to login', async () => {
  const error = await cerebral.runSignal('app.pageRouted', {
    page: 'settings',
  })

  expect(error).toThrowError(
    AuthenticationError,
    'You must log in to view this page'
  )
  expect(cerebral.getState('app.currentPage')).toBe('login')
  expect(cerebral.getState('app.lastVisited')).toBe('settings')
})
