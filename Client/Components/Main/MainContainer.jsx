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
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BottomNav from './BottomNav';
import SignInOutContainer from '../Authentication/SignInOutContainer.jsx';
import formatDate from '../../utils/formatDate';
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
    <ImageList sx={{ maxWidth: 800 }}>
      <ImageListItem key='Subheader' cols={2}>
        {/* <ListSubheader component='div'>{date.month}</ListSubheader> */}
      </ImageListItem>
      {data.map((day, i) => (
        <Link to={`/photos`} state={{ ...day }}>
          {' '}
          <ImageListItem key={i} onClick={handleClick}>
            {day.id ? (
              <img src={day.img} loading='lazy' />
            ) : (
              <Box
                sx={{
                  width: 300,
                  height: 200,
                  backgroundColor: 'orange',
                }}
              />
            )}
            <ImageListItemBar
              sx={{
                textAlign: 'end',
              }}
              title={day.title}
              subtitle={day.subtitle}
              //   actionIcon={
              //     <IconButton
              //       sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //       //   aria-label={`info about ${item.title}`}
              //     >
              //       <InfoIcon />
              //     </IconButton>
              //   }
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};

function MainContainer() {
  // let navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId =
    localStorage.getItem('userId') !== null
      ? localStorage.getItem('userId')
      : '12';
  useEffect(() => {
    fetch(`/api/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedData = formatDate(data, 30);
        console.log(formattedData);
        setData(formattedData);
      });
  }, []);
  return (
    <>
      <Container
        maxWidth='lg'
        sx={{ marginBottom: '56px', display: 'flex', justifyContent: 'center' }}
      >
        {data.length && images(data)}
      </Container>
    </>
  );
}

export default MainContainer;
