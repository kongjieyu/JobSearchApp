const express = require('express');
//引入body parser
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//将user的Router拆分出来
const userRouter = require('./user');
//make a new app
const app = express();

//中间件
app.use(cookieParser())
app.use(bodyParser.json())
//开启一个中间件，如果中间件是一个路由： 第一个参数为前缀， 第二个参数为Router的名称
//意思是，只要与路由/user相关的，它的Router就是由子路由来定义的
app.use('/user', userRouter)

app.get('/data', function (req, res) {
  User.find({}, function(err, doc){
      res.json(doc)
  })
})

app.listen(9093, function(){
    console.log('Node listen to the port 9093')
})