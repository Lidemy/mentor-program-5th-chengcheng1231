const db = require('../models')
const Prizes = db.hw17_prize

const lotteryController = {
    index:(req, res) => {
        Prizes.findAll().then(prizes => {
            prizesDescription = []
            var totalWeight = null
            for (var i=0; i<prizes.length; i++) {
                prizesDescription.push(prizes[i].description)
                totalWeight+=prizes[i].weight
            }
            if (totalWeight === 100) {
                totalWeight = null
            }
            res.render('lotteryFront', {
                prizesDescription,
                totalWeight
            })
        })
    },

    beManage:(req, res) => {
        Prizes.findAll().then(prizes => {
            var totalWeight = null
            for (var i=0; i<prizes.length; i++) {
                totalWeight+=prizes[i].weight
            }
            if (totalWeight === 100) {
                totalWeight = null
            }
            res.render('lotteryManage', {
                prizes,
                totalWeight
            })
        })
    },

    addPrize:(req, res) => {
        res.render('lotteryAdd')
    },

    handleAddPrize:(req, res, next) => {
        const {prizeUrl, prizeResult, prizeDesc, prizeWeight } = req.body
        if (!prizeUrl || !prizeResult || !prizeDesc || !prizeWeight ) { //檢查 POST 表單有沒有東西
            req.flash('errorMessage', "缺少必要欄位")
            return next() // 給下一個 middleware 來處理
        }
        Prizes.create({
            picUrl: prizeUrl,
            prizeName: prizeResult,
            description: prizeDesc,
            weight: prizeWeight
        }).then(() => {
            res.redirect('/manage')
        })
    },

    editPrize:(req, res) => {
        Prizes.findOne({
            where: {
                id: req.params.id
            }
        }).then(prize => {
            res.render('lotteryEdit', {
                prize
            })
        })
    },

    handleEditPrize:(req, res, next) => {
        const {prizeUrl, prizeResult, prizeDesc, prizeWeight } = req.body
        if (!prizeUrl || !prizeResult || !prizeDesc || !prizeWeight ) { //檢查 POST 表單有沒有東西
            req.flash('errorMessage', "缺少必要欄位")
            return next() // 給下一個 middleware 來處理
        }

        Prizes.findOne({
            where: {
                id: req.params.id,
            }
        }).then(prize => {
            return prize.update({
                picUrl: prizeUrl,
                prizeName: prizeResult,
                description: prizeDesc,
                weight: prizeWeight
            }).then(() => {
                res.redirect('/manage')
            }).catch(() => {
                res.redirect('/manage');
            });
        })
    },

    handleDelete: (req, res) => {
        Prizes.findOne({
            where: {
                id: req.params.id,
            }
        }).then(prize => {
          return prize.destroy();
        }).then(() => {
          res.redirect('/manage');
        }).catch(() => {
          res.redirect('/manage');
        });
    },

    drawPrize:(req, res) => {
        Prizes.findAll().then(prizes => {
            const arr = [0]
            let sum = 0
            for (let i = 0; i < prizes.length; i++) {
                const { weight } = prizes[i]
                arr.push(sum += Number(weight))
            }
            const randomNum = Math.floor(Math.random() * 100)
            for (let i = 1; i < arr.length; i++) {
                if (randomNum >= arr[i - 1] && randomNum <= arr[i]) {
                    const prize = prizes[i - 1]
                    res.render('lotteryResult', {
                        prize
                    })
                }
            }
        })
    },
}

module.exports = lotteryController