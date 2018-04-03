import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    articleDescription: state`blog.articles.${state`blog.currentArticleSlug`}.description`,
    fieldChanged: signal`fieldChanged`,
  },
  function DescriptionField({ path, field, articleDescription, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="What's this article about?"
          value={field || articleDescription}
          onChange={(e) => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
