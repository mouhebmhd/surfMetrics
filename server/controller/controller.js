var video =require('../model/video');
var fs=require('fs')
var controller={}
function calculateDuration(startTimeStr, finishTimeStr) {
  // Parse the time strings into Date objects
  const startTime = new Date(`2000-01-01T${startTimeStr}`);
  const finishTime = new Date(`2000-01-01T${finishTimeStr}`);

  // Calculate the time difference in milliseconds
  const timeDifference = finishTime - startTime;

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return { hours, minutes, seconds };
}




function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function getDate()
{
  const today = new Date();
  const formattedDate = formatDate(today);
  return formattedDate;
}

controller.loginAttempt= (req, res)=>
{
 user.findOne( {email:req.body.Email} )
 .then(data =>{
     if(data)
     {
     var trust=bcrypt.compareSync(req.body.Password,data.motDePasse);
     if (trust)
    { 
      //here we are going to send a token that contains the user informations  
      let token1=createToken(data);
      res.cookie('currentUser',token1, { maxAge:100*365*24*60*60*1000, httpOnly: true });
    }
    else
    {
      //the email is correct but the password given  is incorrect 
       res.send("loginPasswordError");       
    }
    }
    else
    {
      //the email given by the user is incorrect ,we can not find any email in the database equal to the given one 
      res.send("loginEmailError");
    }
  })
 .catch(err =>{
   //some error occurs
        res.status(500).render("error500");
 })
}
controller.logout=((req,res)=>{
    res.clearCookie("currentUser");
})
 controller.addSessionInfo= async(req,res)=>{
      const vid=new video({
        userId:req.body.information.id,
        name:req.body.information.name,
        date:req.body.information.date,
        time:req.body.information.time,
        finishTime:'not set yet',
        events:''
     });
      await vid.save()
     .then((data)=>{
      console.log('a new video is added to the data base ')
      res.cookie('currentSession',data.userId, { maxAge:100*365*24*60*60*1000, httpOnly: true });
     })
     .catch((error)=>{
      console.log('an error has occured while trying to ad a new video ',error)
     })
}
controller.addSessionEvents= async(evenements,userID)=>{
  video.findOneAndUpdate({userId:userID},{ $set: { events: JSON.stringify(evenements) ,finishTime:new Date().toLocaleTimeString()} },(err,result)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log('schema updated successfully')
    }
  });
}
controller.getVideoByID=((req,res)=>{
  video.findOne({userID:req.query.videoID})
  .then((selectedVideo)=>{
    res.send(selectedVideo)
    console.log('video selected successfully')
  })
  .catch((error)=>{
    console.log('an error has occured when trying to select a video')
  })
})
controller.getSessionsCount=((req,res)=>{
  video.find({})
  .then(data=>{
    res.send(' '+data.length)})
  .catch(error=>{
    res.send('an error has oocured while counting sessions ')
  
  })
})
controller.getAverageDuration=(req,res)=>{
  video.find({})
  .then(data=>{
    var durationAvg=0;
    for (var i=0;i<data.length;i++)
    {
      durationAvg+=(calculateDuration(data[i].time,data[i].finishTime)).hours*60+(calculateDuration(data[i].time,data[i].finishTime)).minutes+(calculateDuration(data[i].time,data[i].finishTime)).seconds/60
    }
    durationAvg=Math.round(durationAvg)
    res.send('  '+durationAvg)})
  .catch(error=>{
    res.send('an error has oocured while counting sessions '+error)
  
  })
}
controller.visitsToday=(req,res)=>{
  const todayDate=getDate()
  video.find({date:todayDate})
  .then((data)=>{
    res.send(' '+data.length)
  })
  .catch((error)=>{
    res.send('an error occured while retriving today visits '+error)
  })
  
  
}
controller.visitsThisMonth = (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are 0-based, so add 1

  // Calculate the start and end dates for the current month
  const startDate = formatDate(new Date(currentYear, currentMonth - 1, 1)); // Set to the 1st day of the current month
  const endDate =formatDate(new Date(currentYear, currentMonth, 0)); // Set to the last day of the current month
  
  video.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((data) => {
      res.send('' + data.length);
    })
    .catch((error) => {
      res.send('An error occurred while retrieving this month\'s visits: ' + error);
    });
};
controller.visitsThisWeek = (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Months are 0-based
  const currentDate = today.getDate();
  const currentDay = today.getDay(); // Sunday is 0, Monday is 1, and so on

  // Calculate the start and end dates for the current week
  const firstDayOfWeek = currentDate - currentDay; // Calculate the first day of the week
  const startDate = formatDate(new Date(currentYear, currentMonth, firstDayOfWeek));
  const endDate = formatDate(new Date(currentYear, currentMonth, firstDayOfWeek + 6)); // Last day of the week

  video.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((data) => {
      res.send('' + data.length);
    })
    .catch((error) => {
      res.send('An error occurred while retrieving this week\'s visits: ' + error);
    });
};
controller.visitsPerDayThisMonth = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Months are 0-based

  const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the number of days in the current month
  const dates=[]
  const visitPerDate=[]

  for (let day = 1; day <= numDaysInMonth; day++) {
    const startDate = formatDate(new Date(currentYear, currentMonth, day));
    const endDate = formatDate(new Date(currentYear, currentMonth, day + 1));

    try {
      const count = await video.countDocuments({
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      
      dates.push(startDate)
      visitPerDate.push(count)
    } catch (error) {
      return res.send('An error occurred while retrieving visits: ' + error);
    }
  }

  res.send({dates,visitPerDate});
};
controller.visitsPerDayOfWeekThisMonth = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Months are 0-based

  const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the number of days in the current month

  const visitsPerDayOfWeek = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  for (let day = 1; day <= numDaysInMonth; day++) {
    const currentDate = new Date(currentYear, currentMonth, day);
    const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });

    try {
      const count = await video.countDocuments({
        date: {
          $gte: formatDate(currentDate),
          $lt: formatDate(new Date(currentYear, currentMonth, day + 1)),
        },
      });

      visitsPerDayOfWeek[dayOfWeek] += count;
    } catch (error) {
      return res.send('An error occurred while retrieving visits: ' + error);
    }
  }

  res.json(visitsPerDayOfWeek);
};
controller.exportToVideo=(req,res)=>{

}
module.exports=controller;