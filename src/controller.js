import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'

import app from './app'

export default Controller(app, {
  devtools: Devtools({ host: 'localhost:8585', reconnect: false }),
})
