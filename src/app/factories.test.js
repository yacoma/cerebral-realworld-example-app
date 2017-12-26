import { runSignal } from 'cerebral/test'
import * as factories from './factories'

test('route to login should not change lastVisited', () => {
  return runSignal(factories.routeTo('login'), {
    state: { lastVisited: 'settings' },
  }).then(({ state }) => [
    expect(state.currentPage).toBe('login'),
    expect(state.lastVisited).toBe('settings'),
  ])
})

test('route to register should not change lastVisited', () => {
  return runSignal(factories.routeTo('register'), {
    state: { lastVisited: 'settings' },
  }).then(({ state }) => [
    expect(state.currentPage).toBe('register'),
    expect(state.lastVisited).toBe('settings'),
  ])
})
