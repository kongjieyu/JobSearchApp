const express = require('express');
const Router = express.Router();
//加密:md5Pwd
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0, '_v':0}
//清空聊天信息
Chat.remove({},function(e,d){
    console.log('Clear all the chatting msg')
})

Router.get('/list', function(req,res){
    //get参数用query获取，post 的参数用body获取
    console.log('get the url')
    console.log(req.url)
    const { type } = req.query

    //清除测试数据
    //User.remove({}, function(e, d){})
    User.find({type}, function(err, doc){
        //先返回一个code，再返回内容
        return res.json({code:0, data: doc})
    })
})

Router.get('/getmsglist', function(req,res){
    const user = req.cookies.userid
    // const user = req.cookies.user
    //查询所有的user
    User.find({},function(e, userdoc){
        //把返回的列表转化为一个对象
        let users = {}
        //遍历，然后把需要的数据拿出来
        // console.log('userdoc')
        // console.log(userdoc)
        userdoc.forEach(v=>{
            //key-value组合
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        //要查询多个条件用$or
        // {'$or': [{from: user, to:user}]}
        // {}只有一个括号就是把所有的信息都查出来
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0, msgs:doc, users:users})
            }
        })
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

Router.post('/update', function(req, res){
    const userid = req.cookies.userid
    if (!userid){
        return res.json({code:1})
    }
    //post 的参数用body获取
    const body = req.body
    User.findByIdAndUpdate(userid, body, function(err, doc){
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
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