const express = require('express');
const Router = express.Router()

Router.get('/info', function(req,res){
    //根据用户有没有cookie，返回不用的信息
    return res.json({code:1})
})

module.exports = Router