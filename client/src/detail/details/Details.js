

import {useNavigate,useParams} from 'react-router-dom'; 
import './Details.css'
import axios from 'axios';
import { useState,useEffect } from 'react';
import Contact from './Contact'

// import img1 from '../../assets/veh_5.jpg';
import Premium from '../../services/Premium';
import Recommended from '../Recommended/RecommendedCity';

export default function Details (props) {
  
  
  
  let navigate=useNavigate();
  const [users,setUsers]=useState([])
  const {vehicleNumber,mobile,_id} = useParams();
  const [loading, setLoading] = useState(false);
  const [imagePath, setPath]=useState('');

  const [btnpopup,setBtnPopup]=useState(false);
  const [trigger,setTrigger]=useState(true);

  console.log(props)

    const home=()=>()=>{
             
      navigate('/' )
        
        
    }


    useEffect(()=>{
      
      setBtnPopup(false);
      setLoading(true);

      console.log('mobile',{mobile})
      
      
  
    
    
      
      const fetchData = async () => {
        try {
          let url=`/vehicles/details/${vehicleNumber}/${mobile}`;
       
          const response = await fetch(url, {
            method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            
  
          }});
          const json = await response.json();
          console.log(json);
          setUsers(json);
          console.log((json.car_image));
          setPath("http://localhost:5000/images/"+json.car_image);
    
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();
    },[_id]);
   

    const contact =e =>{
      <Contact mob={users.mobile_num} />
    }
    
    
 return (
  //  <div className='container'>
  // <div className='cards1' key={users._id}>
  // <div className='image1'>
  // {/* <img src={img1} alt="img"></img> */}
  // <img  style={{width:"40%", height:"40%"}}  alt="img" src={imagePath}  />
  // </div>
  // <div className='title1'>
  //   <b>{users.owner_name}</b>
  // </div>
  // <div className='descr1'>


  //     <form >
  //       <tr>
  //         <td><label><b>Mobile No</b></label></td>
  //         <td>{users.mobile_num}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Vehicle No</b></label></td>
  //         <td> {users.vehicle_num}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Vehicle Type </b></label></td>
  //         <td> {users.vehicle_type}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>City / Travels from</b></label></td>
  //         <td>{users.home_city}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Taluka</b></label></td>
  //         <td> {(users.locality)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Vehicle Model</b></label></td>
  //         <td>  {users.vehicle_model}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Seats Available</b></label></td>
  //         <td> {parseInt(users.no_of_seats)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Maximum Weight</b></label></td>
  //         <td> {parseInt(users.max_weight)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Rate per Km</b></label></td>
  //         <td>{parseInt(users.rate_kms)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Rate per Ton</b></label></td>
  //         <td> {parseInt(users.rate_ton)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Rate per hr</b></label></td>
  //         <td>  {parseInt(users.rate_hr)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Ac/Non-AC</b></label></td>
  //         <td>  {(users.ac_type)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Travelling States in India</b></label></td>
  //         <td> {String(users.india_states)}</td>
  //       </tr>
  //       <tr>
  //         <td><label><b>Travelling Districts in India</b></label></td>
  //         <td>{String(users.maharashtra_districts)}</td>
  //       </tr>






  //     </form>
    
    
     
  //    </div>
  //           <br/>
           
  //   <button className='btnD'onClick={home()} >Home..</button>
  //    </div>
    
          
    
  // </div>
  
<div className='container' key={users._id}>
  <div className='cards1' key={users._id}>
  <div className='image1'>
  
      <img  style={{width:"80%"}}  alt="img" src={imagePath}  />
      <div>
        <button onClick={()=>setBtnPopup(true)}>Contact to Owner</button>
        <Contact key={users._id} trigger={btnpopup} setTrigger={setBtnPopup} mobile_num={users.mobile_num}>
          
        </Contact>
      </div>
      
  </div>
  <div className='title1'>
    <b className='t2'>{users.owner_name}</b>
  </div>
  <div className='descr1'>


      <form >
        
          <div className='veh_num'><span className='t2'> {users.vehicle_num}</span></div>
          <div className='home_city'> <b className='t2'>{users.home_city}</b> (<span>{users.locality}</span>)</div>
          
          <div className='vehicle_model'><span className='t2'> {users.vehicle_model}</span></div>
          </form>
          
          
          <form>

          
          <tr>
          <td><label><b>Travelling States in India :</b></label></td>
          <td> {String(users.india_states)}</td>
        </tr>
        <tr>
          <td><label><b>Travelling Districts in India :</b></label></td>
          <td>{String(users.maharashtra_districts)}</td>
        </tr>
       
         
        
        
        <tr>
          <td><label><b>Seats Available :</b></label></td>
          <td> {parseInt(users.no_of_seats)}</td>
        </tr>
        
        <tr>
          <td><label><b>Ac/Non-AC :</b></label></td>
          <td>  {(users.ac_type)}</td>
        </tr>
        






      </form>
    
    
     
     </div>
            
     </div>
    

    <div className='container'>
     
    <div className='cards1' key={users._id}>
    <div className='title1'>
        Specification:
      </div>
     <div className='descr'>
        <form>
        { parseInt(users.max_weight)===0?
           <></>:
        <tr className='speci'>
          <td><label><b>Maximum Weight :</b></label></td>
          <td> {parseInt(users.max_weight)} kg</td>
        </tr>
        } 

        { parseInt(users.rate_kms)===0?
           <></>: 
        <tr className='speci'>
          <td><label><b>Rate per Km :</b></label></td>
          <td><span class="WebRupee">&#x20B9;</span> {parseInt(users.rate_kms)}  </td>
        </tr>
        }

        { parseInt(users.rate_ton)===0?
           <></>: 
        <tr className='speci'>
          <td><label><b>Rate per Ton :</b></label></td>
          <td> <span class="WebRupee">&#x20B9;</span> {parseInt(users.rate_ton)}</td>
          
        </tr>
        }

        { parseInt(users.rate_hr)===0?
           <></>: 
        <tr className='speci'>
          <td><label><b>Rate per hr :</b></label></td>
          <td> <span class="WebRupee">&#x20B9;</span> {parseInt(users.rate_hr)}</td>
        </tr> 
        }
           
        </form>
     </div>
     </div>
     </div>

     <div>
      {((users.home_city) && (users.vehicle_type) ) ?
     <div className='container'>
           <div className='cards1' key={users._id}>
                <Recommended home_city={users.home_city} vehicle_type={users.vehicle_type}/>
            </div>
      </div>
      :
      <></>
      }
     </div>
          
     <button className='btnD'onClick={home()} >Home..</button>
  </div>
  
  


 )
}