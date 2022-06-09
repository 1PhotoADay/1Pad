import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  ImageList,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
  IconButton,
  Container,
  Typography,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BottomNav from './BottomNav';
import SignInOutContainer from '../Authentication/SignInOutContainer.jsx';
import formatDate from '../../utils/formatDate';
import colorGen from '../../utils/darkColorGenerator';
// const dt = DateTime.now();
// const date = dt.toObject();
// {"year":2022,"month":6,"day":7,"hour":13,"minute":24,"second":52,"millisecond":358}

// const generateCalendar = (date) => {
//   const calendar = [];

//   for (let i = 30; i > 0; i--) {
//     const dateObj = date.toObject();
//     dateObj.weekdayShort = date.weekdayShort;
//     if (dateObj.day === 1) {
//       dateObj.title = date.year;
//       dateObj.subtitle = date.monthShort;
//     } else {
//       dateObj.title = dateObj.day;
//       dateObj.subtitle = dateObj.weekdayShort;
//     }
//     dateObj.img = `https://1pad.s3.amazonaws.com/samplePhoto.jpeg`;
//     dateObj.id = i;

//     calendar.unshift(dateObj);

//     date = date.minus({ days: 1 });
//   }
//   return calendar;
// };

// const cal = generateCalendar(dt);
// console.log(cal);

const handleClick = () => {
  console.log('clicked');
};

const images = (data) => {
  return (
    <ImageList sx={{ maxWidth: 428, width: '100%' }}>
      <ImageListItem key='Subheader' cols={2}>
        {/* <ListSubheader component='div'>{date.month}</ListSubheader> */}
      </ImageListItem>
      {data.map((day, i) => (
        <Link to={`/photos`} state={{ ...day }}>
          {' '}
          <ImageListItem key={i} onClick={handleClick}>
            {day.id ? (
              <img
                src={day.img}
                loading='lazy'
                style={{ width: '100%', height: 150 }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: 150,
                  backgroundColor: colorGen(),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton size='large'>
                  <AddCircleIcon />
                </IconButton>
              </Box>
            )}
            <ImageListItemBar
              sx={{
                textAlign: 'end',
                maxHeight: '30%',
              }}
              title={day.title}
              // subtitle={day.subtitle}
              subtitle={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box component='span'>{day.tags}</Box>
                  <Box component='span'>{day.subtitle}</Box>
                </Box>
              }
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};

function MainContainer() {
  const [data, setData] = useState([]);
  const userId =
    localStorage.getItem('userId') !== null
      ? localStorage.getItem('userId')
      : '12';
  useEffect(() => {
    fetch(`/api/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedData = formatDate(data, 15);
        console.log(formattedData);
        setData(formattedData);
      });
  }, []);
  return (
    <div>
      <Typography
        variant='h1'
        align='center'
        padding={2.5}
        margin={0.5}
        fontSize={64}
      >
        Timeline
      </Typography>
      <Container
        maxWidth='lg'
        sx={{ marginBottom: '56px', display: 'flex', justifyContent: 'center' }}
      >
        {data.length && images(data)}
      </Container>
    </div>
  );
}

export default MainContainer;
