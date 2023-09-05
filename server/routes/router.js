const express = require('express');
const route = express.Router();
const video=require('../model/video')
const controller=require('../controller/controller')
var jwt=require('jsonwebtoken');

function createToken(data)
{
return   jwt.sign({user:data},process.env.ACCESS_SECRET+data._id,{expiresIn:"24h"});
}
function checkAuthorization(req,res)
{
   let user=req.cookies['currentUser'];
   if(user)
   {
     return true;
   }
   else
   {
      return false;
   }
}
route.get('/',(req,res)=>{
    res.send(checkAuthorization(req,res))
})
route.post('/events/addSessionInfo/',((req,res)=>{
  controller.addSessionInfo(req,res)
}))

route.get('/getAllVideos/',((req,res)=>{
  video.find({})
  .then((videos)=>{
    console.log('videos selected successfully')
    res.send(videos)
  })
  .catch((error)=>{
    console.log('an error has occured when trying to get videos ')
  })
}))
route.get('/getVideoById/:id',(req,res)=>{
  controller.getVideoByID(req,res)
})
route.get('/getSessionsCount/',(req,res)=>{
  controller.getSessionsCount(req,res)
})
route.get('/getAverageDuration/',(req,res)=>{
  controller.getAverageDuration(req,res)
})
route.get('/visitsToday/',(req,res)=>{
  controller.visitsToday(req,res)
})
route.get('/visitsThisMonth/',(req,res)=>{
  controller.visitsThisMonth(req,res)
})
route.get('/visitsThisWeek/',(req,res)=>{
  controller.visitsThisWeek(req,res)
})
route.get('/visitsPerDayThisMonth/',(req,res)=>{
  controller.visitsPerDayThisMonth(req,res)
})
route.get('/visitsPerDayOfWeekThisMonth/',(req,res)=>{
  controller.visitsPerDayOfWeekThisMonth(req,res)
})
route.get('/exportToVideo/',(req,res)=>{
  controller.exportToVideo(req,res)
})
module.exports=route;