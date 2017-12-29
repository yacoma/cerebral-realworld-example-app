import mock from 'xhr-mock'
import { CerebralTest } from 'cerebral/test'

import { AuthenticationError } from './errors'
import app from '.'

let cerebral

beforeEach(() => {
  localStorage.removeItem('jwtHeader')
  mock.setup()
  cerebral = CerebralTest(app)
})

test('should authenticate when valid token in localStorage', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(validJWT))
  return cerebral
    .runSignal('appMounted')
    .then(({ state }) => [expect(state.auth.authenticated).toBe(true)])
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
