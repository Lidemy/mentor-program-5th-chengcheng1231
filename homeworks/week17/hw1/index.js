const express = require('express') //引入進來會是一個 function
const app = express()
const port = process.env.PORT || 5001
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')

// 有用 POST 表單需加
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect views
app.set('view engine', 'ejs')

//負責管理 Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// 顯示錯誤用
app.use(flash())

// 登入以及錯誤資訊
app.use((req, res, next) => {
    res.locals.username = req.session.username //可將變數傳給 view 來使用，類似全域變數
    res.locals.errorMessage = req.flash('errorMessage') //可將變數傳給 view 來使用，類似全域變數
    next() // middleware 可以繼續往下傳
})

function redirectBack(req, res) {
    res.redirect('back')
}

// 檢查是否為登入狀態
function checkUserAuth(req, res, next) {
    if (req.session.username === undefined) {
        return res.redirect('back')
    }
    next()
}
//引入絕對路徑 public 資料夾底下的 css/ jpg 檔案
app.use('/', express.static(__dirname + '/public')); 


const contentController = require('./controllers/content')
const userController = require('./controllers/user')

app.get('/login', userController.login) //傳給 controller 來處理
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.get('/', contentController.index)
app.get('/category', contentController.category) 
app.get('/article/:id', contentController.article)
app.get('/edit-article/:id', checkUserAuth ,contentController.editArticle, redirectBack)
app.post('/edit-article/:id', checkUserAuth ,contentController.handleEditArticle, redirectBack)
app.get('/delete-article/:id',checkUserAuth ,contentController.handleDeleteArticle, redirectBack)
app.get('/write', checkUserAuth ,contentController.write)
app.post('/write-article', checkUserAuth ,contentController.handleWrite, redirectBack)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})