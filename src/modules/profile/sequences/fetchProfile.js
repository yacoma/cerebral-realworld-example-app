import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpGet } from '@cerebral/http/operators'

export default sequence('Fetch profile', [
  httpGet(string`/profiles/${state`profile.currentProfile.username`}`),
  set(state`profile.currentProfile`, props`response.result.profile`),
])
