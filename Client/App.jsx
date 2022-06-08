import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import SignInOutContainer from './Components/Authentication/SignInOutContainer.jsx';
import Landing from './Components/Main/Landing';
import MainLayoutRoutes from './MainLayoutRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<SignInOutContainer />} />
        <Route path='*' element={<MainLayoutRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
