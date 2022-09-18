import React,{useEffect,useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import EditForm1 from '../pages/Employees/EditForm';

//  5 "proxy": "http://127.0.0.1:5000",
const About =() =>{
    const [vehicle,setVehicle]=useState([]);
    const [isEdit,setisEdit]=React.useState(false);
    const [imagePath, setPath]=useState('');
    const navigate = useNavigate();
    const Edit=()=>()=>{
               
        
        setisEdit(true);
        
    }
    // const profile = (event) =>{
    //  navigate ("/about");
    // }

    

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
            console.log(data);
            setVehicle(data);
             setPath("http://localhost:5000/images/"+data.car_image);
             console.log(imagePath)
            
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
        console.log('useeffect');
        callAboutPage();
    },[]);


    return(
        
        
         
         <div>
         <div style={{textAlign:'center'}}>Welcome   <b>{vehicle.owner_name}</b></div>
         
         <div>
         {isEdit == false ? 
         
         
          <div class='container'>
         <div class='cards1' key={vehicle.vehicle_num}>
         <div class='image1'>
         <img style={{width:"40%", height:"40%"}} className="vehicle_img" alt="img1" src={imagePath} filename="photo" />
          
         </div>
         <div class='title1'>
           <b>{vehicle.owner_name}</b>
         </div>
         <div class='descr1'>



         <form >
                 
        <tr>
          <td><label><b>Mobile No</b></label></td>
          <td>{vehicle.mobile_num}</td>
        </tr>
        <tr>
          <td><label><b>Vehicle No</b></label></td>
          <td> {vehicle.vehicle_num}</td>
        </tr>
        <tr>
          <td><label><b>Vehicle Type </b></label></td>
          <td> {vehicle.vehicle_type}</td>
        </tr>
        <tr>
          <td><label><b>City / Travels from</b></label></td>
          <td>{vehicle.home_city}</td>
        </tr>
        <tr>
          <td><label><b>Taluka</b></label></td>
          <td> {(vehicle.locality)}</td>
        </tr>
        <tr>
          <td><label><b>Vehicle Model</b></label></td>
          <td>  {vehicle.vehicle_model}</td>
        </tr>
        <tr>
          <td><label><b>Seats Available</b></label></td>
          <td> {parseInt(vehicle.no_of_seats)}</td>
        </tr>
        <tr>
          <td><label><b>Maximum Weight</b></label></td>
          <td> {parseInt(vehicle.max_weight)}</td>
        </tr>
        <tr>
          <td><label><b>Rate per Km</b></label></td>
          <td>{parseInt(vehicle.rate_kms)}</td>
        </tr>
        <tr>
          <td><label><b>Rate per Ton</b></label></td>
          <td> {parseInt(vehicle.rate_ton)}</td>
        </tr>
        <tr>
          <td><label><b>Rate per hr</b></label></td>
          <td>  {parseInt(vehicle.rate_hr)}</td>
        </tr>
        <tr>
          <td><label><b>Ac/Non-AC</b></label></td>
          <td>  {(vehicle.ac_type)}</td>
        </tr>
        <tr>
          <td><label><b>Travelling States in India</b></label></td>
          <td> {String(vehicle.india_states)}</td>
        </tr>
        <tr>
          <td><label><b>Travelling Districts in India</b></label></td>
          <td>{String(vehicle.maharashtra_districts)}</td>
        </tr>
        <tr>
          <td><label><b>Last Payment Date</b></label></td>
          <td>{ (new Date(vehicle.last_payment_date)).toLocaleDateString() }  (mm/dd/yyyy)</td>
        </tr>
        <tr>
          <td><label><b>Premium Expiry Date</b></label></td>
          <td>{(new Date(vehicle.next_expiry_date)).toLocaleDateString() }  (mm/dd/yyyy)</td>
        </tr>
        <tr>
          <td><label><b>Premium Status</b></label></td>
          <td>{vehicle.state_active }  </td>
        </tr>
        <tr>
          <td><label><b>Approved/Not Approved</b></label></td>
          <td>{vehicle.approved }  </td>
        </tr>
        



        <button class='btnD'onClick={Edit()} >Edit..</button>
           


      </form>
    
      </div>
      </div>
    

         </div>
     
      : <EditForm1 edit='edit' vehicle_num={vehicle.vehicle_num} mobile_num={vehicle.mobile_num}/>
     }
     </div>
     {/* <button 
      onClick={profile}
     >Your Profile</button> */}
         </div>
      
    )
}
export default About;