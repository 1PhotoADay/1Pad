// import React, { useState } from 'react';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // <GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider>;

// // Sign up for Google OAuth and insert your Client ID here:
// const clientId =
//   '202878556363-ejdjcft3mo2782aosrpn543qe01h8dtl.apps.googleusercontent.com';

// function GoogleOAuth() {
//   const [showloginButton, setShowloginButton] = useState(true);
//   const [showlogoutButton, setShowlogoutButton] = useState(false);

//   const onLoginSuccess = async (res) => {
//     // Use res.profileObj to access user info
//     console.log('Login Success:', res.profileObj);
//     setShowloginButton(false);
//     setShowlogoutButton(true);
//     // Set local storage to store user info
//     localStorage.setItem('user', JSON.stringify(res.profileObj));
//   };

//   const onLoginFailure = (res) => {
//     console.log('Login Failed:', res);
//   };

//   const onSignoutSuccess = () => {
//     alert('You have been logged out successfully');
//     console.clear();
//     setShowloginButton(true);
//     setShowlogoutButton(false);
//     // Modify state to be logged out
//   };

//   return (
//     <div>
//       {showloginButton ? (
//         <GoogleLogin
//           clientId={clientId}
//           buttonText='Sign In With Google'
//           onSuccess={onLoginSuccess}
//           onFailure={onLoginFailure}
//           cookiePolicy={'single_host_origin'}
//           redirect_uri={'http://localhost:8080/dashboard'}
//           isSignedIn={true}
//         />
//       ) : null}

//       {showlogoutButton ? (
//         <GoogleLogout
//           clientId={clientId}
//           buttonText='Sign Out'
//           onLogoutSuccess={onSignoutSuccess}
//         ></GoogleLogout>
//       ) : null}
//     </div>
//   );
// }
// export default GoogleOAuth;
