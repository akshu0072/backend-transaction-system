const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: [true,"Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email address"],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an account"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"password should be more than 6 character"],
        select: false
    },
    {
    timestamps:true
    }
})