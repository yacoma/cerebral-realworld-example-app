import { runSignal } from 'cerebral/test'
import { routeTo } from './factories'

test('route to login should not change lastVisited', () => {
  return runSignal(routeTo('login'), {
    state: { app: { lastVisited: 'settings' } },
  }).then(({ state }) => [
    expect(state.app.currentPage).toBe('login'),
    expect(state.app.lastVisited).toBe('settings'),
  ])
})

test('route to register should not change lastVisited', () => {
  return runSignal(routeTo('register'), {
    state: { app: { lastVisited: 'settings' } },
  }).then(({ state }) => [
    expect(state.app.currentPage).toBe('register'),
    expect(state.app.lastVisited).toBe('settings'),
  ])
})
