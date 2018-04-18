import mock from 'xhr-mock'
import { CerebralTest } from 'cerebral/test'

import * as constants from '../constants.js'
import { AuthenticationError } from './errors'
import app from '.'

let cerebral

beforeEach(() => {
  localStorage.removeItem('jwtHeader')
  mock.setup()
  mock.get(/^.*\/articles(\?.*)?$/, (req, res) => {
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(constants.jsonResponse.articles)
  })
  mock.get(/^.*\/tags\/?$/, (req, res) => {
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(constants.jsonResponse.tags)
  })
  mock.get(constants.apiUrl + '/user', (req, res) => {
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(constants.jsonResponse.user)
  })

  cerebral = CerebralTest(app)
})

test('should authenticate when valid token in localStorage', async () => {
  expect.assertions(5)

  localStorage.setItem(
    'jwtHeader',
    JSON.stringify(constants.authHeader.validJWT)
  )
  cerebral.setState('hasAuthenticated', false)

  await cerebral
    .runSignal('editorRouted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(true),
      expect(state.auth.currentUser.email).toBe('test@example.com'),
      expect(state.auth.currentUser.username).toBe('Tester'),
      expect(state.auth.currentUser.bio).toBe('My Bio.'),
      expect(state.auth.currentUser.image).toBe('image.png'),
    ])
})

test('unauthenticated route to settings should redirect to login', async () => {
  expect.assertions(3)

  await expect(
    cerebral.runSignal('pageRouted', { page: 'settings' })
  ).rejects.toEqual(
    new AuthenticationError('You must log in to view this page')
  )
  expect(cerebral.getState('lastVisited')).toBe('settings')
  expect(cerebral.getState('currentPage')).toBe('login')
})
