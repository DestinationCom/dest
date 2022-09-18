const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    owner_name:{
        type:String,
        required:true
    },

    vehicle_num:{
        type:String,
        required:true
    },
    mobile_num:{
        type:Number,
        required:true,
    },
    car_image:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    vehicle_type:{
        type:String,
        required:true
    },
    ac_type:{
        type:String,
        required:true,
    },
    home_city:{
        type:String,
        required:true
    },
    
    locality:{
        type:String,
        required:true
    },
    vehicle_model:{
        type:String,
        required:true
    },
    india_states:{
        type:Array,
        default:[]
    },
    maharashtra_districts:{
        type:Array,
        default:[]
    },
    max_weight:{
        type:Number,
        required:true,
    },
    rate_kms:{
        type:Number,
        required:true,
    },
    rate_ton:{
        type:Number,
        required:true,
    },
    no_of_seats:{
        type:Number,
        required:true,
    },
    rate_hr:{
        type:Number,
        required:true,
    },
    state_active:{
        type:String,
        required:true,
    },
    order_id:{
        type:String
    },
    last_payment_date:{
        type:Date
    },
    next_expiry_date:{
        type:Date
    },
   amount:{
    type:Number
   },
//    approved:{
//     type:String,
//     required:true,
//     default:"NOT SEEN YET "
//    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//Hashing
userSchema.pre('save', async function(next){
    console.log('hi inside');
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);

    }
    next();
})

//generate token
userSchema.methods.generateToken= async function(){
    try{
        let token_created = jwt.sign({_id:this._id.toString()},process.env.SECRETE_KEY,{ expiresIn: "10m"});
        this.tokens = this.tokens.concat({token:token_created});
        console.log("tokengenrate",this.tokens,token_created)
        await this.save();
        return token_created;

    } catch(error){
        console.log(error)
    }
}


const User = mongoose.model('TRAIL',userSchema);
module.exports=User;