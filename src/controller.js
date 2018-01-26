import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'

import app from './app'

const devtools =
  process.env.NODE_ENV === 'production'
    ? null
    : Devtools({ host: 'localhost:8585', reconnect: false })

export default Controller(app, {
  devtools,
})
