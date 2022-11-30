import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SideMenu from "./components/SideMenu";
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Employees from "./pages/Employees/Employees";
import Login from './services/Login'

import Premium from './services/Premium'
import Dashboard from './pages/home/Dashboard';
import Details from './detail/details/Details';



import About from './about/about'
import Profile from './Profile/profile';
import Vehicle from './pages/vehicleType/vehicleType';
import ChangePassword from './services/changePass';
import ForgetPassword from './services/forgetPass';
// import {AuthContext} from './Api/AuthContext';
// import Admin from './admin/admin';






const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  

  return (
    <ThemeProvider theme={theme}>
      {/* <SideMenu /> */}
      <div className={classes.appMain}>
        
        <BrowserRouter>
        <Navbar  />
        <div className="content">
        <Routes> 
       
          <Route path="/"  element={<Dashboard/>}/>
          <Route  path="/register" element={<Employees/>}/>


          <Route  path="/signup" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}/>
           
          <Route exact path="/home/:_id/:vehicleNumber/:mobile" element={<Details/>}/>
          <Route  path="/premium" element={<Premium/>}/>
         
         {/* <Route path="/edit/:vehicleNumber/:mobile" element={<Edit/>}/> */}
         
         <Route path='/vehicle/:veehicleType' element={<Vehicle/>}/>
         <Route path='/change_password' element={<ChangePassword/>}/>
         <Route path='/forget_password' element={<ForgetPassword/>}/>
         {/* <Route path='/admin' element={<Admin/>}/> */}
         
         </Routes> 
       
        </div>
      </BrowserRouter>
        
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
