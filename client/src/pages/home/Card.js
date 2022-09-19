// import "./Card.scss"

import {useNavigate} from 'react-router-dom'; 
export default function Card (props) {
  const imagePath ="https://destapp1.herokuapp.com/images/"+ props.car_image;
  
  
  // http://localhost:5000/
    const navigate=useNavigate();
    const details=(v1,v2)=>()=>{
            console.log(props.mobile_num,props.vehicle_num)
        
         navigate(`/home/${props._id}/${props.vehicle_num}/${props.mobile_num}`)
        
    }
 return (
    
    <div class='cards' key={props._id}>
      <div class='image'>
      {/* <img src="./images/veh_4.jpg" alt="img"></img> */}
      <img  style={{ height:"12rem"}}  alt="img" src={imagePath}  />
      </div>
      <div class='title'>
        <b>{props.owner_name}</b>
      </div>
      <div class='descr'>
      {/* <div> +91  {props.mobile_num}</div> */}
                {/* <br/>
                <div><b>Vehicle No: </b> {props.vehicle_num}</div>
                <br/>
                <div> <b>Vehicle Type : </b>   {props.vehicle_type}</div>
                <br/>
                <div><b>City / Travels from:</b>  {props.home_city}</div>
                <br/>
               
                
                <div><b>Vehicle Model: </b>  {props.vehicle_model}</div>
                <br/>
                <div><b>Seats Available: </b>  {parseInt(props.seats)}</div> */}
               
                {/* <div> {props.vehicle_num}</div> */}
                
               
                <div><b>Travels from:</b>  {props.home_city}</div>
                
               
                
                <div>  {props.vehicle_model}</div>
                

        <button class='btnD' onClick={details(props.vehicle_num,props.mobile_num,props._id)} >Details..</button>
        </div>
      </div>
   
 )
}