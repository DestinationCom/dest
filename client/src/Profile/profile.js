
import React,{useEffect,useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import EditForm1 from '../pages/Employees/EditForm';


const Profile =() =>{
    const [vehicle,setVehicle]=useState([]);
    const [isEdit,setisEdit]=React.useState(false);

    const navigate = useNavigate();
    const Edit=()=>()=>{
               
        
        setisEdit(true);
        
    }
    

    

    const callAboutPage = async () =>{
        try{
             
            navigate('/about')

        } catch (err)  {
            console.log(err);
           
        }
    } 
    


    useEffect(() =>{
        console.log('useeffect');
        callAboutPage();
    },[]);


    return(
        <div>Hi</div>
      
    )
}
export default Profile;