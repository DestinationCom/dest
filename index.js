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



//images path
app.use('/images', express.static('images'));


// app.get('/contact',(req,res)=>{
//     res.send('hey world');
// })
app.get('/',(req,res)=>{
    res.send('server started');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})


// 3. Steps in Heroku:
if (process.env.NODE_ENV =="production"){
    app.use(express.static("client/build"));
}


