const db = require('../models')
const Contents = db.hw17_contents //hw17_contents 指的不是 models 資料夾底下的名稱，是裡面定義的內容，注意大小寫
const User = db.hw17_users // hw17_users 指的不是 models 資料夾底下的名稱，是裡面定義的內容，注意大小寫

const userController = {
    login: (req, res) => {
        res.render('user/login')
    },

    handleLogin: (req, res, next) => {
        const {username, password} = req.body
        if (!username || !password ) {
            req.flash('errorMessage', "缺少必要欄位")
            return next() // 給下一個 middleware 來處理
        }

        User.findOne({ // 去資料庫 User 去找條件為表格輸入的 username 
            where: {
                username: username
            }
        }).then(user => { // user 為自己定義的，為了去帶去資料庫的東西而已
            if (!user) { // 看資料庫有無 username 存在，沒有則 !user 不會有東西
                req.flash('errorMessage', '使用者不存在')
                return next()
            }

            if (password === user.password) {
                req.session.username = user.username
                req.session.userId = user.id
            } else {
                req.flash('errorMessage', '密碼錯誤')
                return next()
            }
            res.redirect('/')

        }).catch(err => {
            req.flash('errorMessage', err.toString())
                return next()
        })
    },

    logout: (req, res) => {
        req.session.username = null
        res.redirect('/')
    }
}

module.exports = userController