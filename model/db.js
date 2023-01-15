const mongoose = require('mongoose')

const db = mongoose.createConnection('mongodb://localhost:27017/WebApp')

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('database connected');
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

module.exports = {
    user : db.model('user',userSchema)
}
