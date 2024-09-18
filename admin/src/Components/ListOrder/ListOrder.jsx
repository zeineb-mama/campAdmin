import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { backend_url, currency } from "../../App";
import { Table, TableBody, TableCell, TableContainer, TextField, TableHead, TableRow, Paper, IconButton, Button, TablePagination, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOrder from "../EditOrder/EditOrder";
import OrderDetails from "../OrderDetails/OrderDetails";

const ListOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenShow, setModalOpenShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchOrders = () => {
    fetch(`${backend_url}/api/order/listorder`)
      .then(res => res.json())
      .then(data => setAllOrders(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchUsers = () => {
    fetch(`${backend_url}/api/auth/users`)
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchOrderById = async (orderId) => {
    try {
      const response = await fetch(`${backend_url}/api/order/${orderId}`);
      const data = await response.json();
      if (response.ok) {
        setOrderDetails(data);
      } else {
        console.error('Error fetching order details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const updateOrder = async (order) => {
    await fetch(`${backend_url}/api/order/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    fetchOrders();
  };

  const removeOrder = async (id) => {
    await fetch(`${backend_url}/api/order/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetchOrders();
  };

  const handleEditClick = (order) => {
    setEditingOrder(order.id);
    setFormData({
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      delivery_status: order.delivery_status,
      date: order.date,
    });
    setModalOpenEdit(true);
  };

  const handleViewDetailsClick = (orderId) => {
    fetchOrderById(orderId);
    setModalOpenShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateOrder(formData);
    setEditingOrder(null);
    setModalOpenEdit(false);
  };

  const getUserName = (userId) => {
    const user = users.find((e) => e.id === userId);
    return user ? user.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy HH:mm');
  };

  const getStatusStyle = (delivery_status) => {
    switch (delivery_status) {
      case 'Pending':
        return { color: 'orange', fontWeight: 'bold' };
      case 'Success':
        return { color: 'green', fontWeight: 'bold' };
      case 'Closed':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrder = allOrders.filter(order =>
    getUserName(order.userId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listproduct">
      <h1>All Orders List</h1>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: '20px 0' }}
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{getUserName(order.userId)}</TableCell>
                <TableCell>{order.total} {currency}</TableCell>
                <TableCell style={getStatusStyle(order.delivery_status)}>{order.delivery_status}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeOrder(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button variant="outlined" onClick={() => handleViewDetailsClick(order.id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" width={500} mt={2}>
        <TablePagination
          component="div"
          count={allOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          style={{ width: '100%' }}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            '& .MuiTablePagination-actions': {
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }
          }}
        />
      </Box>

      {editingOrder && (
        <EditOrder
          open={modalOpenEdit}
          handleClose={() => setModalOpenEdit(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          users={users}
        />
      )}

      {orderDetails && (
        <OrderDetails
          open={modalOpenShow}
          handleClose={() => setModalOpenShow(false)}
          orderDetails={orderDetails}
          getUserName={getUserName}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default ListOrder;
