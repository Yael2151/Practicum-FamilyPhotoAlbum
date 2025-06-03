//עובד גירסה קודם לעיצוב של V0


// import { Button, Modal, Stack } from "@mui/material";
// import { FormEvent, useContext, useState } from "react";
// import { UsersContext } from "../context/UserProvider";
// import axios from "axios";
// import Form from "./Form";
// import HandlingErrors from "../HandlingErrors";

// const Update = () => {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         // firstName: '',
//         // lastName: '',
//         name: '',
//         email: '',
//         // address: '',
//         // phone: ''
//     });

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [error, setError] = useState<any>(null);
//     const [openErrors, setOpenErrors] = useState(false);

//     const context = useContext(UsersContext);
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider");
//     }

//     const { state, dispatch } = context;

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         handleClose();
//         try {
//             const res = await axios.put('https://localhost:7263/api/User', formData, {
//                 headers: {
//                     'user-id': state.id,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (res.data) {
//                 dispatch({
//                     type: 'UPDATE_USER',
//                     data: res.data
//                 });
//                 alert('Update successful!');
//                 setFormData({
//                     // firstName: '',
//                     // lastName: '',
//                     name: '',
//                     email: '',
//                     // address: '',
//                     // phone: ''
//                 });
//             }
//         } catch (e) {
//             setError(error);
//             setOpenErrors(true);
//             // alert("You can't update...");
//         }
//     };

//     return (
//         <>
//             <Stack direction="row" spacing={2} sx={{ position: 'absolute', top: 0, left: 0, padding: '16px' }}>
//                 <Button onClick={handleOpen} variant="contained" size="large">Update</Button>
//             </Stack>
//             <Modal open={open} onClose={handleClose}>
//                 <Form
//                     formData={formData}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                     buttonText="Save"
//                 />
//             </Modal>
//             <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />

//         </>
//     );
// };

// export default Update;

// עיצוב חדש של V0
// "use client"

// import type React from "react"

// import { Button, Tooltip } from "@mui/material"
// import { type FormEvent, useContext, useState } from "react"
// import { UsersContext } from "../context/UserProvider"
// import axios from "axios"
// import Form from "./Form"
// import HandlingErrors from "../HandlingErrors"
// import { Edit } from "@mui/icons-material"

// const Update = () => {
//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   })

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)
//   const [error, setError] = useState<any>(null)
//   const [openErrors, setOpenErrors] = useState(false)

//   const context = useContext(UsersContext)
//   if (!context) {
//     throw new Error("UserContext must be used within a UserProvider")
//   }

//   const { state, dispatch } = context

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await axios.put("https://localhost:7263/api/User", formData, {
//         headers: {
//           "user-id": state.id,
//           "Content-Type": "application/json",
//         },
//       })

//       if (res.data) {
//         dispatch({
//           type: "UPDATE_USER",
//           data: res.data,
//         })

//         setFormData({
//           name: "",
//           email: "",
//         })

//         handleClose()
//       }
//     } catch (e) {
//       setError(error)
//       setOpenErrors(true)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Tooltip title="עדכון פרטים אישיים" arrow>
//         <Button
//           onClick={handleOpen}
//           variant="text"
//           color="inherit"
//           startIcon={<Edit />}
//           sx={{
//             mr: 2,
//             borderRadius: 2,
//             "&:hover": {
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//             },
//           }}
//         >
//           עדכון פרטים
//         </Button>
//       </Tooltip>

//       {open && (
//         <Form
//           formData={formData}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           buttonText="שמירה"
//           title="עדכון פרטים אישיים"
//           isLoading={loading}
//         />
//       )}

//       <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//     </>
//   )
// }

// export default Update


// // V0 2
//     "use client"

//     import type React from "react"

//     import { Button, Tooltip, Modal, Snackbar, Alert } from "@mui/material"
//     import { type FormEvent, useContext, useState } from "react"
//     import { UsersContext } from "../context/UserProvider"
//     import axios from "axios"
//     import Form from "./Form"
//     import HandlingErrors from "../HandlingErrors"
//     import { Edit } from "@mui/icons-material"

//     // interface UpdateProps {
//     //   isMenuItem?: boolean
//     // }

//     interface UpdateProps {
//         onClose: () => void
//     }

//     // Helper hook to use UserContext
//     export const useUserContext = () => {
//     const context = useContext(UsersContext)
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider")
//     }
//     return context
//     }


//     // const Update = ({ isMenuItem = false }: UpdateProps) => {
//     const Update = ({ onClose }: UpdateProps) => {

//     const [open, setOpen] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//     })
//     const [successMessage, setSuccessMessage] = useState("")
//     const [openSuccess, setOpenSuccess] = useState(false)
//     const [error, setError] = useState<any>(null)
//     const [openErrors, setOpenErrors] = useState(false)

//     const context = useUserContext()

//     const handleOpen = () => {
//         // Pre-fill form with current user data
//         if (context && context.state) {
//         setFormData({
//             name: context.state.name || "",
//             email: context.state.email || "",
//         })
//         }
//         setOpen(true)
//     }

//     const handleClose = () => {
//         setOpen(false)
//         // Clear form data when closing
//         setFormData({
//         name: "",
//         email: "",
//         })
//     }

//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider")
//     }

//     const { state, dispatch } = context

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault()
//         setLoading(true)

//         try {
//         // Check if email already exists and is not the user's current email
//         if (formData.email !== state.email) {
//             try {
//             const checkEmail = await axios.get(`https://localhost:7263/api/User/check-email?email=${formData.email}`)
//             if (checkEmail.data && checkEmail.data.exists) {
//                 setError({ response: { status: 400, data: { message: "Email already exists" } } })
//                 setOpenErrors(true)
//                 setLoading(false)
//                 return
//             }
//             } catch (error) {
//             // If the endpoint doesn't exist, continue with update
//             console.log("Email check endpoint not available, continuing with update")
//             }
//         }

//         const res = await axios.put("https://localhost:7263/api/User", formData, {
//             headers: {
//             "user-id": state.id,
//             "Content-Type": "application/json",
//             },
//         })

//         if (res.data) {
//             dispatch({
//             type: "UPDATE_USER",
//             data: res.data,
//             })

//             // Show success message
//             setSuccessMessage("Profile updated successfully!")
//             setOpenSuccess(true)

//             // Clear form data
//             setFormData({
//             name: "",
//             email: "",
//             })

//             handleClose()
//         }
//         } catch (error: any) {
//         console.error("Error updating profile:", error)

//         // Check if the error is about duplicate email
//         if (
//             error.response &&
//             error.response.data &&
//             (error.response.data.message?.includes("email") || error.response.data.errors?.email)
//         ) {
//             setError({
//             response: {
//                 status: 400,
//                 data: { message: "Email already exists. Please use a different email address." },
//             },
//             })
//         } else {
//             setError(error)
//         }

//         setOpenErrors(true)
//         } finally {
//         setLoading(false)
//         }
//     }

//     // If this is a menu item, render differently
//     //   if (isMenuItem) {
//         return (
//         <>
//             {/* <Button
//             onClick={handleOpen}
//             startIcon={<Edit />}
//             sx={{
//                 width: "100%",
//                 justifyContent: "flex-start",
//                 px: 2,
//             }}
//             >
//             Update Profile
//             </Button> */}

//             <Modal open={open} onClose={handleClose} aria-labelledby="update-modal" aria-describedby="update-form">
//             <div>
//                 <Form
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleSubmit={handleSubmit}
//                 handleClose={handleClose}
//                 buttonText="Save"
//                 title="Update Profile"
//                 isLoading={loading}
//                 />
//             </div>
//             </Modal>

//             <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />

//             <Snackbar
//             open={openSuccess}
//             autoHideDuration={6000}
//             onClose={() => setOpenSuccess(false)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//             <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
//                 {successMessage}
//             </Alert>
//             </Snackbar>
//         </>
//         )
//     }

//     // Original button for navbar (will be removed from navbar)
//     return (
//         <>
//         <Tooltip title="Update Profile" arrow>
//             <Button
//             onClick={handleOpen}
//             variant="text"
//             color="inherit"
//             startIcon={<Edit />}
//             sx={{
//                 mr: 2,
//                 borderRadius: 2,
//                 "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 },
//             }}
//             >
//             Update Profile
//             </Button>
//         </Tooltip>

//         <Modal open={open} onClose={handleClose} aria-labelledby="update-modal" aria-describedby="update-form">
//             <div>
//             <Form
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleSubmit={handleSubmit}
//                 handleClose={handleClose}
//                 buttonText="Save"
//                 title="Update Profile"
//                 isLoading={loading}
//             />
//             </div>
//         </Modal>

//         <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />

//         <Snackbar
//             open={openSuccess}
//             autoHideDuration={6000}
//             onClose={() => setOpenSuccess(false)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//             <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
//             {successMessage}
//             </Alert>
//         </Snackbar>
//         </>
//     )
//     }

//     export default Update



// // V0 3 שינה לי שיראה בעיצוב כמו הפרופיל וההגדרות

"use client"

import type React from "react"

import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  useTheme,
  Modal,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import { Edit, Person, Email } from "@mui/icons-material"
import { type FormEvent, useContext, useState } from "react"
import { UsersContext } from "../context/UserProvider"
import axios from "axios"
import HandlingErrors from "../HandlingErrors"

interface UpdateProps {
  onClose?: () => void
  isMenuItem?: boolean
}

// Helper hook to use UserContext
export const useUserContext = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("UserContext must be used within a UserProvider")
  }
  return context
}

const Update = ({ onClose, isMenuItem = false }: UpdateProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [openSuccess, setOpenSuccess] = useState(false)
  const [error, setError] = useState<any>(null)
  const [openErrors, setOpenErrors] = useState(false)
  const theme = useTheme()

  const context = useUserContext()

  const handleOpen = () => {
    // Pre-fill form with current user data
    if (context && context.state) {
      setFormData({
        name: context.state.name || "",
        email: context.state.email || "",
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // Clear form data when closing
    setFormData({
      name: "",
      email: "",
    })
    // Call the parent onClose if provided
    if (onClose) {
      onClose()
    }
  }

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider")
  }

  const { state, dispatch } = context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if email already exists and is not the user's current email
      if (formData.email !== state.email) {
        try {
          const checkEmail = await axios.get(`https://localhost:7263/api/User/check-email?email=${formData.email}`)
          if (checkEmail.data && checkEmail.data.exists) {
            setError({ response: { status: 400, data: { message: "Email already exists" } } })
            setOpenErrors(true)
            setLoading(false)
            return
          }
        } catch (error) {
          // If the endpoint doesn't exist, continue with update
          console.log("Email check endpoint not available, continuing with update")
        }
      }

      const res = await axios.put("https://localhost:7263/api/User", formData, {
        headers: {
          "user-id": state.id,
          "Content-Type": "application/json",
        },
      })

      if (res.data) {
        dispatch({
          type: "UPDATE_USER",
          data: res.data,
        })

        // Show success message
        setSuccessMessage("Profile updated successfully!")
        setOpenSuccess(true)

        // Clear form data
        setFormData({
          name: "",
          email: "",
        })

        handleClose()
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)

      // Check if the error is about duplicate email
      if (
        error.response &&
        error.response.data &&
        (error.response.data.message?.includes("email") || error.response.data.errors?.email)
      ) {
        setError({
          response: {
            status: 400,
            data: { message: "Email already exists. Please use a different email address." },
          },
        })
      } else {
        setError(error)
      }

      setOpenErrors(true)
    } finally {
      setLoading(false)
    }
  }

  // This is the actual component that will be rendered
  return (
    <>
      {/* If it's a menu item, we don't render a button */}
      {!isMenuItem && (
        <Button
          onClick={handleOpen}
          variant="text"
          color="inherit"
          startIcon={<Edit />}
          sx={{
            mr: 2,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Update Profile
        </Button>
      )}

      <Modal open={open} onClose={handleClose} aria-labelledby="update-modal" aria-describedby="update-form">
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            maxWidth: "100%",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            maxHeight: "90vh",
            overflow: "auto",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Edit sx={{ mr: 2, color: theme.palette.primary.main }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Update Profile
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button variant="outlined" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
              </Button>
            </Box>
          </form>
        </Paper>
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

export default Update



// import { useState } from "react";
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
// } from "@mui/material";

// type UpdateProps = {
//   currentTitle: string;
//   currentDescription: string;
//   onClose: () => void;
//   onSubmit: (title: string, description: string) => void;
// };

// export default function Update({
//   currentTitle,
//   currentDescription,
//   onClose,
//   onSubmit,
// }: UpdateProps) {
//   const [title, setTitle] = useState(currentTitle);
//   const [description, setDescription] = useState(currentDescription);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(title, description);
//     onClose();
//   };

//   return (
//     <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }} elevation={3}>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           <Typography variant="h6">עדכון פרטים</Typography>
//           <TextField
//             label="כותרת"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             label="תיאור"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             fullWidth
//             multiline
//             rows={4}
//           />
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button onClick={onClose} color="secondary">
//               ביטול
//             </Button>
//             <Button type="submit" variant="contained" color="primary">
//               שמור
//             </Button>
//           </Stack>
//         </Stack>
//       </form>
//     </Paper>
//   );
// }
