// import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";
// import * as addVehicleAction from "../../actions/addVehicleAction";
// import { addVehicle } from '../../actions/addVehicleAction';

// import { MapDispatchToProps } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';

import {Navigate, useNavigate} from "react-router-dom";
import React , {useState , useContext} from 'react'
import firebase from './firebase'
import EditForm  from './EditForm';
import { red } from '@material-ui/core/colors';


const genderItems = [
    { id: 'AC', title: 'AC' },
    { id: 'NON-AC', title: 'NON-AC' },
    
]


const initialFValues = {
   
    fullName: '',
    vehicle_num: '',
    mobile_num: '',
    model:'',
    city: '',
    area:'',
    ac_nac: 'NON-AC',
    vehicle_type: '',
    
    

    states:[],
    districts:[],
    weight:'',
    rate_kms:'',
    rate_ton:"",
    rate_hr:"",
    seats:'',

    password1:'',
    confirm_password:'',

    car_image:'null',
    
    

    
}

 export default function EmployeeForm(props) {
    
    const [fileName, setFileName]= useState({
        photo: '',
 });
 const [image, setImage] = useState(null);
 const navigate = useNavigate();
 
   
  
    const changeFile1 =(e) =>{
       e.preventDefault();
        console.log(e.target.files[0])
        setFileName({...fileName, photo: e.target.files[0]});
        setImage(URL.createObjectURL(e.target.files[0]));
        console.log(fileName.photo,fileName.photo.name)
    }

    
    
  
    const onSignInSubmit = (e) => {
       
        e.preventDefault()
        if (validate()  ) 
        {
        console.log(values.mobile_num)
        console.log(fileName,fileName.photo,fileName.photo.name)
      
      
      configureCaptcha()

      console.log(values.mobile_num)
      const phone=values.mobile_num
      const phoneNumber = "+91" + phone
      console.log(phoneNumber)
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP has been sent")
            
          }).catch((error) => {
            alert("SMS not sent. Check mobile No")
          });
    }
    }




    const configureCaptcha = () =>{
        console.log('configure')
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          onSignInSubmit();
          console.log("Recaptca varified")
        },
        defaultCountry: "IN"
      });
    }
    
    const onSubmitOTP = (e) =>{

        e.preventDefault()
        
        let data1=''
        const code = values.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user))
            
            data1='ok'
            console.log(data1)
            handleSubmit();


            
        })
        .catch(function(error){
            alert('otp verification failed or refresh page')
        })
        
        
    
}
    


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
       
        if ('vehicle_type' in fieldValues)
            temp.vehicle_type = fieldValues.vehicle_type.length !== 0 ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight = fieldValues.weight ? "" : "This field is required."
        if ('rate_kms' in fieldValues)
             temp.rate_kms = fieldValues.rate_kms ? "" : "This field is required."
        if ('rate_ton' in fieldValues)
            temp.rate_ton = fieldValues.rate_ton ? "" : "This field is required."
        if ('rate_hr' in fieldValues)
            temp.rate_hr = fieldValues.rate_hr ? "" : "This field is required."
        if ('seats' in fieldValues)
            temp.seats = fieldValues.seats ? "" : "This field is required."
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('vehicle_num' in fieldValues)
            // temp.vehicle_number = (/$^|.+@.+..+/).test(fieldValues.vehicle_number) ? "" : "Email is not valid."
            
            temp.vehicle_num = (/^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{1,4}$/).test(fieldValues.vehicle_num) ? "" : "Vehicle Number is not valid. Format:XX11XX1234"
            
        if ('mobile_num' in fieldValues)
            temp.mobile_num = fieldValues.mobile_num.length === 10 ? "" : " 10 numbers required."
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
       
        if ('states' in fieldValues)
             temp.states = fieldValues.states.length !== 0 ? "" : "This field is required."
        if ('districts' in fieldValues)
             temp.districts = fieldValues.districts.length !== 0 ? "" : "This field is required."
        if ('model' in fieldValues)
             temp.model = fieldValues.model ? "" : "This field is required."
        if ('password1' in fieldValues)
             temp.password1 = fieldValues.password1 ? "" : "This field is required."
        if ('confirm_password' in fieldValues)
            
             temp.confirm_password = (fieldValues.confirm_password)   ? "" : "This field is required."
        if(('confirm_password' in fieldValues) && ('password1' in fieldValues))
             temp.confirm_password = fieldValues.confirm_password===fieldValues.password1 ? '' :"Password Mismatch."
             
        
        
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputChangeCap,
        
        resetForm
    } = useForm(initialFValues, true, validate);

    
    const handleSubmit =  async e => {
        
        {console.log('hs');
        // e.preventDefault();
        const formData = new FormData();
        formData.append('photo', fileName.photo);
        
        
        
        formData.append("vehicle_num",values.vehicle_num);
        formData.append( "password", values.password1);
        formData.append("mobile_num",values.mobile_num)
        formData.append("vehicle_type", values.vehicle_type)
        formData.append("vehicle_model",values.model)
        formData.append("owner_name",values.fullName)                        
        formData.append("home_city",values.city,)                           
        formData.append("locality",values.area,)                              
        formData.append("india_states",values.states,)                                  
        formData.append("maharashtra_districts",values.districts,)                                      
        formData.append( "max_weight",values.weight,)                                           
        formData.append("rate_kms",values.rate_kms )                                               
        formData.append("rate_ton",values.rate_ton)
        formData.append("rate_hr",values.rate_hr)                                                
        formData.append("no_of_seats",values.seats)
        formData.append("ac_type",values.ac_nac)
        formData.append("state_active",'INACTIVE')
        formData.append("amount",0)
       
       

                       
        // {
        //     console.log(
        //         values.vehicle_num,values.password1,values.mobile_num,values.vehicle_type,
        //         values.model,values.fullName,values.city,values.area,values.states,
        //         values.districts,values.weight,values.rate_kms ,values.rate_ton,values.seats,
        //         values.ac_nac,values.car_image)
           
        //         let url='/register/add_vehicle';
        //         axios
        //         .post(url,{
        //             vehicle_num:values.vehicle_num,
        //             password: values.password1,
        //             mobile_num:values.mobile_num,
        //             vehicle_type: values.vehicle_type,
        //             vehicle_model:values.model,
        //             owner_name:values.fullName,
        //             home_city:values.city,
        //             locality:values.area,
        //             india_states:values.states,
        //             maharashtra_districts:values.districts,
        //             max_weight:values.weight,
        //             rate_kms:values.rate_kms ,
        //             rate_ton:values.rate_ton,
        //             no_of_seats:values.seats,
        //             ac_type:values.ac_nac,
        //             car_image:"abc",
        //             state_active:'ACTIVE',
                    
                   
        //         })
              
        //             .then((response) => {
                        
        //                 initialFValues.msg=response.data.message
                        
        //                 if(response.data.message==='Vehicle already exist'){
        //                     alert('Vehicle already Registered.')
                       
        //             }
        //                 else if(response.data.message==='Vehicle added Successfully'){
        //                     alert('Vehicle added Successfully')
                            
        //                 }
        //                 else{
        //                     alert(' Fill valid Mobile numbers or Refresh page')
        //                 }
                       
        //             })
                
               
        //       resetForm()
              
        // }
        try{
        
        // const res = await axios.post("/register/add_vehicle", formData
        const res = await axios.post("/register", formData
        // {
            // method:"POST",
            // headers:{
            //     "Content-Type":"application/json"
            // },
            // body:formData
            // JSON.stringify
            // ({
                // vehicle_num:values.vehicle_num,
                //     password: values.password1,
                //     mobile_num:values.mobile_num,
                //     vehicle_type: values.vehicle_type,
                //     vehicle_model:values.model,
                //     owner_name:values.fullName,
                //     home_city:values.city,
                //     locality:values.area,
                //     india_states:values.states,
                //     maharashtra_districts:values.districts,
                //     max_weight:values.weight,
                //     rate_kms:values.rate_kms ,
                //     rate_ton:values.rate_ton,
                //     rate_hr:values.rate_hr,
                //     no_of_seats:values.seats,
                //     ac_type:values.ac_nac,
                //     car_image:fileName,
                //     state_active:'ACTIVE',
                
                    
            // })
        // }
        )
        console.log(res)
        if(res.status===201){
            alert(res.data.message)
        }
        else{
            console.log(res)
            alert(res.data.error)
        }
        } catch(error){
            console.log(error)
            alert(error.response.data.error)
        }
        // const data = await res.json();
        // console.log(res);
        // if(res.status=== 422 || !res){
        //     alert('Invalid Details')
        // }
        // else if(res.status=== 406){
        //     alert('Vehicle already Registered')
        // }
        // else if(res.status=== 200){
        //     alert('Vehicle added Successfully')
        // }
        // else{
        //     alert("check photo")
        // }
        resetForm();
        // resetimage();
        navigate('/signup')
        }
    }







    return (
        <div className='form-box'>
        <div>
            
        
        <Form 
        onSubmit={handleSubmit} method="POST" encType="multipart/form-data"
        >
            
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Vehicle Owner Name"
                        type="text"
                        value={values.fullName}
                        onChange={handleInputChangeCap}
                        error={errors.fullName}
                        
                       
                    />
                    <Controls.Input
                        label="Vehicle Number"
                        name="vehicle_num"
                        type="text"
                        value={values.vehicle_num}
                        onChange={handleInputChangeCap}
                        error={errors.vehicle_num}
                    />
                    <Controls.Input
                        label="Mobile Number"
                        name="mobile_num"
                        type="number"
                        value={values.mobile_num}
                        onChange={handleInputChange}
                        error={errors.mobile_num}
                    />
                   
                    <Controls.Select
                        
                        name="vehicle_type"
                        label="Type of Vehicle"
                        value={values.vehicle_type}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.vehicle_type}
                    />
                     <Controls.Input
                        
                        name="model"
                        label="Vehicle Model (Format : TATA INDICA XLV 2019)"
                        value={values.model}
                        onChange={handleInputChangeCap}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.model}
                    />
                    <Controls.Input
                        label="City/Town/Area"
                        name="city"
                        type="text"
                        value={values.city}
                        onChange={handleInputChangeCap}
                        error={errors.city}
                    />
                    
                    <Controls.Input
                        label="Taluka"
                        name="area"
                        type="text"
                        value={values.area}
                        onChange={handleInputChangeCap}
                        error={errors.area}
                    />
                      <Controls.RadioGroup
                        name="ac_nac"
                        label="AC/Non-AC"
                        value={values.ac_nac}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                    

                </Grid>
                <Grid item xs={6}>
                    
                <Controls.Input
                        label="Max Weight in Kg"
                        name="weight"
                        type="number"
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                    />
                     <Controls.Input
                        label="Rate per kms in Rs."
                        name="rate_kms"
                        type="number"
                        value={values.rate_kms}
                        onChange={handleInputChange}
                        error={errors.rate_kms}
                    />
                     <Controls.Input
                        label="Rate per Ton in Rs."
                        name="rate_ton"
                        type="number"
                        value={values.rate_ton}
                        onChange={handleInputChange}
                        error={errors.rate_ton}
                    />
                    <Controls.Input
                        label="Number of Seats"
                        name="seats"
                        type="number"
                        value={values.seats}
                        onChange={handleInputChange}
                        error={errors.seats}

                    />
                     <Controls.Input
                        label="Rate per hour in Rs."
                        name="rate_hr"
                        type="number"
                        value={values.rate_hr}
                        onChange={handleInputChange}
                        error={errors.rate_hr}

                    />
                    <Controls.Input
                        name="password1"
                        label="Password"
                        type="password"
                        value={values.password1}
                        onChange={handleInputChange}
                        error={errors.password1}
                       
                    />
                    <Controls.Input
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        value={values.confirm_password}
                        onChange={handleInputChange}
                        error={errors.confirm_password}
                       
                    />
                   
                    
                </Grid>
                <Grid item xs={8}>
                    
                     <Controls.MulSelect
                        
                        name="states"
                        label=" Travelling States are "
                        value={values.states}
                        onChange={handleInputChange}
                        options={employeeService.getStates()}
                        error={errors.states}
                    />

                    <Controls.MulSelect 
                        name="districts"
                        label=" Travelling Districts in Maharashtra are"
                        value={values.districts}
                        onChange={handleInputChange}
                        options={employeeService.getDistricts()}
                        error={errors.districts}
                    />  
                  <div>
                      <br/>
                      <label> <b>Upload Vehicle Photo  </b>  (* compulsory)</label><br/><br/>
                    <input type="file" 
                    accept="image/*" onChange={changeFile1} error={errors.car_image}
                     name='car_image' />
                     
                    <div  >
                        <br/>
                        <img  style={{width:"15rem"}} className="vehicle_img" alt="img1" src={image} filename="photo" />
                    </div>
                    {
                          (fileName.photo.name) ? <></>:<p style={{color:"red"}}>Photo not available</p>
                      }
                  </div>


                </Grid >
                <Grid item xs={8}>
                
        <div>
        <br/>
        <div className='otp_verify'>
            
          <h2>OTP Verification</h2>
        <form > 
        <div id="sign-in-button"></div>
          <h3>{values.mobile_num}</h3>
         
          <button onClick={onSignInSubmit}>Send Otp</button>
        </form>
        </div>
        <div className='otp_verify'>
        <h2>Enter OTP</h2>
        <form >
          <input type="number"  required value={values.otp} name="otp" placeholder="Enter OTP here"  onChange={handleInputChange} error={errors.otp}/>
          
          <button type="submit" style={{backgroundColor:"purple"}} onClick={onSubmitOTP} >Submit</button>
        </form>
        
        </div>
      </div>


                
                    <div >
                        {/* <Controls.Button
                            type="submit"
                            text="Submit" 
                            // disabled={initialFValues.otpVerified}
                            /> */}
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid> 
                
            </Grid>
            
        </Form>
 
        </div>
        </div>
    )
}
// const MapDispatchToProps=(dispatch)=>({
//     addVehicle:(fullName,mobile,ac_nac,states)=>
//         dispatch(addVehicle(fullName,mobile,ac_nac,states)),

// });
// export default withRouter(
//     connect(MapDispatchToProps)(EmployeeForm)
// )
// ;
