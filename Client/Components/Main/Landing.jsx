import React from 'react';
// import { Link } from 'react-router-dom';
import { Typography, Button, Link, Grid, CardMedia } from '@mui/material';
import { Image } from 'mui-image';
import polaroid from './Assets/polaroid.png';

function Landing() {
  return (
    <div>
      <Typography
        variant='h1'
        align='center'
        padding={2.5}
        margin={0.5}
        fontSize={64}
      >
        Welcome to <br></br>
        One Photo A Day!
      </Typography>
      <Grid
        container
        justify='center'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <CardMedia
          height='35%'
          width='35%'
          justify='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <img src={polaroid} />
        </CardMedia>
      </Grid>
      <br></br>
      <Grid textAlign='center'>
        <Button href='/login' variant='contained'>
          Get Started!
        </Button>
      </Grid>
      <br></br>
      <br></br>
    </div>
  );
}

export default Landing;
