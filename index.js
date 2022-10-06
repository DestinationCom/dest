const express = require("express");
// const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// config
dotenv.config({path:'./config.env'});
require('./db/connection');


app.use(express.json());

//schedule job
const schedule = require('./schedule_jobs')


// Router link
app.use(require('./router/auth'));
// app.use(require('./router/sms'));

// const paymentRouter= require('./paymentRouter');
// app.use('/api',paymentRouter);




// const express = require('express');
const { createOrder } = require('./paymentController');

// const router = express.Router();
const moment = require('moment');

const bodyParser= require("body-parser");
app.use(bodyParser.json());
// const schedule = require('./schedule_jobs')


const crypto = require("crypto")
const Razorpay = require('razorpay');
// const dotenv = require("dotenv");
const uniqId = require('uniqid');
// dotenv.config({path:'./config.env'});
const KEY_ID = process.env.KEY_ID_LIVE;
const KEY_SECRETE = process.env.KEY_SECRETE_LIVE;

// const KEY_ID = process.env.KEY_ID_TEST;
// const KEY_SECRETE = process.env.KEY_SECRETE_TEST;


require('./db/connection');

const User = require('./model/userSchema');
const { request } = require('http');

// router.post('/createOrder',createOrder);
app.post('/api/orders', async(req,res)=>{
    try{
        var vehicle = User.findOne({vehicle_num:req.body.vehicle_number,
            mobile_num:req.body.mobile_number})
        if(vehicle){
            console.log('entered',vehicle)
        var instance = new Razorpay ({ key_id:KEY_ID  , key_secret:KEY_SECRETE});
        
            

        const options = {
            amount: req.body.amount * 100,
            currency:"INR",
            receipt:uniqId(),
        }

        instance.orders.create(options,function(err,order){
            if(err){
                return res.status(500).json({error:err});
            }
            res.status(200).json(order);
            console.log(order)
        })
    }else{
        console.log('Incorrect Vehicle Number or Mobile Number')
        res.status(501).json("Incorrect Vehicle Number or Mobile Number")
    }

    } catch(error){
        console.log(error);
        res.status(500).json("server error")
    }
})


app.post("/api/verify",async(req,res)=>{
    try{
       
        console.log(req.body.vehicle_num,req.body.mobile_num,req.body.response.razorpay_order_id,
            req.body.response.razorpay_payment_id,req.body.response.razorpay_signature);
        const razorpay_order_id= req.body.response.razorpay_order_id;
        const sign = req.body.response.razorpay_order_id + "|"+req.body.response.razorpay_payment_id;

        const expectedSign = crypto
        .createHmac("sha256",process.env.KEY_SECRETE)
        .update(sign.toString())
        .digest("hex");
        console.log(expectedSign,'hash',req.body.response.razorpay_signature)
        const amount = req.body.amount;
        const vehicle_num=req.body.vehicle_num;
        const mobile_num = req.body.mobile_num;
        if(req.body.response.razorpay_signature === expectedSign){
            console.log(vehicle_num,mobile_num,amount,typeof(Number(amount)),Number(amount));
            try{
                var updateUser = await User.findOne({vehicle_num:vehicle_num,mobile_num:mobile_num});
                console.log(updateUser.last_payment_date,updateUser.next_expiry_date);


            if(updateUser.last_payment_date === null){
                console.log("last_payment is null")
                if(Number(amount) === 1){
                    console.log(updateUser.last_payment_date,'null','50')
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                        next_expiry_date:Date.now()+30* 86400000,
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }
               
                else if (Number(amount) === 2){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                         next_expiry_date:Date.now()+91*86400000,
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                    
                }
                else if (Number(amount) === 3){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                        
                        next_expiry_date:Date.now()+182*86400000,
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }else if(Number(amount) === 4){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                       
                        next_expiry_date:Date.now()+365*86400000,
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }
            }






            else {
                console.log("last_payment is not null",new Date(updateUser.next_expiry_date), 
                new Date(Date.now()),(new Date(updateUser.next_expiry_date )),moment(updateUser.next_expiry_date).add(1,'days'));
                if(updateUser.next_expiry_date >= Date.now()){
                if(Number(amount) === 1){
                    console.log(updateUser.last_payment_date,updateUser.next_expiry_date,'null1')
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                        next_expiry_date:moment(updateUser.next_expiry_date).add(31,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }
               
                else if (Number(amount) === 2){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                         next_expiry_date:moment(updateUser.next_expiry_date).add(91,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                    console.log(userUpdate,userUpdate.modifiedCount);
                }
                else if (Number(amount) === 3){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                        
                        next_expiry_date:moment(updateUser.next_expiry_date).add(182,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }else if(Number(amount) === 4){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                       
                        next_expiry_date:moment(updateUser.next_expiry_date).add(365,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }
            }
                
               


            console.log("last_payment is not null",updateUser.next_expiry_date,Date.now(),updateUser.next_expiry_date+1* 86400000)
            
            if(updateUser.next_expiry_date <= Date.now()){

                console.log(updateUser.last_payment_date,updateUser.next_expiry_date,'null3')
            {
                if(Number(amount) === 1){

                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                        next_expiry_date:moment(Date.now()).add(1,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }
               
                else if (Number(amount) === 2){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),
                         next_expiry_date:moment(Date.now()).add(91,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                    console.log(userUpdate,userUpdate.modifiedCount);
                }
                else if (Number(amount) === 3){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                        
                        next_expiry_date:moment(Date.now()).add(182,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                }else if(Number(amount) === 4){
                    var userUpdate = await User.updateOne({vehicle_num:vehicle_num,mobile_num:mobile_num},{
                        $set:{
                        order_id :req.body.response.razorpay_order_id,
                        last_payment_date:Date.now(),                       
                        next_expiry_date:moment(Date.now()).add(365,'days'),
                        state_active:'ACTIVE',
                        amount:Number(amount)
                        }
                    })
                    }
                    }
                }
                
               
            }




                 
            console.log(userUpdate,userUpdate.modifiedCount);
                if(!userUpdate){
                 res.status(422).json({message:`Error in payment, if amount debited contact to Admin with ORDER_ID = ${razorpay_order_id}`})
                }
                else if( userUpdate.modifiedCount === 1){
                    
                     res.status(201).json({message:`Payment Verified Successfully and ORDER_ID = ${razorpay_order_id}`});

                }
                else{
                    res.status(406).json({message:`Error in payment, if amount debited contact to Admin with ORDER_ID = ${razorpay_order_id}`})
                }
            }catch(error){
                console.log(error);
            }

            
        }else{
            return res.status(400).json({message:"Invalid Signature Sent!"});

        }


    }catch(error){
        console.log(error);
        res.status(500).json("server error")
    }
})


app.get('/payments/:paymentId', (req,res)=>{
    var paymentId= req.params['paymentId'];
    console.log(paymentId)
    User.findOne({order_id:paymentId}).exec((err,data)=>
    {
        console.log(data,err)
        if(err || data==null){
            return res.json({error:'No order found'});
        }
       return res.json({data})
    })
})



















//images path
app.use('/images', express.static('images'));


// app.get('/contact',(req,res)=>{
//     res.send('hey world');
// })
// app.get('/',(req,res)=>{
//     res.send('server started');
// })


const PORT = process.env.PORT || 5000;


const path = require("path");
// 3. Steps in Heroku:
if (process.env.NODE_ENV =="production"){
    app.use(express.static("client/build"));
    app.get("/*", function(req,res){
        { res.sendFile(path.join(__dirname, "client/build/index.html"));
    }})
}

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

