// const express = require('express');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const User = require('../model/userSchema');


// console.log('b parse')
// const router1 = express();
// router1.use(bodyParser.urlencoded({ extended: false }));
// router1.use(bodyParser.json());

// console.log('d parse')

// const accountSid = process.env.sid;
// const authToken = process.env.auth_token;
// const client = require('twilio')(accountSid, authToken);


// router1.post('/api/messages', async (req, res) => {
  
//   const vehicle_num = req.body.vehicle_number;
//   const sent_pass = req.body.sent_pass.toString();
//   const mobile_num = '+91'+req.body.mobile_number;
//   console.log(mobile_num,sent_pass,req.body.mobile_number,vehicle_num);
//   try{

//     const useLogin = await User.findOne({vehicle_num:vehicle_num,mobile_num:req.body.mobile_number});
//     // console.log(useLogin,'tt')
//     if(useLogin){
//       const mes = await client.messages
//       .create({body:`New password of your destination.com account is ${sent_pass}. For security purpose change Password immediately on destination.com `, 
//       from: process.env.sender, to: mobile_num});
      
//             console.log(mes)
            
//             const new_password1=await bcrypt.hash(sent_pass,12);
//             const changePassword = await User.findOneAndUpdate({ vehicle_num:vehicle_num,mobile_num:req.body.mobile_number },
//                 {password:new_password1})
                
//             if(changePassword){
//                 // console.log(changePassword)
//                 return res.status(200).json({message:'New Password sent on your registered Mobile Number. You can change password using it.'});
//             }
//           }
//         else{
//           res.status(400).json({messgae:'Invalid Vehicle Number or Mobile Number.If this number is unverified. Please contact to Admin'});

//         }
  


        
//   } catch(error){
//     console.log(error.code)
//     console.log(error)
//     if(error.code==21608){
//       res.status(400).json({error:'The number  is unverified. Please contact to Admin'});
      
//     }
//     else{
//       res.status(200).json({message:error});
      
//     }
    
//   }
// });




// module.exports=router1;