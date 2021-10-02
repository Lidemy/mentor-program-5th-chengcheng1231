const db = require('../models')
const Contents = db.hw17_contents //hw17_contents 指的不是 models 資料夾底下的名稱，是裡面定義的內容，注意大小寫
const User = db.hw17_users // hw17_users 指的不是 models 資料夾底下的名稱，是裡面定義的內容，注意大小寫

const contentController = {
    index: (req, res) => {
        User.findAll({
            include: {
                model: Contents, //為上面引入並定義的參數
                where: {
                    is_deleted: null //對於要關聯的內容下條件
                },
            },
            order: [[Contents ,'id', 'desc']] //對於 include model 指定升降冪排序
        }).then(users => {
            res.render('front', {
                users
            })
        })
    },

    category: (req, res) => {
        User.findAll({
            include: {
                model: Contents,
                where: {
                    is_deleted: null //對於要關聯的內容下條件
                }
            },
            order: [[Contents ,'id', 'desc']]
        }).then(users => {
            res.render('content/category', {
                users
            })
        })
    },

    write: (req, res) => {
        User.findAll({
            where: {
                username: req.session.username
            } 
        }).then(users => {
            res.render('content/write', {
                users
            })
        })
    
    },

    handleWrite: (req, res, next) => {
        const {title, content } = req.body 
        if (!title || !content ) { //檢查 POST 表單有沒有東西
            req.flash('errorMessage', "缺少必要欄位")
            return next() // 給下一個 middleware 來處理
        }
        
        Contents.create({
            username: req.session.username,
            article_titile: title,
            article_content: content,
            hw17UserId: req.session.userId
        }).then(() => {
            res.redirect('/')
        })
    },

    article: (req, res) => {
        User.findAll({
            include: {
                model: Contents,
                where: {
                    id: req.params.id //對於要關聯的內容下條件
                }
            },
        }).then(users => {
            res.render('content/article', {
                users
            })
        })
    },


    editArticle: (req, res) => {
        User.findAll({
            include: {
                model: Contents,
                where: {
                    id: req.params.id //對於要關聯的內容下條件
                }
            },
        }).then(users => {
            res.render('content/editArticle', {
                users
            })
        })
    },

    handleEditArticle: (req, res, next) => {
        const {title, content } = req.body 
        if (!title || !content ) { //檢查 POST 表單有沒有東西
            req.flash('errorMessage', "缺少必要欄位")
            return next() // 給下一個 middleware 來處理
        }

        Contents.findOne({
            where: {
                id: req.params.id,
                hw17UserId: req.body.userId
            }
        }).then(content => {
            return content.update({
                article_titile: req.body.title,
                article_content: req.body.content
            }).then(() => {
                res.redirect('/');
            }).catch(() => {
                res.redirect('/');
            });
        })
    },

    handleDeleteArticle: (req, res, next) => {
        Contents.findOne({
            where: {
                id: req.params.id,
            }
        }).then(content => {
            return content.update({
                is_deleted: 1,
            }).then(() => {
                res.redirect('/')
            }).catch(() => {
                res.redirect('/')
            })
        })
    },
}

module.exports = contentController