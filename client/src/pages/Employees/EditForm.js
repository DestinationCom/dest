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


import React , {useState ,useEffect,useContext} from 'react'
import {Navigate, useNavigate} from "react-router-dom";
 
import firebase from './firebase'
import EditForm  from './EditForm';


const genderItems = [
    { id: 'AC', title: 'AC' },
    { id: 'NON-AC', title: 'NON-AC' },
    
]


const initialFValues = {
   
    fullName: '',
    // vehicle_num: '',
    // mobile_num: '',
    id:'',
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

   want_new_photo:false,
}

 export default function EditForm1(props) {
        

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const [fileName, setFileName]= useState({
        photo: '',
        });
    const [image, setImage] = useState(null);

    const [imagePath, setPath]=useState('');
    const [vehicle,setVehicle]=useState([]);
    const navigate = useNavigate();



const [model, setModel]=useState('');
const [city, setCity]=useState('');
const [area, setArea]=useState('');
const [weight, setWeight]=useState('');
const [rate_kms, setRate_kms]=useState('');
const [rate_hrs, setRate_hrs]=useState('');
const [rate_ton, setRate_ton]=useState('');
const [seats, setSeats]=useState('');
const [ac_nac, setAc_nac]=useState('');
// const [model, setModel]=useState('');


    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(name,value.length,value)
        setValues({
            ...values,
            [name]: value
        })
        
    }
    
    const handleInputChangeCap = e => {
        const { name, value } = e.target
        console.log(value)
        setValues({
            ...values,
            [name]: String(e.target.value).toUpperCase(),
        })
       
    }
   
    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
        window.location.reload(true);
    }
    
       

        const changeFile1 =(e) =>{
            e.preventDefault();
             console.log(e.target.files[0])
             setFileName({...fileName, photo: e.target.files[0]});
             setImage(URL.createObjectURL(e.target.files[0]));
             console.log(fileName.photo,fileName.photo.name)
         }
            

    
  
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        console.log('model' in fieldValues,'weight' in fieldValues,'rate_kms' in fieldValues
        ,'rate_ton' in fieldValues,'rate_hr' in fieldValues,'seats' in fieldValues,)

        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('model' in fieldValues)
             temp.model = fieldValues.model ? "" : "This field is required."
         
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
        
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
       
        if ('states' in fieldValues)
             temp.states = fieldValues.states.length !== 0 ? "" : "This field is required."
        if ('districts' in fieldValues)
             temp.districts = fieldValues.districts.length !== 0 ? "" : "This field is required."
        
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    

    

    

  

   
   

    const handleSubmit  =  async e => {
        
        e.preventDefault()
        console.log(validate(),fileName.photo === '');
        if ((validate()) && (fileName.photo !== '')) 
        {
            console.log(values.districts,values.states,'NewImage');
           
            const formData = new FormData();
            formData.append('photo', fileName.photo);
            formData.append("vehicle_model",values.model)
            formData.append("owner_name",values.fullName)                        
            formData.append("home_city",values.city)                           
            formData.append("locality",values.area)                              
            formData.append("india_states",values.states)                                  
            formData.append("maharashtra_districts",values.districts)                                      
            formData.append( "max_weight",values.weight,)                                           
            formData.append("rate_kms",values.rate_kms )                                               
            formData.append("rate_ton",values.rate_ton)
            formData.append("rate_hr",values.rate_hr)                                                
            formData.append("no_of_seats",values.seats)
            formData.append("ac_type",values.ac_nac)
            formData.append("id",values.id)
            
            try{
                console.log('try')
                const res = await axios.post("/register/update_vehicle", formData
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
        }

        else if((validate()) && (fileName.photo === '')){
            console.log(values.districts,values.states,'notNewImage');
           
           
            
            
            
            try{
                console.log('try')
                axios({
                    method: 'post',url:'/register/update_vehicle_withoutImage', data:{
                        vehicle_model:values.model,
                        owner_name:values.fullName,                       
                        home_city:values.city,                           
                        locality:values.area,                              
                        india_states:values.states,                                  
                        maharashtra_districts:values.districts,                                      
                        max_weight:values.weight,                                           
                        rate_kms:values.rate_kms ,                                               
                        rate_ton:values.rate_ton,
                        rate_hr:values.rate_hr,                                                
                        no_of_seats:values.seats,
                        ac_type:values.ac_nac,
                        id:values.id,
              }}).then((response) => {
                    // this.setState({ articleId: response.data.id })
                    console.log(response);
                    alert(response.data.message)
                    navigate('/')
              }
                    // console.log("abc"),
                    // this.setState({backStatus:response.data})
                    )
             } catch(error){
                        console.log(error)
                        alert(error.response.data.error)
                    } 
        }

    }





    const callAboutPage = async () =>{
        try{
            //  const token=localStorage.getItem("Token")
            const res = await fetch('/about', {
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                
              
                credentials:"include"
            });

            const data = await res.json();
            setValues({
                ...values,
                'model': data.vehicle_model,
                'fullName':data.owner_name,
                'city': data.home_city,
                "area":data.locality,
                "ac_nac": data.ac_type,
                "weight":data.max_weight,
                "rate_kms":data.rate_kms,
                "rate_ton":data.rate_ton,
                "rate_hr":data.rate_hr,
                "seats":data.no_of_seats,
                'id':data._id
                // 'districts':data.maharashtra_districts,
                // 'states':data.india_states

                
            })
            console.log(data);
            // setVehicle(data);
             setPath("http://localhost:5000/images/"+data.car_image);
             console.log(imagePath)
            //  setModel(data.vehicle_model)
            //  setCity(data.home_city)
            //  setArea(data.locality)
            //  setRate_hrs(data.rate_hr)
            //  setRate_kms(data.rate_kms)
            //  setRate_ton(data.rate_ton)
            //  setWeight(data.max_weight)
            //  setSeats(data.no_of_seats)
            //  setAc_nac(data.ac_type)
             
            
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }


        } catch (err)  {
            console.log(err);
            navigate('/signup')
            
        }
    } 
    
    useEffect(() =>{
        console.log('useeffect',props.vehicle_num,props.mobile_num);
        callAboutPage();
    },[]);

    const yes =  (e) =>{
        e.preventDefault();
        console.log('yes')
        setValues({
            ...values,
            'want_new_photo': true,
        })
    };
    const no =  (e) =>{
        e.preventDefault();
        console.log('no')
        setValues({
            ...values,
            'want_new_photo': false,
        })
        setFileName({...fileName, photo: ''});
        setImage(null);
    }


    return (
        <div>
        <div>
            
        
        <Form 
        onSubmit={handleSubmit}
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
                        
                        name="model"
                        label="Vehicle Model (Format : TATA INDICA XLV 2019)"
                        // value={model}
                        // onChange={(e)=>{setModel(e.target.value)}}
                        value={values.model}
                        onChange={handleInputChangeCap}
                        
                        error={errors.model}
                    />
                    
                   

                  


                   
                    <Controls.Input
                        label="City/Town"
                        name="city"
                        type="text"
                        // value={city}
                        // onChange={(e)=>{setCity(e.target.value)}}
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
                        // value={area}
                        // onChange={(e)=>{setArea(e.target.value)}}
                        error={errors.area}
                    />
                      <Controls.RadioGroup
                        name="ac_nac"
                        label="AC/Non-AC"
                        value={values.ac_nac}
                        onChange={handleInputChangeCap}
                        // value={ac_nac}
                        // onChange={(e)=>{setAc_nac(e.target.value)}}
                        items={genderItems}
                    />

                    

                </Grid>
                <Grid item xs={6}>
                    
                <Controls.Input
                        label="Max Weight in Kg"
                        name="weight"
                        type="number"
                        value={values.weight}
                        onChange={handleInputChangeCap}
                        // value={weight}
                        // onChange={(e)=>{setWeight(e.target.value)}}
                        error={errors.weight}
                    />
                     <Controls.Input
                        label="Rate per kms in Rs."
                        name="rate_kms"
                        type="number"
                        value={values.rate_kms}
                        onChange={handleInputChangeCap}
                        // value={rate_kms}
                        // onChange={(e)=>{setRate_kms(e.target.value)}}
                        error={errors.rate_kms}
                    />
                     <Controls.Input
                        label="Rate per Ton in Rs."
                        name="rate_ton"
                        type="number"
                        value={values.rate_ton}
                        onChange={handleInputChangeCap}
                        // value={rate_ton}
                        // onChange={(e)=>{setRate_ton(e.target.value)}}
                        error={errors.rate_ton}
                    />
                    <Controls.Input
                        label="Number of Seats"
                        name="seats"
                        type="number"
                        value={values.seats}
                        onChange={handleInputChangeCap}
                        // value={seats}
                        // onChange={(e)=>{setSeats(e.target.value)}}
                        error={errors.seats}

                    />
                     <Controls.Input
                        label="Rate per hour in Rs."
                        name="rate_hr"
                        type="number"
                        value={values.rate_hr}
                        onChange={handleInputChangeCap}
                        // value={rate_hrs}
                        // onChange={(e)=>{setRate_hrs(e.target.value)}}
                        error={errors.rate_hr}

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
                    <div>Previous Photo</div>
                    <img  style={{width:"15rem"}} className="vehicle_img" alt="img1" src={imagePath} filename="photo" />
                    </div>


                    <div>
                        <b>Do you want to update your vehicle photo</b>
                        <button onClick={yes}>Yes </button>
                        <button onClick={no}style={{margin:'3px'}}>No </button>
                    </div>
                    {/* <br/><br/> */}

                   {
                    (values.want_new_photo)  ?
                    <div>
                        <input type="file" 
                        accept="image/*" onChange={changeFile1}
                        name='car_image' />
                        
                        <div  >
                            <br/>
                            <img  style={{width:"15rem"}} className="vehicle_img" alt="img1" src={image} filename="photo" />
                        </div>
                        {
                            (fileName.photo.name) ? <></>:<p style={{color:"red"}}>New Photo is not selected</p>
                        }
                    </div>
                    
                    : <></>
                    }
                   


                    


                </Grid >
                <Grid item xs={8}>
                
        


                
                    <div >
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            // disabled={initialFValues.otpVerified}
                            />
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
