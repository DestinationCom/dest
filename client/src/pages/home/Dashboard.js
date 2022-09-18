import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
import './Dashboard.css';
import CountUp from 'react-countup';




import RecommendedAuto from '../../detail/Recommended/RecommendedAuto';
import RecommendedCar from '../../detail/Recommended/RecommendedCar';
import RecommendedMini from '../../detail/Recommended/RecommendedMini';
import RecommendedPickup from '../../detail/Recommended/RecommendedPickup';
import RecommendedTruck from '../../detail/Recommended/RecommendedTruck';
import RecommendedTractor from '../../detail/Recommended/RecommendedTractor';
import RecommendedTravel from '../../detail/Recommended/RecommendedTravel';
import RecommendedJcb from '../../detail/Recommended/RecommendedJcb';

import Footer from '../../footer/footer'

import axios from 'axios';
import Card from './Card'

class Dashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      filterVehicleType:'',
      filterModel:'',
      filterTaluka:'',
      data1:null,
      total_vehicle:'',
      active_vehicle:'',

     


    }
  }

    getData = async ()=>{
      {
        let url='/vehicles/all_data'
        const res = await fetch(url, {
          method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
      // credentials:"include"
    });

    const data = await res.json();
    console.log(data,typeof(data));

    this.setState({data})
   

      }}


   activeData = async ()=>{
      {
        let url='/vehicles/active_vehicle'
        const res = await fetch(url, {
          method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
      // credentials:"include"
    });
    const active_vehicle_no = await res.json();
     console.log(active_vehicle_no.user,typeof(active_vehicle_no));
     let active_vehicle=active_vehicle_no.user
    this.setState({active_vehicle})
   

      }}
  
  vehicleData = async ()=>{
    {
      let url='/vehicles/total_vehicle'
      const res = await fetch(url, {
            method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
        // credentials:"include"
    });
    
     const total_vehicle_no = await res.json();
     console.log(total_vehicle_no.user,typeof(total_vehicle_no));
     let total_vehicle=total_vehicle_no.user
    this.setState({total_vehicle})
     
  
    }}
    


  componentDidMount(){
    this.getData();
    this.vehicleData();
    this.activeData();
  }



//   redirectSearch = async (e)=>{
//     e.preventDefault()
//     const vehicleModel=this.state.filterModel;
//     const vehicleTaluka = this.state.filterTaluka;
//     const vehicle=this.state.filterVehicleType
//     console.log(vehicle,vehicleModel)
//     let url1=`/vehicles/filterVehicle/${vehicle}`;
//     let url2=`/vehicles/filterModels/${vehicleModel}`;
//     let url3=`/vehicles/filterVehicles/${vehicle}/${vehicleModel}`;
    

//     // taluka not availale
//     if(vehicleTaluka===''){

//     if(vehicleModel===''&&vehicle===''){
//       //none(all blank) all vehicle
//       this.getData();
//     }

//     if(vehicleModel===''&&vehicle!==''){
//      //only vehicle type
       
//         const res = await fetch(url1, {
//           method:"GET",
//         headers:{
//           Accept:"application/json",
//           "Content-Type":"application/json"
//         },
      
//     });

//     const data = await res.json();
//     console.log(data,typeof(data));

//     this.setState({data}) 
//   }

//   if(vehicleModel!==''&&vehicle===''){
//     //only model
//         const res = await fetch(url2, {
//           method:"GET",
//         headers:{
//           Accept:"application/json",
//           "Content-Type":"application/json"
//         },
      
//     });

//     const data = await res.json();
//     console.log(data,typeof(data));

//     this.setState({data}) 
//     }

//   if(vehicleModel!==''&&vehicle!==''){
//     //only vehicle an model
//         const res = await fetch(url3, {
//           method:"GET",
//         headers:{
//           Accept:"application/json",
//           "Content-Type":"application/json"
//         },
      
//     });

//     const data = await res.json();
//     console.log(data,typeof(data));

//     this.setState({data}) 
//     }
//   }

//   let url4=`/vehicles/filterTalukaOnly/${vehicleTaluka}`;
//     let url5=`/vehicles/filterTalukanType/${vehicleTaluka}/${vehicle}`;
//     let url6=`/vehicles/filterTalukanModel/${vehicleTaluka}/${vehicleModel}`;
//     let url7=`/vehicles/filterAll/${vehicleTaluka}/${vehicle}/${vehicleModel}`;

//   // taluka availale
//   if(vehicleTaluka!==''){
//     if(vehicleModel===''&&vehicle===''){

//       //only taluka
//           const res = await fetch(url4, {
//             method:"GET",
//           headers:{
//             Accept:"application/json",
//             "Content-Type":"application/json"
//           },
        
//       });

//       const data = await res.json();
//       console.log(data,typeof(data));

//       this.setState({data}) 
//     }

//     if(vehicleModel===''&&vehicle!==''){
//       //taluka and type
      
//           const res = await fetch(url5, {
//             method:"GET",
//           headers:{
//             Accept:"application/json",
//             "Content-Type":"application/json"
//           },
        
//       });

//       const data = await res.json();
//       console.log(data,typeof(data));

//       this.setState({data}) 
//     }
//   if(vehicleModel!==''&&vehicle===''){
//     //taluka an model
//           const res = await fetch(url6, {
//             method:"GET",
//           headers:{
//             Accept:"application/json",
//             "Content-Type":"application/json"
//           },
        
//       });

//       const data = await res.json();
//       console.log(data,typeof(data));

//       this.setState({data}) 
//       }

//   if(vehicleModel!==''&&vehicle!==''){
//    //all filter
//         const res = await fetch(url7, {
//           method:"GET",
//         headers:{
//           Accept:"application/json",
//           "Content-Type":"application/json"
//         },
      
//     });

//     const data = await res.json();
//     console.log(data,typeof(data));

//     this.setState({data}) 
//     }
  
//   }
// }


  // handleSearchFilterVehicleType=(e)=>{
  //   console.log(e.target.name,e.target.value)
    
  //   this.setState({
  //     filterVehicleType:(e.target.value)
  //   })
    
  // }

  // handleSearchFilterModel=(e)=>{
  //   console.log(e.target.name,e.target.value)
  //   this.setState({
  //     filterModel:(e.target.value).toUpperCase()
  //   })
 
  // }
  

  // handleSearchFilterTaluka=(e)=>{
  //   console.log(e.target.name,e.target.value)
  //   this.setState(
  //     {
  //       filterTaluka:(e.target.value).toUpperCase()
  //     }
  //   )
  // }
  //  cardGap = 16;
  //  cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  render(){
  return (
  <div className="main">
    <div className="dashboard">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <img className="img" src="./images/veh_3.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img className="img" src="./images/veh_4.jpg" alt="img" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img className="img" src="./images/veh_6.jpg" alt="img" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img className="img" src="./images/veh_5.jpg" alt="img" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img className="img" src="./images/veh_2.jpg" alt="img" />
        </div>
        </SwiperSlide>
       
      </Swiper>
    </div>

    




        <br/><br/>

        <div className="grid_info">
      <div className="grid_countinfo">
          <CountUp className="count" start={0} end={8} duration={2.0}/>
          
          <p style={{textAlign:"center"}}>Type of Vehicle</p>
      </div>
      <div className="grid_countinfo" >
          <CountUp className="count" start={0} end={this.state.total_vehicle} duration={2.0}/>
          <p style={{textAlign:"center"}}>Total No. of Vehicles </p>
      </div>
      <div className="grid_countinfo">
          <CountUp className="count" start={0} end={this.state.active_vehicle} duration={2.0}/>
          <p style={{textAlign:"center"}}>Active Vehicles</p>
      </div>
    </div>










{/*       

      <form className="searchForm">
      
      <div id="search-product-wrapper">
        <div id="search-product">
          <div  id="headSearch">
          <b>Search for  Vehicles near you</b>
            
          </div>
        
        <div ><i>Search for Vehicle Type : (optional)</i>
       
        <select name="filterVehicleType" onChange={this.handleSearchFilterVehicleType}>
          <option key='0' value='' style={{color:'blue'}}>Select vehicle type</option>
          <option key='1' value='ALL'>ALL</option>
          <option key='1' value='PICK-UP'>PICK-UP</option>
          <option key='2' value='MINI-TRUCK'>MINI-TRUCK</option>
          <option key='3' value='TRUCK'>TRUCK</option>
          <option key='4' value='CAR-TAXI'>CAR-TAXI</option>
          <option key='5' value='AUTO'>AUTO</option>
          <option key='6' value='TRACTOR'>TRACTOR</option>
          <option key='7' value='JCB-CRANE'>JCB-CRANE</option>
          <option key='8' value='TRAVELS MINI-TRAVELS'>TRAVELS MINI-TRAVELS</option>
        </select>
        </div>
        </div></div>
        
        
      </form>


      <form className="searchForm1">
     
      <div id="search-product-wrapper">
        <div id="search-product">
          
        
        <div ><i>Search for Vehicle Model like Bolero : (optional)</i>
        <input
          name="filterModel"
          type="text"
          value={this.filterModel}
          onChange={ this.handleSearchFilterModel}
        />
      
        </div>
        </div></div>
      </form>

      <form className="searchForm2">
        <div id="search-product-wrapper">
        <div id="search-product">
         
       
        <div ><i>Search for Taluka/City/Area : (optional)</i>
         <input
         name="filterTaluka"
         type="text"
         value={this.filterTaluka}
         onChange={ this.handleSearchFilterTaluka}
         
        />
     
       </div>
      
       </div>
       <button id="seachBtn" style={{color:'purple',marginLeft:'150px'}} onClick={this.redirectSearch}> 
         Search
       </button></div>
     </form>


 */}




<div >

<div className="boxCard" style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}> 
{

  this.state.data.slice(0, 20).map(person =>
     
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
  
        


  </div>

    </div>
    <div>
     
     <div className='container'>
           <div className='cards1' >
                <RecommendedPickup />
            </div>
      </div>
      
      
     </div>


     <div>
     
     <div className='container'>
           <div className='cards1' >
                <RecommendedMini />
            </div>
      </div>
      
      
     </div>

     <div>
     
     <div className='container'>
           <div className='cards1' >
                < RecommendedCar/>
            </div>
      </div>
      
      
     </div>
     <div>
     
     <div className='container'>
           <div className='cards1' >
                < RecommendedTruck/>
            </div>
      </div>
      
      
     </div>


     <div>
     
     <div className='container'>
           <div className='cards1' >
                <RecommendedAuto />
            </div>
      </div>
      
      
     </div>



     <div>
     
     <div className='container'>
           <div className='cards1' >
                <RecommendedTractor />
            </div>
      </div>

      <div className='container'>
           <div className='cards1' >
                <RecommendedTravel />
            </div>
      </div>

      <div className='container'>
           <div className='cards1' >
                <RecommendedJcb />
            </div>
      </div>
      
      
     </div>
     <Footer />
   </div>
  
  );
}
}

export default Dashboard;
