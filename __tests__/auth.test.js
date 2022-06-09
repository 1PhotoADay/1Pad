import React from 'React';

import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';

import Login from '../Client/Components/Authentication/Login.jsx';

describe('test button click functionality', () => {
  const props = {
    setShowMain: jest.fn(),
    setUserId: jest.fn(),
    loginUser: jest.fn(),
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login {...props} />} />
        </Routes>
      </BrowserRouter>
    );
  });
  test('Button click invokes a function', () => {
    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');
    fireEvent.change(username, { target: { value: 'test14' } });
    fireEvent.change(password, { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Log in'));
    expect(props.loginUser).toHaveBeenCalledTimes(1);
  });
});
