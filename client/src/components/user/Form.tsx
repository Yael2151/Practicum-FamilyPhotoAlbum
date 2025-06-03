//עובד גירסה קודם לעיצוב של V0
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { FormEvent } from "react";
// interface FormProps {
//     formData: {
//         name: string;
//         email: string;
//         password?: string;
//     };
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleSubmit: (e: FormEvent) => void;
//     buttonText: string;
//     isPasswordRequired?: boolean;
// }
// const Form = ({ formData, handleChange, handleSubmit, buttonText, isPasswordRequired }: FormProps) => {
//     return (
//         <Box sx={style}>
//             <form onSubmit={handleSubmit}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                     {buttonText}
//                 </Typography>
//                 <TextField
//                     name="name"
//                     label="Name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     name="email"
//                     label="Email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     margin="normal"
//                 />
//                 {isPasswordRequired && (
//                     <TextField
//                         name="password"
//                         label="Password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                     />
//                 )}
//                 <Button type="submit" variant="contained">
//                     {buttonText}
//                 </Button>
//             </form>
//         </Box>
//     );
// };

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
// export default Form;


// עיצוב חדש של V0
"use client"

import type React from "react"

import { Box, Button, TextField, InputAdornment, IconButton, CircularProgress } from "@mui/material"
import { type FormEvent, useState } from "react"
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material"
import AuthCard from "./AuthCard"


interface FormProps {
    formData: {
        name: string
        email: string
        password?: string
    }
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: FormEvent) => void
    handleClose: () => void

    buttonText: string
    title: string
    isPasswordRequired?: boolean
    isLoading?: boolean
}

const Form = ({
    formData,
    handleChange,
    handleSubmit,
    handleClose,
    buttonText,
    title,
    isPasswordRequired = false,
    isLoading = false,
}: FormProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <AuthCard title={title} icon={<Person fontSize="large" />}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="name"
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
                    label="email"
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

                {isPasswordRequired && (
                    <TextField
                        name="password"
                        label="password"
                        type={showPassword ? "text" : "password"}
                        // value={formData.password}
                        value={formData.password || ""}
                        onChange={handleChange}
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
                )}

                {/* <Box sx={{ mt: 3 }}> */}
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isLoading}
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
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : buttonText}
                    </Button>

                    <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ py: 1.5 }}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </AuthCard>
    )
}

export default Form
