import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    articleTags: state`blog.articles.${state`blog.currentArticleSlug`}.tagList`,
    fieldChanged: signal`fieldChanged`,
  },
  function TagListField({ path, field, articleTags, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Enter tags"
          value={field || articleTags}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
        <div className="tag-list" />
      </fieldset>
    )
  }
)
