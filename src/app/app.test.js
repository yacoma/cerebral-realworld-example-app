import mock from 'xhr-mock'
import { CerebralTest } from 'cerebral/test'

import app from '.'

let cerebral

beforeEach(() => {
  mock.setup()
  localStorage.removeItem('jwtHeader')
  cerebral = CerebralTest(app)
})

test('should authenticate when valid token in localStorage', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(validJWT))
  return cerebral
    .runSignal('appMounted')
    .then(({ state }) => [expect(state.auth.authenticated).toBe(true)])
})

test('unauthenticated route to settings should redirect to login', async () => {
  await expect(
    cerebral.runSignal('pageRouted', { page: 'settings' })
  ).rejects.toEqual({
    AuthenticationError: 'You must log in to view this page',
  })
  expect(cerebral.getState('currentPage')).toBe('login')
  expect(cerebral.getState('lastVisited')).toBe('settings')
})
