const mongoose =require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
    type: String,
    required: true,
    trim: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        defaul: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)