const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/imooc-react')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));

const models = {
    user: {
        user: {type: String, require: true},
        pwd: {type: String, require: true},
        type: {type: String, require: true},
        //头像
        avatar: {type: String},
        //个人简介或者职位简介
        desc: {type: String},
        //职位名
        title: {type: String},
        //如果你是boss的话还有两个字段
        company: {type: String},
        money: {type: String}
    },
    
    //建立聊天的模型
    chat: {
        //聊天者两个人的id，每个聊天唯一的标识
        chatid: {type: String, require: true},
        from: {type: String, require: true},
        to: {type: String, require: true},
        read: {type: Boolean, default: false},
        content: {type: String, require: true, default:''},
        create_time: {type: Number, default:Date.now}
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