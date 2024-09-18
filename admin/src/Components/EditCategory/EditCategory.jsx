import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './EditCategory.css';  // Import the CSS file

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

const EditCategory = ({ open, handleClose, formData, handleInputChange, handleFormSubmit, categories }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Category
                </Typography>
                <form className="modal-form" onSubmit={handleFormSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </label>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleClose}>Cancel</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditCategory;
