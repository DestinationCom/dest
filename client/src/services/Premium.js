
import { useState } from 'react';
import axios from 'axios';
// import ReactSpeedometer from 'react-d3-speedometer'
import Footer from '../footer/footer';
import './Premium.css';

export default function Premium (props) {
    
  const[formData,setFormData]=useState({
    isAgree:false,
    fill_data:true,
    amount:'0'
  })
  const[formData1,setFormData1]=useState({
    vehicle_number:'',
    mobile_number:''
  })
  const [paymentStatus,setpaymentStatus]=useState(
    'Here you can see Payment Status after Payment'
  );
  const [CredStatus,setCredStatus]=useState('');

  const handleChange=event=>{
    const target=event.target;
    const name=target.name;
    const value=target.type=='checkbox' ? target.checked : target.value;
    console.log(target.value);
    setFormData({
      ...formData,
      [name]:value
    })
  };
  const handleChange1=event=>{
    const target=event.target;
    const name=target.name;
     const value = (target.value);
     console.log(value)
    setFormData1({
      ...formData1,
      [name]:value
    })
  };

  const buy50 = (e) =>{
    e.preventDefault();
    setCredStatus('')
    setFormData({
      ...formData,
      amount:50
    });
    
   
  }
  const buy140 = (e) =>{
    e.preventDefault();
    setCredStatus('')
    setFormData({
      ...formData,
      amount:140
    });

    
  }
  const buy270 = (e) =>{
    e.preventDefault();
    setCredStatus('')
    setFormData({
      ...formData,
      amount:270
    });
    
  }
  const buy520 = (e) =>{
    e.preventDefault();
    setCredStatus('')
    setFormData({
      ...formData,
      amount:520
    });
    
  }


    const initialPayment = (data)=>{
      const options ={
        key:'rzp_live_FeM93NH2Jy8e7l',
       
        amount:data.amount,
        currency:data.currency,
        order_id:data.id,
        description:"Destination Mart",
        handler:async(response)=>{
          try{
       
           const verifyUrl = "/api/verify";
        
         await fetch(verifyUrl, {
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              vehicle_num:formData1.vehicle_number.toUpperCase(),
                  response: response,
                  mobile_num:formData1.mobile_number,
                  amount:formData.amount
                 
                  
          })
      }).then(response=>response.json())
      .then(data=>{
         console.log(data);
         
         setpaymentStatus(data.message)
         
        
       });
      
          }catch(error){
            console.log(error);
          }
        },
        theme:{
          color:"#3399cc",
        },


      };
      const rzp1=new window.Razorpay(options);
      rzp1.open();
    };

  const displayRazorPay = async (e) =>{
    e.preventDefault();
    const vehicleNumber=formData1.vehicle_number.toUpperCase();
          const mobile=formData1.mobile_number;
          console.log(vehicleNumber,mobile,formData.amount);
          if(formData.amount != '0'){
            
      
      let url=`/vehicles/details/${vehicleNumber}/${mobile}`;
       
          const response = await fetch(url, {
            method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            
  
          }});
          const json = await response.json();
          console.log(json.error);
          if(!json.error){
            setCredStatus('')
          
              try{


                const orderUrl = "/api/orders";
                const {data} = await axios.post(orderUrl,{
                  amount:formData.amount,
                  vehicle_number:formData1.vehicle_number,
                  mobile_number:formData1.mobile_number});
                console.log(data)
                initialPayment(data)
              }catch(error){
                console.log(error);
              }
          }
          else{
            setCredStatus('Incorrect Credentials or Register Before Premium');
          }
        }
        else{
          setCredStatus('Select Premium Amount ')
        };}
        
    
 return (
    
    <div class="container">
    <h1 class="text-center"> Buy Premium</h1>
    <form  method='POST'  encType="multipart/form-data">
    <div className="form-group">
          <input
            type="text"
            class="form-control"
            required
            name="vehicle_number"
            id="vehicle_number"
            placeholder="Vehicle Number"
            onChange={handleChange1}
            value={formData1.vehicle_number}
          />
        </div>
      {/* <div className="form-group">
        <input
          type="text"
          class="form-control"
          required
          name="name"
          id=""
          placeholder="name"
        />
      </div> */}
      
      {/* <div className="form-group">
        <input
          type="email"
          class="form-control"
          required
          name="email"
          id=""
          placeholder="email"
        />
      </div> */}
      <div className="form-group">
          <input
            type="number"
            class="form-control"
            required
            name="mobile_number"
            id="mobile_number"
            placeholder="Mobile Number"
            onChange={handleChange1}
            value={formData1.mobile_number}
          />
      </div>

      {!formData1.mobile_number || !formData1.vehicle_number ? 
      <div style={{color:'red'}}> Fill Your Vehicle Number and  Mobile Number </div> : <></>}
      



<div>
      
<div class="card1" id="first">
    <div class="card-header">
        <div class="package-name">
           <span class="card-title"/>1 Month
        </div>
    
        <div class="price">
          <p>Rs.</p>
          <h2>50</h2>
        </div>  
        <div class="form-group">
      <button class="btn1" onClick={buy50}>Select </button>
      </div>
    </div> 
         
</div>

<div class="card1" id="second">
    <div class="card-header">
       <div class="package-name">
           <span class="card-title"/>3 Months</div>
    
       <div class="price">
          <p>Rs.</p>
          <h2>140</h2>
      </div>  
      <div class="form-group">
      <button class="btn1" onClick={buy140}>Select </button>
      </div>
      </div> 
        
</div>
<div class="card1" id="third">
    <div class="card-header">
       <div class="package-name">
           <span class="card-title"/>6 Months</div>
        
       <div class="price">
            <p>Rs.</p>
           <h2>270</h2>
      </div> 
      <div class="form-group">
      <button class="btn1" onClick={buy270}>Select </button>
      </div>
      </div>  
        
</div>
<div class="card1" id="fourth">
    <div class="card-header">
       <div class="package-name">
           <span class="card-title"/>12 Months</div>
    
       <div class="price">
          <p>Rs.</p>
          <h2>520</h2>
      </div> 
       <div class="form-group">
      <button class="btn1" onClick={buy520}>Select </button>
      </div>
      </div>  
        
</div>


</div>








      {/* <div className="form-group">
        <b>Select Premium: </b>
        <div className="topping">
          <input type="radio"  name="amount" value="50" onChange={handleChange} checked={formData.amount==='50'}/>1 Month - Rs. 50 <br></br>
          <input type="radio"  name="amount" value="140" onChange={handleChange} checked={formData.amount==='140'}/>3 Months - Rs. 140<br></br>
          <input type="radio"  name="amount" value="270" onChange={handleChange} checked={formData.amount==='270'}/>6 Month - Rs. 270<br></br>
          <input type="radio"  name="amount" value="520" onChange={handleChange} checked={formData.amount==='520'}/>1 Year - Rs. 520<br></br>
        </div>
      </div> */}
      
      <br/>
      <div>
        <input type="checkbox" name="isAgree" onChange={handleChange} checked={formData.isAgree}/>
        <label>Are you Agree?</label>
      </div>
      
      <h3>Your Premium selected Amount: <span style={{color:"navy"}}>{formData.amount}</span></h3>
      <div>{paymentStatus}</div>
      <div style={{color:'red'}}>{CredStatus}</div>
      <div class="form-group">
          <button class="btn2 btn-danger btn-block " disabled={!formData.isAgree} onClick={displayRazorPay}>
              Create Payment Link
          </button>
      </div>

      
      
    </form>
    <Footer/>
  </div>
 )
}

