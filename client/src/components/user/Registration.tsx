//עובד גירסה קודם לעיצוב של V0


// import { Button, Modal, Stack } from "@mui/material";
// import { FormEvent, useContext, useState } from "react";
// import { UsersContext } from "../context/UserProvider";
// import axios from "axios";
// import Form from "./Form";
// import HandlingErrors from "../HandlingErrors";

// const Registration = () => {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         // firstName: '',
//         // lastName: '',
//         name: '',
//         email: '',
//         password: '',
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

//     const { dispatch } = context;

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // const handleSubmit = async (e: FormEvent) => {
//     //     e.preventDefault();
//     //     handleClose();
//     //     try {
//     //         const res = await axiosInstance.post('https://localhost:7263/api/User', formData);
//     //         if (res.data.message) {
//     //             dispatch({
//     //                 type: 'Add_USER',
//     //                 data: res.data.user
//     //             });
//     //             alert('Registration successful!');
//     //             setFormData({
//     //                 // firstName: '',
//     //                 // lastName: '',
//     //                 email: '',
//     //                 password: ''
//     //                 // address: '',
//     //                 // phone: '',
//     //             });
//     //         }
//     //     } catch (e) {
//     //         setError(error);
//     //         setOpenErrors(true);
//     //     }
//     // };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         handleClose();

//         console.log("📤 Sending request to API with data:", formData);

//         try {
//             const res = await axiosInstance.post('https://localhost:7263/api/User', formData);
//             console.log("✅ Response received:", res.data);

//             if (res.data.message) {
//                 dispatch({ type: 'Add_USER', data: res.data.user });
//                 alert('Registration successful!');
//                 setFormData({ name: '', email: '', password: '' });
//             }
//         } catch (error : any) {
//             console.error("❌ Error received:", error);

//             if (error.response) {
//                 console.error("📥 Server Response Data:", error.response.data);
//                 console.error("📥 Server Response Status:", error.response.status);

//                 if (error.response.data.errors) {
//                     console.error("🚨 Validation Errors:", error.response.data.errors);
//                     alert("Validation Errors: " + JSON.stringify(error.response.data.errors, null, 2));
//                 }
//             }

//             setError(error);
//             setOpenErrors(true);
//         }
//     };

//     return (
//         <>
//             <Stack direction="row" spacing={2} sx={{ position: 'absolute', top: 0, left: 100, padding: '16px' }}>
//                 <Button onClick={handleOpen} variant="contained" size="large">Register</Button>
//             </Stack>
//             <Modal open={open} onClose={handleClose}>
//                 <Form
//                     formData={formData}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                     buttonText="Register"
//                     isPasswordRequired={true}
//                 />
//             </Modal>
//             <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//         </>
//     );
// };
// export default Registration;


// עיצוב חדש של V0
// "use client"

// import type React from "react"

// import { Button, Fade } from "@mui/material"
// import { type FormEvent, useContext, useState } from "react"
// import { UsersContext } from "../context/UserProvider"
// import axios from "axios"
// import Form from "./Form"
// import HandlingErrors from "../HandlingErrors"
// import { PersonAdd } from "@mui/icons-material"

// const Registration = () => {
//     const [open, setOpen] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     })

//     const handleOpen = () => setOpen(true)
//     const handleClose = () => setOpen(false)
//     const [error, setError] = useState<any>(null)
//     const [openErrors, setOpenErrors] = useState(false)

//     const context = useContext(UsersContext)
//     if (!context) {
//         throw new Error("UserContext must be used within a UserProvider")
//     }

//     const { dispatch } = context

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault()
//         setLoading(true)

//         try {
//             const res = await axiosInstance.post("https://localhost:7263/api/User", formData)

//             if (res.data.message) {
//                 dispatch({ type: "Add_USER", data: res.data.user })
//                 setFormData({ name: "", email: "", password: "" })
//                 handleClose()
//             }
//         } catch (error: any) {
//             console.error("Error received:", error)
//             setError(error)
//             setOpenErrors(true)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <>
//             <Fade in={true} style={{ transitionDelay: "150ms" }}>
//                 <Button
//                     onClick={handleOpen}
//                     variant="outlined"
//                     size="large"
//                     startIcon={<PersonAdd sx={{ marginLeft: "6px", }} />}
//                     sx={{
//                         position: "absolute",
//                         top: 16,
//                         left: 160,
//                         px: 3,
//                         py: 1.2,
//                         borderRadius: 2,
//                         borderWidth: 2,
//                         "&:hover": {
//                             borderWidth: 2,
//                         },
//                     }}
//                 >
//                     Register
//                 </Button>
//             </Fade>

//             {open && (
//                 <Form
//                     formData={formData}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                     // buttonText="הרשמה"
//                     // title="הרשמה לאתר"
//                     buttonText="Registeration"
//                     title="Register for our website"
//                     isPasswordRequired={true}
//                     isLoading={loading}
//                 />
//             )}

//             <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
//         </>
//     )
// }

// export default Registration



// V0 2
"use client"

import type React from "react"

import { Button, Fade, Modal, Snackbar, Alert } from "@mui/material"
import { type FormEvent, useContext, useState } from "react"
import { UsersContext } from "../context/UserProvider"
import Form from "./Form"
import HandlingErrors from "../HandlingErrors"
import { PersonAdd } from "@mui/icons-material"
import axiosInstance from "../axiosInstance"

const Registration = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [openSuccess, setOpenSuccess] = useState(false)
  const [error, setError] = useState<any>(null)
  const [openErrors, setOpenErrors] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    // Clear form data when closing
    setFormData({
      name: "",
      email: "",
      password: "",
    })
  }

  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("UserContext must be used within a UserProvider")
  }

  const { dispatch } = context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if email already exists
      try {
        const checkEmail = await axiosInstance.get(`/User/check-email?email=${formData.email}`)
        if (checkEmail.data && checkEmail.data.exists) {
          setError({ response: { status: 400, data: { message: "Email already exists" } } })
          setOpenErrors(true)
          setLoading(false)
          return
        }
      } catch (error) {
        // If the endpoint doesn't exist, continue with registration
        console.log("Email check endpoint not available, continuing with registration")
      }

      const res = await axiosInstance.post("/User", formData)

      if (res.data.message) {
        dispatch({ type: "Add_USER", data: res.data.user })

        // Store login info for auto-login
        sessionStorage.setItem(
          "autoLogin",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        )
        // Show success message
        setSuccessMessage("Registration successful! Logging you in...")
        alert("Registration successful! Logging you in...")
        setOpenSuccess(true)

        // Clear form data
        setFormData({
          name: "",
          email: "",
          password: "",
        })

        handleClose()

        // Reload page to trigger auto-login
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error: any) {
      console.error("Error received:", error)

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

  return (
    <>
      <Fade in={true} style={{ transitionDelay: "150ms" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          size="large"
          startIcon={<PersonAdd sx={{ marginLeft: "6px" }} />}
          sx={{
            position: "absolute",
            top: 16,
            left: 160,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          Register
        </Button>
      </Fade>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="registration-modal"
        aria-describedby="registration-form"
      >
        <div>
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            buttonText="Register"
            title="Register for our website"
            isPasswordRequired={true}
            isLoading={loading}
          />
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

export default Registration
