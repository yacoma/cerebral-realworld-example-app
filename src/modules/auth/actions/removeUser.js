export default function removeUser({ state, storage, http }) {
  storage.remove('jwtHeader')
  http.updateOptions({
    headers: {
      Authorization: null,
    },
  })
  state.set('auth.authenticated', false)
  state.set('auth.currentUser.email', '')
  state.set('auth.currentUser.username', '')
}
