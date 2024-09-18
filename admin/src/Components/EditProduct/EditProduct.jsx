import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './EditProduct.css';
import upload_area from "../Assets/upload_area.svg";

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

const EditProduct = ({ open, handleClose, data, handleInputChange, handleFormSubmit, categories, setImage, image }) => {


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Product
                </Typography>
                <form className="modal-form" onSubmit={handleFormSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={data.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Old Price:
                        <input type="number" name="old_price" value={data.old_price} onChange={handleInputChange} />
                    </label>
                    <label>
                        New Price:
                        <input type="number" name="new_price" value={data.new_price} onChange={handleInputChange} />
                    </label>
                    <label>
                        Category:
                        <select className='category_input' name="categoryId" value={data.categoryId} onChange={handleInputChange}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Image:
                        <label htmlFor="file-input" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept='image/*' hidden />
                    </label>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleClose}>Cancel</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditProduct;
