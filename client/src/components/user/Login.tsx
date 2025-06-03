//עובד גירסה קודם לעיצוב של V0


// import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
// import { FormEvent, useContext, useState } from "react";
// import { UsersContext } from "../context/UserProvider";
// import axios from "axios";
// import HandlingErrors from "../HandlingErrors";

// const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {

//     const [open, setOpen] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [error, setError] = useState<any>(null);
//     const [openErrors, setOpenErrors] = useState(false);
//     const context = useContext(UsersContext);
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider");
//     }

//     const { dispatch } = context;

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         handleClose();
//         try {
//             const res = await axios.post('https://localhost:7263/api/User/login', {
//                 email: email,
//                 password: password
//             });
//             console.log("Response data:", res.data);

//             dispatch({
//                 type: 'LOGIN_USER',
//                 data: res.data.user
//             })
        

//             if (res.data.message) {
//                 alert('Login successful!');
//                 onLoginSuccess()
//                 setEmail('')
//                 setPassword('')
//             }
           
//         }
        
//         catch (error: any) {
//             setError(error);
//             setOpenErrors(true);
//         }
//     }

//     return <>
//         <Stack direction="row" spacing={2} sx={{ color: "theme", position: 'absolute', top: 0, left: 0, padding: '16px', }}>
//             <Button onClick={handleOpen} variant="contained" size="large">{'Login'}</Button>
//         </Stack>
//         <Modal
//             open={open}
//             onClose={handleClose}
//         >
//             <Box sx={style}>
//                 <form onSubmit={handleSubmit}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Login
//                     </Typography>
//                     <TextField
//                         id="email"
//                         label="userEmail"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <TextField
//                         id="password"
//                         label="password"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <Button type="submit" variant="contained">Continue</Button>
//                 </form>
//             </Box>
//         </Modal>
//         <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//     </>
// }

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     borderRadius: '0px 20px',
//     boxShadow: 24,
//     p: 4,
// };
// export default Login


// // עיצוב חדש של V0
// "use client"

// import { Box, Button, TextField, InputAdornment, IconButton, CircularProgress, Fade } from "@mui/material"
// import { type FormEvent, useContext, useState } from "react"
// import { UsersContext } from "../context/UserProvider"
// import axios from "axios"
// import HandlingErrors from "../HandlingErrors"
// import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from "@mui/icons-material"
// import AuthCard from "./AuthCard"


// const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
//   const [open, setOpen] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<any>(null)
//   const [openErrors, setOpenErrors] = useState(false)

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)

//   const context = useContext(UsersContext)
//   if (!context) {
//     throw new Error("UserContext must be used within a UserProvider")
//   }

//   const { dispatch } = context

// //   const handleClickShowPassword = () => {
// //     setShowPassword(!showPassword)
// //   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await axios.post("https://localhost:7263/api/User/login", {
//         email: email,
//         password: password,
//       })

//       dispatch({
//         type: "LOGIN_USER",
//         data: res.data.user,
//       })

//       if (res.data.message) {
//         setEmail("")
//         setPassword("")
//         handleClose()
//         onLoginSuccess()
//       }
//     } catch (error: any) {
//       setError(error)
//       setOpenErrors(true)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Fade in={true}>
//         <Button
//           onClick={handleOpen}
//           variant="contained"
//           size="large"
//           startIcon={<LoginIcon sx={{marginLeft: "6px",}}/>}
//           sx={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             px: 3,
//             py: 1.2,
//             borderRadius: 2,
//             boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
//           }}
//         >
//           Login
//         </Button>
//       </Fade>

//       {open && (
//         <AuthCard title="Login " icon={<LoginIcon fontSize="large" />}>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               id="email"
//               label="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Email color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               id="password"
//               label="password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock color="primary" />
//                   </InputAdornment>
//                 ),
//                 // endAdornment: (
//                 //   <InputAdornment position="end">
//                 //     <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
//                 //       {showPassword ? <VisibilityOff /> : <Visibility />}
//                 //     </IconButton>
//                 //   </InputAdornment>
//                 // ),
//               }}
//             />

//             <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
//                     transform: "translateX(-100%)",
//                     transition: "transform 0.6s ease-in-out",
//                   },
//                   "&:hover::after": {
//                     transform: "translateX(100%)",
//                   },
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//               </Button>

//               <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ py: 1.5 }}>
//                 cancel
//               </Button>
//             </Box>
//           </form>
//         </AuthCard>
//       )}

//       <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//     </>
//   )
// }

// export default Login



//V0 2
"use client"

import { Box, Button, TextField, InputAdornment, IconButton, CircularProgress, Fade, Modal, Snackbar, Alert,} from "@mui/material"
import { type FormEvent, useContext, useState, useEffect } from "react"
import { UsersContext } from "../context/UserProvider"
import axios from "axios"
import HandlingErrors from "../HandlingErrors"
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from "@mui/icons-material"
import AuthCard from "./AuthCard"

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [openErrors, setOpenErrors] = useState(false)
  const [successMessage] = useState("")
  const [openSuccess, setOpenSuccess] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setEmail("")
    setPassword("")
  }

  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("UserContext must be used within a UserProvider")
  }

  const { dispatch } = context

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // Check for auto-login from registration
  useEffect(() => {
    const autoLoginData = sessionStorage.getItem("autoLogin")
    if (autoLoginData) {
      const { email, password } = JSON.parse(autoLoginData)
      setEmail(email)
      setPassword(password)
      // Remove the stored data
      sessionStorage.removeItem("autoLogin")
      // Auto submit the form
      handleSubmit(new Event("submit") as any)
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("https://localhost:7263/api/User/login", {
        email: email,
        password: password,
      })

      dispatch({
        type: "LOGIN_USER",
        data: res.data.user,
      })

      if (res.data.message) {
        setEmail("")
        setPassword("")
        handleClose()
        onLoginSuccess()
      }
    } catch (error: any) {
      setError(error)
      setOpenErrors(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Fade in={true}>
        <Button
          onClick={handleOpen}
          variant="contained"
          size="large"
          startIcon={<LoginIcon sx={{ marginLeft: "6px" }} />}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
          }}
        >
          Login
        </Button>
      </Fade>

      <Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="login-form">
        <div>
          <AuthCard title="Login" icon={<LoginIcon fontSize="large" />}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="password"
                label="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
                      transform: "translateX(-100%)",
                      transition: "transform 0.6s ease-in-out",
                    },
                    "&:hover::after": {
                      transform: "translateX(100%)",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>

                <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ py: 1.5 }}>
                  Cancel
                </Button>
              </Box>
            </form>
          </AuthCard>
        </div>
      </Modal>

      <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login







// גירסה ב cloud

// import { Box, Button, Modal, TextField, Typography, Paper, Stack } from "@mui/material";
// import { FormEvent, useState } from "react";
// import { useUserContext } from "../context/UserProvider";
// import axios from "axios";
// import HandlingErrors from "../HandlingErrors";
// import { Login as LoginIcon } from '@mui/icons-material';

// const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
//     const [open, setOpen] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<any>(null);
//     const [openErrors, setOpenErrors] = useState(false);
    
//     const { dispatch } = useUserContext();

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
        
//         try {
//             const res = await axios.post('https://localhost:7263/api/User/login', {
//                 email: email,
//                 password: password
//             });
            
//             console.log("Response data:", res.data);
            
//             dispatch({
//                 type: 'LOGIN_USER',
//                 data: res.data.user
//             });
            
//             if (res.data.message) {
//                 handleClose();
//                 setEmail('');
//                 setPassword('');
//                 onLoginSuccess();
//             }
//         } catch (error: any) {
//             setError(error);
//             setOpenErrors(true);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <Button 
//                 onClick={handleOpen} 
//                 variant="contained" 
//                 size="large" 
//                 startIcon={<LoginIcon />}
//                 sx={{ 
//                     py: 1.5, 
//                     px: 4,
//                     borderRadius: 2
//                 }}
//             >
//                 Login
//             </Button>

// {/*        <Stack direction="row" spacing={2} sx={{ color: "theme", position: 'absolute', top: 0, left: 0, padding: '16px', }}>
//             <Button onClick={handleOpen} variant="contained" size="large">{'Login'}</Button>
//         </Stack> */}
            
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="login-modal-title"
//             >
//                 <Paper sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: { xs: '90%', sm: 400 },
//                     bgcolor: 'background.paper',
//                     borderRadius: 2,
//                     boxShadow: 24,
//                     p: 4,
//                 }}>
//                     <Typography id="login-modal-title" variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'medium' }}>
//                         Login
//                     </Typography>
                    
//                     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <TextField
//                             id="email"
//                             label="userEmail"                            type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             required
//                             sx={{ direction: 'rtl' }}
//                         />
//                         <TextField
//                             id="password"
//                             label="password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             required
//                             sx={{ direction: 'rtl' }}
//                         />
                        
//                         <Button 
//                             type="submit" 
//                             variant="contained" 
//                             fullWidth 
//                             sx={{ mt: 3, mb: 2, py: 1.5 }}
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Logging in...' : 'Log in'}
//                         </Button>
//                     </Box>
//                 </Paper>
//             </Modal>
            
//             <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//         </>
//     );
// };

// export default Login;