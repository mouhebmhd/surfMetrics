var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    date:
    {
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    finishTime:{
        type:String,
        required:true
    },
    events:{
        type:String,
        required:false
    }
});







var video=mongoose.model("video",schema);
module.exports=video;