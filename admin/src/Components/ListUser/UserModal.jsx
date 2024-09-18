import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserModal = ({ open, handleClose, user, handleInputChangeAdmin, handleFormSubmitAdmin }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Admin
                </Typography>
                <form className="modal-form" onSubmit={handleFormSubmitAdmin}>
                    <input
                        type="text"
                        placeholder="Your name"
                        name="username"
                        value={user.username}
                        onChange={handleInputChangeAdmin}
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        value={user.email}
                        onChange={handleInputChangeAdmin}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChangeAdmin}
                    />
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleClose}>Cancel</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default UserModal;
