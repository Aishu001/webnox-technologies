import React from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useNavigate , Link } from 'react-router-dom';
// import '../Style/SingUp.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';


function SignUp() {
    const navigate = useNavigate();
  const Item = styled(Paper)();
  const onFinish = (values) => {
    axios.post('http://localhost:3000/user/login', {
      email: values.email,
      password: values.password
    })
      .then(response => {
        // Handle success
        console.log('Login successful:', response.data);
        const token = response.data.token;
    
        // Store token and email in local storage
        localStorage.setItem('email', values.email);
        localStorage.setItem('accessToken', token);
       
    
        // Redirect to another page or perform any necessary actions
        navigate('/dashboard');
      })
      .catch(error => {
        // Handle error
        console.error('Error during login:', error);
        // Display error message to the user
      });
    
  };
  return (
   <>
     <Box>

<Grid container spacing={0}  className='containerPIG'>
    <Grid item xs={6}  >
     <Item className="form-contaiNER">
    <div className="form-container-DIVV">

    <div className="IMMG-container">
   <p className='register'>Welcome back!</p>
        <img src="login.jpeg" alt="" className='iMMage'/>
    </div>
    <div className="form-contENt">
    <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email ID"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Link to="/signup"><p>Forget Password? </p></Link>

        <Form.Item>
        <br />
        <br />
          <Button type="primary" htmlType="submit">
            Login
          </Button>
         
        </Form.Item>

        <Link to="/signup"><p>Don't have an account? Sign up</p></Link>
      </Form>
    </div>
     
    </div>
 
     </Item>
  </Grid>

</Grid>
 
  
</Box>
   </>
  )
}

export default SignUp