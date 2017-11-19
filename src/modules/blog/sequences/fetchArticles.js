import { sequence } from 'cerebral'
import { httpGet } from '@cerebral/http/operators'

import mergeArticles from '../actions/mergeArticles'

export default sequence('Fetch articles', [httpGet('/articles'), mergeArticles])
