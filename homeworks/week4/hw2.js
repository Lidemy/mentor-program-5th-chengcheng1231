const request = require('request')
const process = require('process')

const requestUrl = 'https://lidemy-book-store.herokuapp.com/books'

if (process.argv[2] === 'list') {
  list20names()
} else if (process.argv[2] === 'read') {
  readBookname()
} else if (process.argv[2] === 'delete') {
  deleteBook()
} else if (process.argv[2] === 'create') {
  createBook()
} else if (process.argv[2] === 'update') {
  updateBookname()
}

function list20names() {
  request(
    `${requestUrl}` + '?_limit=20',
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return 'error'
      }
      // 測試JSON字串是否合法
      let json
      try {
        json = JSON.parse(body)
      } catch (error) {
        console.log(error)
      }

      for (let i = 0; i < json.length; i++) {
        console.log(json[i].name)
      }
    }
  )
}

function readBookname() {
  request(
    `${requestUrl}/${process.argv[3]}`,
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return 'error'
      }
      // 測試JSON字串是否合法
      let json
      try {
        json = JSON.parse(body)
      } catch (error) {
        console.log(error)
      }
      console.log(json.name)
    }
  )
}

function deleteBook() {
  request.delete(
    `${requestUrl}/${process.argv[3]}`,
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return 'error'
      }
    }
  )
}

function createBook() {
  request.post(
    {
      url: `${requestUrl}`,
      form: {
        name: process.argv[3]
      }
    },
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return 'error'
      }
    }
  )
}

function updateBookname() {
  request.patch(
    {
      url: `${requestUrl}/${process.argv[3]}`,
      form: {
        name: process.argv[4]
      }
    },
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return 'error'
      }
    }
  )
}
