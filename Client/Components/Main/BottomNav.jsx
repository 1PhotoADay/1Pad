import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';

function BottomNav() {
  const value = 0;

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
        <BottomNavigationAction icon={<PhotoCameraIcon />} />
        <BottomNavigationAction icon={<TagIcon />} />
        <BottomNavigationAction icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
