import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    currentImage: state`auth.currentUser.image`,
    fieldChanged: signal`fieldChanged`,
  },
  function ImageField({ path, field, currentImage, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="URL of profile picture"
          value={field || currentImage}
          onChange={(e) => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
