import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    books:{type:mongoose.Schema.Types.Mixed},
    password:{type:String},
    role:{type:String}
})

const User = mongoose.model('user', usersSchema);

export default User;