import React from 'react';
import { useState,useEffect } from 'react';
import Card from '../../pages/home/Card';

export default function Recommended(props) {
    const [use,setUsers]=useState([]);
    const [imagePath, setPath]=useState('');
    console.log(props.home_city,props.vehicle_type,use,use.length)

    useEffect(()=>{
     

      
        const fetchData = async () => {
          try {
            console.log(props.home_city,props.vehicle_type)
            const vehicleTaluka= props.home_city;
            const vehicle = props.vehicle_type;
            let url5=`/vehicles/filterTalukanType/${vehicleTaluka}/${vehicle}`;
         
            const res = await fetch(url5, {
                method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
            
          });
    
          const users = await res.json();
          
          console.log(users,typeof(users));
    
          setUsers(users) 
           
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
      },[]);
     


  return (
    <div  >
      <div style={{display:'flex'}}> <b>Recommendation with City:</b></div>
     
    
    <div  style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}>  
    {

      use.map(person =>
        
         
         <Card
                              owner_name={person.owner_name}
                             mobile_num={person.mobile_num}
                             vehicle_num={person.vehicle_num}
                             vehicle_type={person.vehicle_type}
                             home_city={person.home_city}
                             vehicle_model={person.vehicle_model}
                             seats={person.no_of_seats}
                             _id={person._id}
                             car_image={person.car_image}
                             />
                             
            
      )
      
      }
      </ div>
      </div>
    
  )
}
