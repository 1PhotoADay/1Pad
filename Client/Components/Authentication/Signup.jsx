import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import MainContainer from '../Main/MainContainer.jsx';
import GoogleOAuth from './GoogleOAuth.jsx';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const StyledGoogle = styled(GoogleOAuth)`
  margin-top: 1rem;
`;

const Signup = ({ setUserId, setShowMain }) => {
  const navigate = useNavigate();
  //styling of the apps and button
  const paperStyle = { padding: 20, height: 500, width: 300, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: 'primary' };

  // setting local state for the app
  const [Username, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = () => {
    const body = {
      username: Username,
      password: Password,
    };

    fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Successful login:', data);
        // if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setShowMain(true);
        setUserId(data);
        console.log('User ID check', data);
        navigate('/dashboard');
        // }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  return (
    <div>
      {isLoggedIn === true && <MainContainer />}
      {isLoggedIn === false && (
        <Grid>
          <Paper style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}></Avatar>
              <h1>1Pad</h1>
              <h2 style={headerStyle}>SIGN UP</h2>
            </Grid>
            <form>
              <TextField
                fullWidth
                label='Username'
                placeholder='Enter your email'
                value={Username}
                onChange={(event) => setUserName(event.target.value)}
              />
              <TextField
                fullWidth
                label='Password'
                placeholder='Enter your password'
                value={Password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSubmit}
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
                Sign up
              </Button>
              {/* OAuth is not fully functional yet */}
              <Grid align='center'>
                <StyledGoogle />
              </Grid>
            </form>
            <br></br>
            <br></br>
            <Grid align='center'>
              <Link to='/' component='button' variant='body2' underline='none'>
                Back to Landing Page
              </Link>
            </Grid>
          </Paper>
        </Grid>
      )}
    </div>
  );
};

export default Signup;
