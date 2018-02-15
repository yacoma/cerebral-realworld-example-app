import React from 'react'

import YourFeedTab from './feedTabs/YourFeedTab.js'
import GlobalFeedTab from './feedTabs/GlobalFeedTab.js'
import TagFilterTab from './feedTabs/TagFilterTab.js'

export default function FeedTabs() {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <YourFeedTab />
        <GlobalFeedTab />
        <TagFilterTab />
      </ul>
    </div>
  )
}
