import React from 'react'
import ArticleList from '../ArticleList'
import Banner from './Banner'
import FeedTabs from './FeedTabs'
import TagList from './TagList'

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedTabs />
            <ArticleList />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
