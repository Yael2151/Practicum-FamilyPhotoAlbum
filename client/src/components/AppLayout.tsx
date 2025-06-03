// גירסה אחרי פסח עובד 

import { useState } from "react";
import Login from "./user/Login";
import Registration from "./user/Registration";
// import Update from "./user/Update";
// import Detailes from "./user/UserDetailes";
// import FileUploader from "./files/FileUploader";
// import ImageGallery from "./files/ShowImages";
import Navbar from "./Navbar";
// import PreviousChallenges from "./files/PreviousChallenges";
// import { SvgIcon, SvgIconProps } from "@mui/material";


import { Outlet } from 'react-router-dom';




const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      {
        isLoggedIn ?
          (
            <>
              {/* <Navbar onLogout={() => setIsLoggedIn(false)} /> */}
              <Navbar onLogout={() => setIsLoggedIn(false)} />
                <div style={{ paddingTop: '64px' }}> {/* כדי שלא יכסה ה-AppBar */}
                <Outlet />
                </div>
              
              {/* <Update /> */}
              {/* <Detailes /> */}
              {/* <FileUploader /> */}

              {/* <div style={{marginTop: "100px"}} >
                <h1>גלריית תמונות</h1>
                <ImageGallery />

              </div> */}
              {/* <PreviousChallenges></PreviousChallenges> */}

            </>
          ) :
          (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <Registration />
            </>

          )
      }

    </>
  );
};

export default AppLayout;

// גירסה ב cloud

// import { useState } from "react";
// import { Box, Container, Paper, Typography, Stack } from "@mui/material";
// import Login from "./user/Login";
// import Registration from "./user/Registration";
// import Navbar from "./NavBar";
// import ChallengeView from "./ChallengeView";
// import { useUserContext } from "./context/UserProvider";

// const AppLayout = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { dispatch } = useUserContext();

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // איפוס מצב המשתמש
//     dispatch({
//       type: 'LOGIN_USER',
//       data: {
//         id: 0,
//         name: "",
//         email: "",
//         password: "",
//       }
//     });
//     setIsLoggedIn(false);
//   };

//   return (
//     <Box sx={{ 
//       minHeight: '100vh',
//       backgroundColor: 'background.default',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {isLoggedIn ? (
//         // תצוגת משתמש מחובר
//         <>
//           <Navbar onLogout={handleLogout} />
//           <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
//             <ChallengeView />
//           </Box>
//         </>
//       ) : (
//         // תצוגת אורח (לא מחובר)
//         <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4 }}>
//           <Paper 
//             elevation={3} 
//             sx={{ 
//               p: 4, 
//               display: 'flex', 
//               flexDirection: 'column', 
//               alignItems: 'center',
//               borderRadius: 2,
//               backgroundColor: 'background.paper'
//             }}
//           >
//             <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//               ברוכים הבאים לאתגר התמונות
//             </Typography>
//             <Typography variant="body1" align="center" paragraph>
//               התחבר או הירשם כדי להשתתף באתגר ולהעלות את התמונה שלך
//             </Typography>
            
//             <Stack 
//               direction={{ xs: 'column', sm: 'row' }} 
//               spacing={2} 
//               sx={{ mt: 4, width: '100%', justifyContent: 'center' }}
//             >
//               <Login onLoginSuccess={handleLoginSuccess} />
//               <Registration />
//             </Stack>
//           </Paper>
//         </Container>
//         // <>
//         //         <Login onLoginSuccess={handleLoginSuccess} />
//         //         <Registration />
//         // </>

  
//       )}
//     </Box>
//   );
// };

// export default AppLayout;

// function HomeIcon(props: SvgIconProps) {
//     return (
//         <SvgIcon {...props}>
//             <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//         </SvgIcon>
//     );
// }
