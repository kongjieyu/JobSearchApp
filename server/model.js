const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nb')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));