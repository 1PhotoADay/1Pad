import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BottomNav from './Components/Main/BottomNav';
import MainContainer from './Components/Main/MainContainer';
import Search from './Components/Main/Search';
import AddPhoto from './Components/Main/AddPhoto';
import Container from '@mui/material/Container';

function MainLayoutRoutes() {
  return (
    // <Container maxWidth='xl'>
    <>
      <Routes>
        <Route path='/dashboard' element={<MainContainer />} />
        <Route path='/search' element={<Search />} />
        <Route path='/photos' element={<AddPhoto />} />
        {/* <Route path='/photos/:photoId' element={<AddPhoto />} /> */}
      </Routes>
      <BottomNav />
    </>
    // </Container>
  );
}

export default MainLayoutRoutes;
