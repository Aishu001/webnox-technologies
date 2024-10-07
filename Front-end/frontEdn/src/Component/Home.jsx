import React from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material'; 
import { Link } from 'react-router-dom';
// import '../Style/LandingPage.css'; // Corrected import statement
import '../Style/Home.css';


function Home() {
  return (
   <>
     {/* <div className='landingpage'> */}
     
     <Box>
        <Grid container>
         
          <Grid item xs={4} className="center-content">
            <div className="card-img1">
              <div className="text-img1">
                <Typography variant="body2" color="text.secondary">
                  <h1 className='headingTextt'> Why Choose Peppie Chat?</h1>
                  <span className='subContent'>
                    User-Friendly Interface: Our intuitive interface makes it easy for users of all ages to navigate and enjoy chatting without any hassle. <br />
                    End-to-End Encryption: Your privacy and security are our top priorities. With end-to-end encryption, your messages, calls, and shared media are fully protected from unauthorized access. <br />
                    Versatile Communication Tools: From text messaging to voice and video calls, Peppie Chat offers a variety of communication tools to suit your needs. Stay connected in real-time, no matter where you are. <br />
                    Customizable Experience: Personalize your chat experience with customizable themes, stickers, and emojis. Express yourself in unique ways and make every conversation memorable. <br />
                    Cross-Platform Compatibility: Whether you're using a smartphone, tablet, or desktop computer, Peppie Chat is available on multiple platforms, ensuring seamless communication across devices. <br />
                  </span>
                  <Link to='/signUp' style={{ textDecoration: 'none' }}>
            <Button
              className='start'
              sx={{
                color: 'white',
                backgroundColor: '#007bff',
                marginLeft: '50px',
                marginTop: '30px', // Example background color
                padding: '15px',
                borderRadius: '10px',
                fontSize: '15px',
                boxShadow: '0 8px 40px rgba(0,0,0,.12)',
                backgroundColor: '#0056b3',

                '&:hover': {
                  backgroundColor: ' #007bff',
                  // Example hover background color
                },
              }}
            >
              Get Start
            </Button>
          </Link>
                  <br />
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={8} className="center-content">
            <img src="home.jpeg" alt="" className="landing-img" />
          </Grid>
        </Grid>
      </Box>
      {/* </div> */}

   </>
  )
}

export default Home