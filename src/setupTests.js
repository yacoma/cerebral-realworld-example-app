import 'jest-localstorage-mock'

const apiUrl = 'https://conduit.productionready.io/api'
global.apiUrl = apiUrl

const validJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiw' +
  'idXNlcm5hbWUiOiJUZXN0ZXIifQ.TXP3ekXsYN0tBkYoJubFQPAITecmh1LXQ1-O0svFo3k'
global.validJWT = validJWT

const expiredJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwi' +
  'dXNlcm5hbWUiOiJUZXN0ZXIiLCJleHAiOjE0OTA5MDAwMDB9.qm6PMsM50LjrSV_q4hsfLr9f' +
  'r-XY3tpUx3EBaKq1gT8'
global.expiredJWT = expiredJWT
