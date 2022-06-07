import React, { useState } from 'react';
import BottomNav from './Components/Main/BottomNav';
import './index.css';
import SignInOutContainer from './Components/Authentication/SignInOutContainer.jsx';

function App() {

  return (
    <div className='App'>
      <h1>Hello World</h1>
      <SignInOutContainer />
                <BottomNav />
    </div>
  );

}

export default App;
