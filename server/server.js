const express = require('express');

//将user的Router拆分出来
const userRouter = require('./user');
//make a new app
const app = express();
//开启一个中间件，如果中间件是一个路由： 第一个参数为前缀， 第二个参数为Router的名称
//意思是，只要与路由/user相关的，它的Router就是由子路由来定义的
app.use('/user', userRouter)






//const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     user: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true

//     }
// })

//const User = mongoose.model('users',UserSchema);
// User.create({
//     user:"May",
//     age: 18
// }, function(err,doc) {
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })

// var myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }
// var requestTime = function (req, res, next) {
//    console.log(Date.now())
//   req.requestTime = Date.now()
//   next()
// }

// app.use(myLogger)
// app.use(requestTime)

// app.get('/', function (req, res) {
//     var responseText = 'Hello World!<br>'
//   res.send(responseText)
// })
app.get('/data', function (req, res) {
  User.find({}, function(err, doc){
      res.json(doc)
  })
})

app.listen(9093, function(){
    console.log('Node listen to the port 9093')
})