import React from 'react'
import ArticleList from '../ArticleList'
import Banner from './Banner'
import FeedToggle from './FeedToggle'
import TagList from './TagList'

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
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
