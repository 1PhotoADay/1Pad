function loginUser(body, setIsLoggedIn, setShowMain, setUserId, navigate) {
  fetch('api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Successful login:', data);
      // if (data.isLoggedIn) {
      setIsLoggedIn(true);
      setShowMain(true);
      setUserId(data);
      localStorage.setItem('userId', data);
      console.log('User ID check', data);
      navigate('/dashboard');
      // }
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
}

export default loginUser;
