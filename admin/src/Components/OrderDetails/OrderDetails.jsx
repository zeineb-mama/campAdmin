import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { currency } from '../../App';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OrderDetails = ({ open, handleClose, orderDetails, getUserName, formatDate }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {/* Show Order details */}
                    <h2>Order Details</h2>
                </Typography>
                <div className="order-details">
                    <p><strong>User:</strong> {getUserName(orderDetails.userId)}</p>
                    <p><strong>Total Amount:</strong> {orderDetails.total}</p>
                    <p><strong>Status:</strong> {orderDetails.delivery_status}</p>
                    <p><strong>Date:</strong> {formatDate(orderDetails.date)}</p>
                    <h3>Order Items:</h3>
                    <details style={{ padding: '20px', cursor: 'pointer' }}>
                        {orderDetails.OrderItems.map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                                <img src={item.Product.image} alt="" width={100} /> {item.Product.name} - Quantity: {item.quantity} - Price: {item.price} {currency}
                            </div>
                        ))}
                    </details>
                    <Button type="button" onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default OrderDetails;
