import { sequence } from 'cerebral'
import { httpGet } from '@cerebral/http/operators'

import addTags from '../actions/addTags'

export default sequence('Fetch tags', [httpGet('/tags'), addTags])
