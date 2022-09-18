// const Razorpay = require('razorpay');

// // KEY_ID=rzp_test_5e8rpNZIajBxf3  
// // KEY_SECRETE=MqIgKA5ISIFQ2YWLEcIZ5yGt  
// const dotenv = require("dotenv");
// const uniqId = require('uniqid');
// dotenv.config({path:'./config.env'});
// const KEY_ID = process.env.KEY_ID;
// const KEY_SECRETE = process.env.KEY_SECRETE;
// console.log(KEY_ID);

// var instance = new Razorpay ({ key_id:KEY_ID , key_secret:KEY_SECRETE});



// exports.createOrder=(req,res)=>{
//     var options = {
//         amount : 50000,
//         currency:"INR",
//         receipt:uniqId()

//     };

//     instance.orders.create(options,function(err,order){
//         if(err){
//             res.status(500).json({error:err});
//         }
//         res.json(order);
//         console.log(order)
//     })
// }