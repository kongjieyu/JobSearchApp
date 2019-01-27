const express = require('express');
//引入body parser
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//make a new app
const app = express();

const model = require('./model')
const Chat = model.getModel('chat')

//work with express
//这个server就是9093端口
const server = require('http').Server(app);
//把9093server端口传给io这个对象，这样io就和express关联起来了
const io = require('socket.io')(server);

//连接客户端和服务端；io.on监听connection这个事件
//回调函数的参数socket是指定的那个socket; 试想一下我们与10个不同的客户端都和这个服务端产生连接，每个客户端都有自己的socket（A客户端-服务端）
io.on('connection', (socket) => { 
    console.log('user login ! socket')
    //socket和io的区别是，socket是我们当前这次连接的请求， io是全局的请求
    //监听从客户端发来的信息
    //在回调函数中把发过来的data作为参数
    socket.on('sendmsg', (data)=>{
        console.log(data)
        //发送一个全局事件
        // io.emit('recvmsg',data)
        const { from, to, msg } = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid, from, to, content:msg}, function(err, doc){
            //克隆doc._doc，把新的放在{} Object.assign({}, doc._doc))
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
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
//因为用了socket之后，app.listen变成server.listen
server.listen(9093, function(){
    console.log('Node listen to the port 9093')
})