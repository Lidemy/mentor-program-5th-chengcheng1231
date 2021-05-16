const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    // 判斷錯誤
    if (error) {
      console.log('err', error)
      return
    }
    // 測試JSON字串是否合法
    let booksName
    try {
      booksName = JSON.parse(body)
    } catch (error) {
      console.log(error)
    }

    for (let i = 0; i < booksName.length; i++) {
      console.log(`${booksName[i].id} ${booksName[i].name}`)
    }
  }
)
