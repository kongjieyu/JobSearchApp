const express = require('express');
const Router = express.Router();
//加密
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0, '_v':0}

Router.get('/list', function(req,res){
    //清除测试数据
    //User.remove({}, function(e, d){})
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})
//在这里需要引入body-parser来接收post参数

Router.post('/login', function(req, res){
    console.log(req.body)
    const {user, pwd} = req.body
    User.findOne({user:user, pwd:md5Pwd(pwd)}, _filter, function(err, doc){
        if(!doc){
            return res.json({code:1, msg:'用户名或密码重复'})
        }
        //用户登陆成功了之后，还就需要返回cookie信息
        res.cookie('userid', doc._id)
        return res.json({code:0, data: doc})

    })
})


Router.post('/register', function(req, res){
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user:user}, function(err, doc){
        if(doc) {
            console.log('用户名重复')
            return res.json({code:1, msg:'用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function(e, d){
            if(e){
                 console.log('errorrrr')
                return res.json({code:1, msg: '后端出错了'})
            } else {
                console.log('successful mak')
                const {user, type, _id} = d
                res.cookie('userid', _id)
                return res.json({code:0, data: {user, type, _id}})
            }
        })
    })
})

Router.get('/info', function(req,res){
    //根据用户有没有cookie，返回不用的信息
    const { userid } = req.cookies
    if (!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter, function(err, doc){
        if(err){
           return res.json({code:1, msg:'后端出错'}) 
        }
        if(doc){
            return res.json({code:0, data: doc})
        }
    })

})

//加盐
function md5Pwd(pwd){
    const salt = 'imooc_is_good_1994kjy'
    //为了提高密码的安全性，在外层再包一个md5
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router