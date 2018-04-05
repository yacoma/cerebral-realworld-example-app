import React from 'react'
import renderer from 'react-test-renderer'
import { Snapshot } from 'cerebral/test'
import { Container } from '@cerebral/react'

import app from './app'
import App from './components/App'
import ArticleList from './components/ArticleList'
import TagList from './components/Home/TagList'

test('should load home page', () => {
  return Snapshot(app)
    .mock('storage.get', null)
    .mockResolvedPromise('http.get', {
      headers: {
        'cache-control': 'max-age=0, private, must-revalidate',
        'content-type': 'application/json; charset=utf-8',
      },
      result: {
        articles: [
          {
            author: {
              bio: null,
              following: false,
              image:
                'https://static.productionready.io/images/smiley-cyrus.jpg',
              username: 'Alex123456789',
            },
            body: 'my article',
            createdAt: '2018-04-05T11:16:34.983Z',
            description: 'ttt',
            favorited: false,
            favoritesCount: 1,
            slug: 'whahaha-5o8dgj',
            tagList: [],
            title: 'whahaha',
            updatedAt: '2018-04-05T11:16:34.983Z',
          },
          {
            author: {
              bio: null,
              following: false,
              image:
                'https://static.productionready.io/images/smiley-cyrus.jpg',
              username: 'vesve',
            },
            body: 'ZSVSZVS',
            createdAt: '2018-04-05T10:45:21.539Z',
            description: 'DVZV',
            favorited: false,
            favoritesCount: 1,
            slug: 'szvvszv-zwc05v',
            tagList: [],
            title: 'szvvszV',
            updatedAt: '2018-04-05T10:45:21.539Z',
          },
        ],
        articlesCount: 500,
      },
      status: 200,
    })
    .mockResolvedPromise('http.get', {
      headers: {
        'cache-control': 'max-age=0, private, must-revalidate',
        'content-type': 'application/json; charset=utf-8',
      },
      result: {
        tags: ['dragons', 'training'],
      },
      status: 200,
    })
    .run('homeRouted', {})
    .then((snapshot) => {
      const tree = renderer
        .create(
          <Container controller={snapshot.controller}>
            <App>
              <ArticleList />
              <TagList />
            </App>
          </Container>
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
      expect(snapshot.get()).toMatchSnapshot()
    })
})
