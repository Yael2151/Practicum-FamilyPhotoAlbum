import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
interface FormProps {
    formData: {
        // firstName: string;
        // lastName: string;
        name: string;
        email: string;
        password?: string;
        // address: string;
        // phone: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => void;
    buttonText: string;
    isPasswordRequired?: boolean;
}
const Form = ({ formData, handleChange, handleSubmit, buttonText, isPasswordRequired }: FormProps) => {
    return (
        <Box sx={style}>
            <form onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {buttonText}
                </Typography>
                {/* <TextField
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                /> */}
                {/* <TextField
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                /> */}
                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {isPasswordRequired && (
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                )}
                {/* <TextField
                    name="address"
                    label="Address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="phone"
                    label="Phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                /> */}
                <Button type="submit" variant="contained">
                    {buttonText}
                </Button>
            </form>
        </Box>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '0px 20px',
    boxShadow: 24,
    p: 4,
};
export default Form;