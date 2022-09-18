const mongoose=require("mongoose");
const DB = process.env.DATABASE;


mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
    useUnifiedTopology:true

}).then(() =>{
    console.log('db connected successfully');
}).catch(err =>{
    console.log('no connection with db', err);
})