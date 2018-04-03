import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    currentBio: state`auth.currentUser.bio`,
    fieldChanged: signal`fieldChanged`,
  },
  function BioField({ path, field, currentBio, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <textarea
          className="form-control form-control-lg"
          rows="8"
          placeholder="Short bio about you"
          value={field || currentBio}
          onChange={(e) => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
