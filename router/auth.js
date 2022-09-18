const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../authenticate");
const bodyParser= require("body-parser");
router.use(bodyParser.json());


require('../db/connection');

const User = require('../model/userSchema');

//image upload
const multer=require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() ;
      cb(null,   uniqueSuffix  + '_' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })





router.post('/register/update_vehicle',upload.single('photo'), async (req,res) =>{
    const {ac_type,id
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr}=req.body;
    const owner_name = req.body.owner_name;
    const car_image = req.file ? req.file.filename : null ;

    console.log(req.body,owner_name ,ac_type
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr,car_image);
    if(!owner_name 
        ||  !car_image   || !ac_type
        || !home_city || !locality  || !vehicle_model || !india_states  || !maharashtra_districts  || !max_weight 
        || !rate_kms  || !rate_ton  || !no_of_seats || !rate_hr 
        ){
        return res.status(422).json({error:'Fill all fields'})
    }
    try{

        const userExists = await User.findByIdAndUpdate(id, { owner_name: owner_name, ac_type:ac_type,
            home_city:home_city,locality:locality,vehicle_model:vehicle_model,india_states:india_states,
            maharashtra_districts:maharashtra_districts,max_weight:max_weight,rate_kms:rate_kms,rate_ton:rate_ton,
            no_of_seats:no_of_seats,rate_hr:rate_hr,car_image:car_image},);
         if(userExists){
        
            res.status(201).json({message:"Vehicle Updated Successfully"});
         }
    
       
        
    }catch(err){
        console.log(err)
        // return res.status(422).json({error:'Fill all fields/ Page refresh'})
    }
})


router.post('/register/update_vehicle_withoutImage', async (req,res) =>{
    const {ac_type,id
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr}=req.body;
    const owner_name = req.body.owner_name;
    // const car_image = req.file ? req.file.filename : null ;

    console.log(req.body,owner_name ,ac_type
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr);
    if(!owner_name    || !ac_type
        || !home_city || !locality  || !vehicle_model || !india_states  || !maharashtra_districts  || !max_weight 
        || !rate_kms  || !rate_ton  || !no_of_seats || !rate_hr 
        ){
        return res.status(422).json({error:'Fill all fields'})
    }
    try{

        const userExists = await User.findByIdAndUpdate(id, { owner_name: owner_name, ac_type:ac_type,
            home_city:home_city,locality:locality,vehicle_model:vehicle_model,india_states:india_states,
            maharashtra_districts:maharashtra_districts,max_weight:max_weight,rate_kms:rate_kms,rate_ton:rate_ton,
            no_of_seats:no_of_seats,rate_hr:rate_hr},);
         if(userExists){
       
            res.status(201).json({message:"Vehicle Updated Successfully"});
         }
    
       
        
    }catch(err){
        console.log(err)
        // return res.status(422).json({error:'Fill all fields/ Page refresh'})
    }
})


router.post('/register/add_vehicle',upload.single('photo'), async (req,res) =>{
    const {password ,vehicle_num ,mobile_num ,vehicle_type ,ac_type
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr,state_active,amount}=req.body;
    const owner_name = req.body.owner_name;
    const car_image = req.file ? req.file.filename : null ;

    console.log(req.body,owner_name,password ,vehicle_num ,mobile_num ,vehicle_type ,ac_type
        ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
        ,rate_kms ,rate_ton,no_of_seats ,rate_hr,state_active,car_image);
    if(!owner_name 
        ||  !password || !vehicle_num || !mobile_num || !car_image  || !vehicle_type || !ac_type
        || !home_city || !locality  || !vehicle_model || !india_states  || !maharashtra_districts  || !max_weight 
        || !rate_kms  || !rate_ton  || !no_of_seats || !rate_hr || !state_active
        ){
        return res.status(422).json({error:'Fill all fields'})
    }
    try{

        const userExists = await User.findOne({vehicle_num:vehicle_num,mobile_num:mobile_num});
        if(userExists){
            return res.status(406).json({error:'user already Exist'})
        }
        const last_payment_date=null;
        
        const next_expiry_date = null;
        const approved= "NOT APPROVED";
        const user = new User({owner_name,password ,vehicle_num ,mobile_num ,car_image ,vehicle_type ,ac_type
            ,home_city ,locality  ,vehicle_model ,india_states ,maharashtra_districts ,max_weight 
            ,rate_kms ,rate_ton,no_of_seats ,rate_hr,state_active,last_payment_date,next_expiry_date,amount,approved});
        
            await user.save();
            res.status(201).json({message:"Vehicle Registered Successfully"});
    
       
        
    }catch(err){
        console.log(err)
        return res.status(422).json({error:'Error occured. Refresh the Page'})
    }
})





router.post('/signin', async(req,res)=>{

    try{
        const { vehicle_num ,mobile_num,password }=req.body;
    if(!vehicle_num || !mobile_num || !password){
        return res.status(422).json({error:'Fill all fields'})
    }
    const useLogin = await User.findOne({vehicle_num:vehicle_num,mobile_num:mobile_num});
    if(useLogin){

        const isMatch = await bcrypt.compare(password,useLogin.password);
        if(isMatch){
            const token = await useLogin.generateToken();
            console.log('tokenSignin',token);

            res.cookie('mernjwt',token,{
                expires:new Date(Date.now()+ 3000000),
                // 300000
                httpOnly:true
            });

            res.status(200).json({message:'Login Successful',"token":token});
        }
        else{
            res.status(400).json({error:'Invalid Credentials'});
        }

    }
    else{
        res.status(422).json({error:'Register Before Login'});
    }

    } catch(err){
        console.log(err)
    }
});



router.post('/change_password', async(req,res)=>{

    try{
        const { vehicle_num ,mobile_num,password,new_password }=req.body;
    if(!vehicle_num || !mobile_num || !password ||!new_password){
        return res.status(422).json({error:'Fill all fields'})
    }
    const useLogin = await User.findOne({vehicle_num:vehicle_num,mobile_num:mobile_num});
    if(useLogin){

        const isMatch = await bcrypt.compare(password,useLogin.password);

        if(isMatch){
            
            const new_password1=await bcrypt.hash(new_password,12);
            const changePassword = await User.findOneAndUpdate({ vehicle_num:vehicle_num,mobile_num:mobile_num },
                {password:new_password1})
               
            if(changePassword){
                console.log(changePassword)
            res.status(200).json({message:'Password Changed Successfully'});
            }
        }
        else{
            res.status(400).json({error:'Invalid Vehicle Number or Mobile Number or Old Password'});
        }

    }
    else{
        res.status(422).json({error:'Register Before Login'});
    }

    } catch(err){
        console.log(err)
    }
});


router.get('/vehicles/all_data',async (req,res)=>{
    const user = await User.find({state_active:"ACTIVE",approved:"APPROVED"});
    
    if (user) {
        res.send(user) 
    }
    else{
        res.status(400).json({error:'no vehicles available'})
    }
          
})

router.get("/vehicles/details/:vehicleNumber/:mobile",async (req,res)=>{
    var vehicle_num= req.params['vehicleNumber'];
    var mobile_num=req.params['mobile']
    const vehicle = await User.findOne({vehicle_num:vehicle_num    ,mobile_num:mobile_num,approved:"APPROVED"});
    console.log(vehicle);
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Register Before Premium / Wait to Approve Vehicle from Admin'})
        }   
})


router.get("/about", authenticate,(req,res) =>{
    console.log("my about");
    res.send(req.rootUser);
})

router.get('/vehicles/total_vehicle',async (req,res)=>{
    const user = await User.count();
    console.log(user);
    if (user) {
        return res.send({user}) 
    }
   
          
})

router.get('/vehicles/active_vehicle',async (req,res)=>{
    const user = await User.count({state_active:"ACTIVE",approved:"APPROVED"});
    console.log(user);
    if (user) {
        return res.json({user}) 
    }
       
})



//filter

//1 only type
router.get("/vehicles/filterVehicle/:vehicle", async (req,res)=>{
    var vehicle_type=req.params['vehicle'];
    if(vehicle_type==='ALL'){
        var mysort = { next_expiry_date: -1 };
        const vehicle = await User.find({state_active:"ACTIVE",approved:"APPROVED"}).sort(mysort);
        console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'No vehicle available'})
        } 
    }
    else{
    const vehicle = await User.find({vehicle_type:vehicle_type,state_active:"ACTIVE",approved:"APPROVED"}).sort(mysort);;
    
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'No vehicle available'})
        } 
    }


})

//2 only model
router.get("/vehicles/filterModels/:vehicleModel", async (req,res)=>{
    var vehicle_model=req.params['vehicleModel'];
    var mysort = { next_expiry_date: -1 };
    const vehicle = await User.find({$and : [{vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
                    {state_active:"ACTIVE"}]}).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 


})


//3 type an model
router.get("/vehicles/filterVehicles/:vehicle/:vehicleModel", async (req,res)=>{
    var vehicle_type=req.params['vehicle'];
    var vehicle_model=req.params['vehicleModel'];
    var mysort = { next_expiry_date: -1 };
    if(vehicle_type==='ALL'){
        const vehicle = await User.find({$and:[{vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
                     {state_active:"ACTIVE"}]}).sort(mysort);;
        console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 
    }
    else{
    const vehicle = await User.find({$and: [ {vehicle_type:vehicle_type,vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
                {state_active:"ACTIVE"}]}).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 

    }
})



//4 only taluka
router.get("/vehicles/filterTalukaOnly/:vehicleTaluka", async (req,res)=>{
    var vehicleTaluka=req.params['vehicleTaluka'];
    var mysort = { next_expiry_date: -1 };
    const vehicle = await User.find({$and : [
        { $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
            {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] } ,
            {state_active:"ACTIVE"},{state_active:"ACTIVE"}
        ]}).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 


})


//5 Taluka an type
router.get("/vehicles/filterTalukanType/:vehicleTaluka/:vehicle", async (req,res)=>{
    console.log('TaVt')
    var vehicleTaluka=req.params['vehicleTaluka'];
    var vehicle_type=req.params['vehicle'];
    var mysort = { next_expiry_date: -1 };
    if(vehicle_type==='ALL'){
        const vehicle = await User.find({$and : [{ $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
        {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] },{state_active:"ACTIVE"},{approved:"APPROVED"}]} ).sort(mysort);;
        console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 
    }
    else{
    const vehicle = await User.find( {$and : [{ $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
    {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] },
    {vehicle_type:vehicle_type},{state_active:"ACTIVE"}]} ).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 
    }

})


//6 Taluka an Model
router.get("/vehicles/filterTalukanModel/:vehicleTaluka/:vehicleModel", async (req,res)=>{
    var vehicle_model=req.params['vehicleModel'];
    var vehicleTaluka=req.params['vehicleTaluka'];
    var mysort = { next_expiry_date: -1 };
    const vehicle = await User.find({$and : [{ $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
    {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] },
    {vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
    {state_active:"ACTIVE"}]}).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 


})


//7 
router.get("/vehicles/filterAll/:vehicleTaluka/:vehicle/:vehicleModel", async (req,res)=>{
    var vehicleTaluka=req.params['vehicleTaluka'];
    var vehicle_type=req.params['vehicle'];
    var vehicle_model=req.params['vehicleModel'];
    var mysort = { next_expiry_date: -1 };
    if(vehicle_type==='ALL'){
        const vehicle = await User.find({$and : [{ $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
        {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] },
        {vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
        {state_active:"ACTIVE"} ]} ).sort(mysort);;
        console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 
    }
    else{
    const vehicle = await User.find({$and : [{ $or: [  {home_city:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*')  }},  
    {locality:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicleTaluka+'[A-Za-z0-9\s]*') }} ] },
    {vehicle_model:{$regex: new RegExp('[A-Za-z0-9\s]*'+vehicle_model+'[A-Za-z0-9\s]*')}},
    {vehicle_type:vehicle_type},{state_active:"ACTIVE"}]}).sort(mysort);;
    console.log(vehicle,"onlytype");
    // res.status(200).json({
        if (vehicle) {
            res.send(vehicle) 
        }
        else{
            res.status(400).json({error:'Error in single Vehicle from Backend'})
        } 
    }

})






module.exports=router;