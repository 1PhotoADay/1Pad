import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';


function BottomNav() {
    const value = 0;

    return (
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

    )
}

export default BottomNav