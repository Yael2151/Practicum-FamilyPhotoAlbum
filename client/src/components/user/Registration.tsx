import { Button, Modal, Stack } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { UsersContext } from "../context/UserProvider";
import axios from "axios";
import Form from "./Form";
import HandlingErrors from "../HandlingErrors";

const Registration = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState<any>(null);
    const [openErrors, setOpenErrors] = useState(false);

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { dispatch } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        handleClose();
        try {
            const res = await axios.post('http://localhost:8787/api/user/register', formData);
            if (res.data.message) {
                dispatch({
                    type: 'Add_USER',
                    data: res.data.user
                });
                alert('Registration successful!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: '',
                    phone: '',
                    password: '',
                });
            }
        } catch (e) {
            setError(error);
            setOpenErrors(true);
        }
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ position: 'absolute', top: 0, left: 100, padding: '16px' }}>
                <Button onClick={handleOpen} variant="contained" size="large">Register</Button>
            </Stack>
            <Modal open={open} onClose={handleClose}>
                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    buttonText="Register"
                    isPasswordRequired={true}
                />
            </Modal>
            <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />
        </>
    );
};

export default Registration;