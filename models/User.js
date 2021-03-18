const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name : {
        type : String,
    },
    last_name : {
        type : String,
    },
    age: {
        type : String,
    },
    dob:{
        type : String
    },
    gender:{
        type: String,
    },
    phone:{
        type: String,
    },
    user_type:{
        type: String,
    },
    deleted:{
        type:Boolean
    }
})

module.exports = User = mongoose.model('user',UserSchema)