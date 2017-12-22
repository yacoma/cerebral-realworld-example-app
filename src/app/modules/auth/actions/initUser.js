export default function initUser({ props, state, storage, http }) {
  const [authtype, token] = props.response.headers.authorization.split(' ', 2)
  storage.set('jwtHeader', token)
  http.updateOptions({
    headers: {
      Authorization: authtype + ' ' + token,
    },
  })
  state.set('auth.authenticated', true)
  state.set('auth.currentUser.email', props.response.result.user.email)
  state.set('auth.currentUser.username', props.response.result.user.username)
  state.set('auth.currentUser.image', props.response.result.user.image)
  state.set('auth.currentUser.bio', props.response.result.user.bio)
}
