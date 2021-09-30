const express = require('express') //引入進來會是一個 function
const app = express()
const port = process.env.PORT || 5001
const session = require('express-session') //負責管理 Session
const bodyParser = require('body-parser') // 有用 POST 表單需加
const flash = require('connect-flash') // 顯示錯誤用

// connect with controller
const lotteryController = require('./controllers/lottery')
const userController = require('./controllers/user')

// connect views
app.set('view engine', 'ejs')

// 有用 POST 表單需加
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 顯示錯誤用
app.use(flash())

//負責管理 Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

//可將變數傳給 view 來使用，類似全域變數
app.use((req, res, next) => {
    res.locals.username = req.session.username 
    res.locals.errorMessage = req.flash('errorMessage') //可將變數傳給 view 來使用，類似全域變數
    next() // middleware 可以繼續往下傳
})

//引入絕對路徑 public 資料夾底下的 css/ jpg 檔案
app.use('/', express.static(__dirname + '/public')); 

// redirectBack 是 middleware 導回上一頁
function redirectBack(req, res) { 
    res.redirect('back')
}

// 檢查是否為登入狀態
function checkUserAuth(req, res, next) {
    if (req.session.username === undefined) {
        return res.redirect('back')
    }
    next() // middleware 可以繼續往下傳
}

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.get('/', lotteryController.index)
app.get('/add-prize', checkUserAuth, lotteryController.addPrize)
app.post('/add-prize', checkUserAuth, lotteryController.handleAddPrize, redirectBack)
app.get('/edit-prize/:id', checkUserAuth, lotteryController.editPrize)
app.post('/edit-prize/:id', checkUserAuth, lotteryController.handleEditPrize, redirectBack)
app.get('/delete-prize/:id', checkUserAuth, lotteryController.handleDelete)
app.get('/draw-prize/', lotteryController.drawPrize)
app.get('/manage',checkUserAuth ,lotteryController.beManage)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})