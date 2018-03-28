import 'jest-localstorage-mock'

const apiUrl = 'https://conduit.productionready.io/api'
global.apiUrl = apiUrl

const authHeader = {
  validJWT:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIi' +
    'widXNlcm5hbWUiOiJUZXN0ZXIifQ.TXP3ekXsYN0tBkYoJubFQPAITecmh1LXQ1-O0svFo3k',
  expiredJWT:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIi' +
    'widXNlcm5hbWUiOiJUZXN0ZXIiLCJleHAiOjE0OTA5MDAwMDB9.qm6PMsM50LjrSV_q4hsf' +
    'Lr9fr-XY3tpUx3EBaKq1gT8',
}
global.authHeader = authHeader

const jsonResponse = {
  articles: JSON.stringify({
    articles: [
      {
        slug: 'how-to-train-your-dragon',
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'It takes a Jacobian',
        tagList: ['dragons', 'training'],
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:48:35.824Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'Tester',
          bio: 'I work at statefarm',
          image: 'https://i.stack.imgur.com/xHWG8.jpg',
          following: false,
        },
      },
      {
        slug: 'how-to-train-your-dragon-2',
        title: 'How to train your dragon 2',
        description: 'So toothless',
        body: 'It a dragon',
        tagList: ['dragons', 'training'],
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:48:35.824Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'Tester',
          bio: 'I work at statefarm',
          image: 'https://i.stack.imgur.com/xHWG8.jpg',
          following: false,
        },
      },
    ],
    articlesCount: 2,
  }),
  tags: JSON.stringify({
    tags: ['test', 'text', 'dragons', 'training']
  }),
}
global.jsonResponse = jsonResponse
