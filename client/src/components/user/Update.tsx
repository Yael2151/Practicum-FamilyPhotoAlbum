import { Button, Modal, Stack } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { UsersContext } from "../context/UserProvider";
import axios from "axios";
import Form from "./Form";
import HandlingErrors from "../HandlingErrors";

const Update = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        // firstName: '',
        // lastName: '',
        name: '',
        email: '',
        // address: '',
        // phone: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState<any>(null);
    const [openErrors, setOpenErrors] = useState(false);

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { state, dispatch } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        handleClose();
        try {
            const res = await axios.put('https://localhost:7263/api/User', formData, {
                headers: {
                    'user-id': state.id,
                    'Content-Type': 'application/json'
                }
            });
            if (res.data) {
                dispatch({
                    type: 'UPDATE_USER',
                    data: res.data
                });
                alert('Update successful!');
                setFormData({
                    // firstName: '',
                    // lastName: '',
                    name: '',
                    email: '',
                    // address: '',
                    // phone: ''
                });
            }
        } catch (e) {
            setError(error);
            setOpenErrors(true);
            // alert("You can't update...");
        }
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ position: 'absolute', top: 0, left: 0, padding: '16px' }}>
                <Button onClick={handleOpen} variant="contained" size="large">Update</Button>
            </Stack>
            <Modal open={open} onClose={handleClose}>
                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    buttonText="Save"
                />
            </Modal>
            <HandlingErrors error={error} open={openErrors} onClose={() => setOpenErrors(false)} />

        </>
    );
};

export default Update;