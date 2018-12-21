const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nb')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));

//make a new app
const app = express();


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    }
})

const User = mongoose.model('users',UserSchema);
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

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
var requestTime = function (req, res, next) {
   console.log(Date.now())
  req.requestTime = Date.now()
  next()
}

app.use(myLogger)
app.use(requestTime)

app.get('/', function (req, res) {
    var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)

})
app.get('/data', function (req, res) {
  User.find({}, function(err, doc){
      res.json(doc)
  })
})

app.listen(9093, function(){
    console.log('Node listen to the port 9093')
})