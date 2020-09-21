let baseUrl = ''
let apiUrl = ''

if (process.env.NODE_ENV == 'development') {
  baseUrl = '/api/'
  apiUrl = 'https://www.easy-mock.com/mock/5cb070c2f1fe8418639bfcbb/example'
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '/'
}

export { baseUrl, apiUrl }
