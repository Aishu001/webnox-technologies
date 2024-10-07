import React from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useNavigate , Link } from 'react-router-dom';
// import '../Style/SingUp.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';


function Login() {
  const Item = styled(Paper)();
  const navigate = useNavigate()

  const onFinish = (values) => {
    // Send the form data to the backend
   
    axios.post('http://localhost:3000/user/signUp', {
     
      email: values.email,
      password: values.password
    
    })
      .then(response => {
        // Handle success
        console.log('Data submitted successfully:', response.data);
        // Redirect to another page
        navigate('/login')
      
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting data:', error);
        // Display error message to the user
      })
  };
  return (
   <>
      <Box>
        <Grid container spacing={0}  className='containerX'>

  <Grid item xs={6}  >
  <Item className="form-containerF"> 
       
       <div className="form-container-divVC">
       <div className="image-container-fomrs">
       <p className='register'>Create an account</p>
            <img src="signUp.jpeg" alt="" className='imageSC'/>
        </div>
        <div className="form-contentD">
        <Form onFinish={onFinish}>


    <Form.Item
        name="email"
        label="E-mail"
        className="form-item"
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
        className="gender-item"
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

  

    <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
            {
                validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
        ]}
    >
        <Checkbox>
            I have read the <a href="#">agreement</a>
        </Checkbox>
    </Form.Item>
   
    <Form.Item>
        <Button type="primary" htmlType="submit">
            Register
            <span></span>

        </Button>
        <p className='terms'>By registering, you agree to peppie's Terms of Service and Privacy Policy.</p>
    </Form.Item>
 <Link to = "/login"><p >Already have a account?  Login </p></Link>   


   
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

export default Login