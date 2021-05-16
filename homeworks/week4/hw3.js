const request = require('request')
const process = require('process')

const requestUrl = 'https://restcountries.eu/rest/v2/name'

function listInfo() {
  request(
    `${requestUrl}/${process.argv[2]}`,
    (error, response, body) => {
      // 判斷錯誤
      if (error) {
        console.log('err', error)
        return
      }
      // 測試JSON字串是否合法
      let json
      try {
        json = JSON.parse(body)
      } catch (error) {
        console.log(error)
      }

      if (json.status === 404) {
        console.log('找不到國家資訊')
      } else {
        for (let i = 0; i < json.length; i++) {
          console.log('============')
          console.log('國家：', json[i].name)
          console.log('首都：', json[i].capital)
          console.log('貨幣：', (json[i].currencies)[0].code)
          console.log('國碼：', (json[i].callingCodes)[0])
        }
      }
    }
  )
}

listInfo()
