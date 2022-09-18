import React from 'react';
import { useState,useEffect } from 'react';
import Card from '../../pages/home/Card';

export default function RecommendedTravel(props) {
    const [use,setUsers]=useState([]);
    const [imagePath, setPath]=useState('');
    const a =5;

    useEffect(()=>{
     

      
        const fetchData = async () => {
          try {
            
            const vehicle = 'TRAVELS MINI-TRAVELS';
            let url5=`/vehicles/filterVehicle/${vehicle}`;
         
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
      <div style={{display:'flex'}}> <b>Travels / Mini-Travels:</b></div>
     
    
    <div  style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}>  
    {

      use.slice(0, a).map(person =>
        
         
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
