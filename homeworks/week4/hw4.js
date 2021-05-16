const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': '8j80nypdts7hk726mmtk4yh67c54af',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    // 測試JSON字串是否合法
    let infor
    try {
      infor = JSON.parse(body)
    } catch (error) {
      console.log(error)
    } // 錯誤處理

    for (let i = 0; i < infor.top.length; i++) {
      const gameName = (infor.top[i].game).name
      const totalViewers = infor.top[i].viewers
      console.log(totalViewers, gameName)
    }
  }
}

request(options, callback)
