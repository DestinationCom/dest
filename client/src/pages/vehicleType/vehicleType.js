import React, { Component } from 'react';
import Card from '../home/Card'
import { useLocation } from "react-router-dom";

export default class vehicleType extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          filterVehicleType:'',
          filterModel:'',
          filterTaluka:'',
          vehicleType:''
        }
    }
     
    
    
     
    

    componentDidMount(){
        // this.getData();
        const vehicleType = window.location.href.split('/')[4];
        
        this.setState({vehicleType:vehicleType.toUpperCase()});
        this.getData(vehicleType);
        
        
    }
   
    
    
    
    
    getData = async (vehicleType)=>{
        {
          
         
          console.log(vehicleType,'getdata');
          const vehicle = vehicleType.toUpperCase();
          let url1=`/vehicles/filterVehicle/${vehicle}`;
          const res = await fetch(url1, {
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

  redirectSearch = async (e)=>{
    e.preventDefault()
    const vehicle = this.state.vehicleType;
    const vehicleModel=this.state.filterModel;
    const vehicleTaluka = this.state.filterTaluka;
    // const vehicle=this.state.filterVehicleType
    console.log(vehicle,vehicleModel,"redirect")
    let url1=`/vehicles/filterVehicle/${vehicle}`;
    let url2=`/vehicles/filterModels/${vehicleModel}`;
    let url3=`/vehicles/filterVehicles/${vehicle}/${vehicleModel}`;
    

    // taluka not availale
    if(vehicleTaluka===''){

    if(vehicleModel===''){
      //none(all blank) all vehicle
      this.getData(vehicle);
    }

  

    if(vehicleModel!==''&&vehicle!==''){
    //only vehicle an model
        const res = await fetch(url3, {
          method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
      
    });

    const data = await res.json();
    console.log(data,typeof(data));

    this.setState({data}) 
    {data.length !== 0 ? console.log('aV') :console.log("NAV")}
    }
  }

  let url4=`/vehicles/filterTalukaOnly/${vehicleTaluka}`;
    let url5=`/vehicles/filterTalukanType/${vehicleTaluka}/${vehicle}`;
    let url6=`/vehicles/filterTalukanModel/${vehicleTaluka}/${vehicleModel}`;
    let url7=`/vehicles/filterAll/${vehicleTaluka}/${vehicle}/${vehicleModel}`;

  // taluka availale
  if(vehicleTaluka!==''){
   

    if(vehicleModel===''&&vehicle!==''){
      //taluka and type
      
          const res = await fetch(url5, {
            method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
        
      });

      const data = await res.json();
      console.log(data,typeof(data));

      this.setState({data}) 
      console.log(data === null)
    }

  

  if(vehicleModel!==''){
   //all filter
        const res = await fetch(url7, {
          method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
      
    });

    const data = await res.json();
    console.log(data,typeof(data));

    this.setState({data}) 
    }
  
  }
}
  handleSearchFilterVehicleType=(e)=>{
    console.log(e.target.name,e.target.value)
    
    this.setState({
      filterVehicleType:(e.target.value)
    })
    
  }

  handleSearchFilterModel=(e)=>{
    console.log(e.target.name,e.target.value)
    this.setState({
      filterModel:(e.target.value).toUpperCase()
    })
 
  }
  

  handleSearchFilterTaluka=(e)=>{
    console.log(e.target.name,e.target.value)
    this.setState(
      {
        filterTaluka:(e.target.value).toUpperCase()
      }
    )
  }
  render() {
    // console.log(this.state.vehicleType) ;
    
    // const { vehicleType } = this.props.match.params;
    // const vehicleType = window.location.href.split('/')[4]

    return (
        <div>
          
        <div>
      
        <form className="searchForm">
        {/* <div className="search"> */}
        <div id="search-product-wrapper">
        <div id="search-product">
            <div  id="headSearch">
            <b>Search for  Vehicles near you</b>
            
            </div>
        
        {/* <div ><i>Search for Vehicle Type : (optional)</i>
        
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
        </div> */}
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
        </div>



        <div  style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}> 
{
     (this.state.data ).length !== 0 ? 
    
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
     :
     
     <div style={{  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <h2 style={{alignItems:'center',padding:'20px'}}>No Data Available</h2>
</div>

    }
  
  
  
  
        


  </div>
        </div>




            )
        }
}


