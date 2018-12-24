const express = require('express');
const Router = express.Router();
//加密
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req,res){
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})
//在这里需要引入body-parser来接收post参数
Router.post('/register', function(req,res){
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user:user}, function(err, doc){
        if(doc) {
            console.log('用户名重复')
            return res.json({code:1, msg:'用户名重复'})
        }
        User.create({user, type, pwd: md5Pwd(pwd)}, function(e, d){
            if(e){
                 console.log('errorrrr')
                return res.json({code:1, msg: '后端出错了'})
            } else {
                console.log('successful mak')
                return res.json({code:0})
            }

        })
    })

})

Router.get('/info', function(req,res){
    //根据用户有没有cookie，返回不用的信息
    return res.json({code:1})
})

//加盐
function md5Pwd(pwd){
    const salt = 'imooc_is_good_1994kjy'
    //为了提高密码的安全性，在外层再包一个md5
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router