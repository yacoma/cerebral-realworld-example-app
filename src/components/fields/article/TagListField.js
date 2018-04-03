import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    tagList: state`blog.editorForm.article.tagList`,
    fieldChanged: signal`fieldChanged`,
    tagAdded: signal`blog.tagAdded`,
    tagRemoved: signal`blog.tagRemoved`,
  },
  function TagListField({
    path,
    field,
    tagList,
    fieldChanged,
    tagAdded,
    tagRemoved,
  }) {
    const watchForEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        tagAdded()
      }
    }
    return (
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          value={field}
          onChange={(e) => fieldChanged({ path, value: e.target.value })}
          onKeyUp={watchForEnter}
        />
        <br />
        <div className="tag-list">
          {(tagList || []).map((tag, tagIndex) => {
            return (
              <span className="tag-default tag-pill" key={tagIndex}>
                <i
                  className="ion-close-round"
                  onClick={() => tagRemoved({ tagIndex })}
                />
                {tag}
              </span>
            )
          })}
        </div>
      </fieldset>
    )
  }
)
