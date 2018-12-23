const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/imooc-chat')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));

const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        //头像
        'avatar': {'type': String},
        //个人简介或者职位简介
        'desc': {'type': String},
        //职位名
        'title': {'type': String},
        //如果你是boss的话还有两个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: { 
    }
}

for(let m in models){
    mongoose.model(m, new Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}