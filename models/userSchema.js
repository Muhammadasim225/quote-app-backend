import { Schema, model } from "mongoose";
const userSchema=new Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
const userModal=model("userModal",userSchema)

export default userModal;