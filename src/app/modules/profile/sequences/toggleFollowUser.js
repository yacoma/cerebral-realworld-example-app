import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpDelete, httpPost } from '@cerebral/http/operators'

export default sequence('Toggle follow user', [
  when(state`profile.following`),
  {
    true: [
      httpDelete(string`/profiles/${props`username`}/follow`),
      set(state`profile.following`, false),
    ],
    false: [
      httpPost(string`/profiles/${props`username`}/follow`),
      set(state`profile.following`, true),
    ],
  },
])
