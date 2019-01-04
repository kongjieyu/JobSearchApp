const express = require('express');
//引入body parser
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//make a new app
const app = express();
//work with express
const server = require('http').Server(app);
//把server传给io这个对象，这样io就和express关联起来了
const io = require('socket.io')(server);

io.on('connection', (socket) => { 
    console.log('user login ! socket')
    //socket和io的区别是，socket是我们当前这次连接的请求， io是全局的请求
    socket.on('sendmsg', (data)=>{
        console.log(data)
        //发送一个全局事件
        io.emit('recvmsg',data)
    })
 });

//将user的Router拆分出来
const userRouter = require('./user');


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

server.listen(9093, function(){
    console.log('Node listen to the port 9093')
})