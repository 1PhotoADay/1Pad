import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { PersonIcon, ImageSearch } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

function BottomNav() {
  const value = 0;
  const handleClear = () => {
    localStorage.clear();
    console.log('Cookies are cleared!');
  };

  return (
    <Paper
      sx={{ position: 'fixed', top: 'auto', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to={`/dashboard`}>
          <BottomNavigationAction icon={<PhotoCameraIcon />} />
        </Link>
        <Link to={`/search`}>
          <BottomNavigationAction icon={<ImageSearch />} />
        </Link>
        <Link to={`/`} onClick={(e) => handleClear(e, 'Clear user cookies')}>
          <BottomNavigationAction icon={<LogoutIcon />} />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
