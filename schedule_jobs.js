const schedule= require("node-schedule");
const User = require('./model/userSchema');


schedule.scheduleJob('* * * * *', async () =>{
    try{
        console.log((new Date (Date.now()-1*86400000)));
        
    const userUpdate = await User.updateOne({ next_expiry_date : { $lte:((new Date (Date.now()-1*86400000)))},state_active:'ACTIVE'},
    {
        $set:{
         
         state_active:'INACTIVE'
        }
    })
    console.log('i ran ...');
    console.log(userUpdate)
    }catch(error){
        console.log(error)
    }
})

module.exports=schedule;