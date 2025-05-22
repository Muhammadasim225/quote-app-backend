import { Schema, model } from "mongoose";
const quoteSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    by:{
        type:Schema.Types.ObjectId,
        ref:"userModal"
    }

})
const quoteModal=model("quoteModal",quoteSchema)

export default quoteModal;