import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';



import Footer from '../footer/footer'

import {useNavigate} from 'react-router-dom'; 

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({handleClick,handleFeed}) {

  

  const navigate=useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      vehicle_number: data.get('vehicle_number'),
      mobile_number: data.get('mobile_number'),
      password: data.get('password'),
    });

     let url='/api/signin';
     
    const res = await fetch(url, {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          vehicle_num:(data.get('vehicle_number')).toUpperCase(),
              password: data.get('password'),
              mobile_num:data.get('mobile_number'),
             
              
      })
  });
  console.log(res)
  const data1 = await res.json();

  console.log(data1,res.status,data1.error,data1.message);
  if(res.status=== 422 || !data1){
    
    alert(data1.error)
  }
  else if(res.status!== 200){
    
      alert(data1.error)
  }
  else {
      
      alert(data1.message);
      const tokenNew=(data1.token);
      localStorage.setItem("Token",tokenNew);
      console.log(tokenNew)
      
        navigate(`/about`);
      
      
  }
  
  }



  return (
    <ThemeProvider theme={theme}>
      <div>
       
  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              
            

            <TextField
              margin="normal"
              required
              fullWidth
              id="vehicle_number"
              label="Vehicle Number"
              name="vehicle_number"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile_number"
              label="Mobile Number"
              name="mobile_number"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleFeed}
            >
              Login 
            </Button><br/><br/>
            <Grid container>
              <Grid item xs style={{ display: "flex", justifyContent: "space-between" }}>
                <Link href="#" variant="body2"  >
                  Forgot password?
                </Link>
                
                <Link href="#" variant="body2" >
                  Change password?
                </Link>
                
                
                
              </Grid>
            </Grid>
          </Box>
          
        </Box>
        <br/><br/>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        
      </Container>

      <Footer/>
       
      </div>
      
     
    </ThemeProvider>



  );
}