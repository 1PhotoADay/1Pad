import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import MainContainer from '../Main/MainContainer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import GoogleOAuth from './GoogleOAuth.jsx';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styled from 'styled-components';

// const StyledGoogle = styled(GoogleOAuth)`
//   width: 700,
//   height: 800,
//   margin-top: 1rem;
// `;

export default function Login({ setShowMain, setUserId, loginUser }) {
  const navigate = useNavigate();
  // Styling of paper and button for the login screen
  const paperStyle = { padding: 20, height: 500, width: 300, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const btnstyle = {
    margin: '10px 0',
    marginBottom: '1rem',
    marginTop: '1rem',
  };
  const avatarStyle = { backgroundColor: 'primary' };

  // local state to capture the Username and Password
  const [Username, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState();

  // { Username, Password, isLoggedIn }
  // fetch function to make a POST request to the server
  const handleSubmit = () => {
    //defining the body outside fetch call
    const body = {
      username: Username,
      password: Password,
    };
    console.log('body', body);

    loginUser(body, setIsLoggedIn, setShowMain, setUserId, navigate);

    // POST request to the server with the user information and password
    // fetch('api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Successful login:', data);
    //     // if (data.isLoggedIn) {
    //     setIsLoggedIn(true);
    //     setShowMain(true);
    //     setUserId(userId);
    //     localStorage.setItem('userId', data);
    //     console.log('User ID check', data);
    //     navigate('/dashboard');
    //     // }
    //   })
    //   .catch((error) => {
    //     console.log('Error: ', error);
    //   });
  };

  // if state "isLoggedIn === true" then redirect user (using React) to the next page
  return (
    <GoogleOAuthProvider clientId='202878556363-ejdjcft3mo2782aosrpn543qe01h8dtl.apps.googleusercontent.com'>
      <div>
        {isLoggedIn === true && <MainContainer />}
        {isLoggedIn === false && (
          <Grid>
            <Paper style={paperStyle}>
              <Grid align='center'>
                <Avatar style={avatarStyle}></Avatar>
                <h1>1Pad</h1>
                <h2 style={headerStyle}>LOG IN</h2>
              </Grid>
              <TextField
                label='Username'
                placeholder='Enter email'
                fullWidth
                id='email'
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                label='Password'
                placeholder='Enter password'
                type='password'
                id='password'
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                onClick={() => handleSubmit(Username, Password, isLoggedIn)}
                fullWidth
              >
                Log in
              </Button>
              <Typography align='center'> </Typography>
              <Grid align='center'>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </Grid>
              <br></br>
              <br></br>
              <Grid align='center'>
                <Link
                  to='/'
                  component='button'
                  variant='body2'
                  underline='none'
                >
                  Back to Landing Page
                </Link>
              </Grid>
            </Paper>
          </Grid>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
