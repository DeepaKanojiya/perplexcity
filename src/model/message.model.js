import mongoose from "mongoose"



const messageSchema =  new mongoose.Schema({
      chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        required: true
      },
      content:{
        type:String,
        required:true
      },
      role:{
        value:[user,assistant]
      }
},{timestamps:true})



const messagemodel = mongoose.model("message",messageSchema)

export default messagemodel;