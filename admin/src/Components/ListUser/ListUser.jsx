import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { backend_url } from "../../App";
import EditUser from "../EditUser/EditUser";
import axios from "axios";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import UserModal from "./UserModal";
import './ListUser.css'

const ListUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [formData, setFormData] = useState({ id: '', role: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenAdmin, setModalOpenAdmin] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const addAdmin = async () => {
        try {
            const response = await axios.post(`${backend_url}/api/auth/add-admin`, user);
            fetchInfo();
            console.log('Signup successful:', response.data);
        } catch (error) {
            alert("Signup failed: " + error.response.data.errors);
        }
    };

    const fetchInfo = () => {
        fetch(`${backend_url}/api/auth/users`)
            .then((res) => res.json())
            .then((data) => setAllUsers(data));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const updateUser = async (user) => {
        await fetch(`${backend_url}/api/auth/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        fetchInfo();
    }

    const removeUser = async (id) => {
        await fetch(`${backend_url}/api/auth/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        fetchInfo();
    }

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setFormData({
            id: user.id,
            role: user.role
        });
        setModalOpen(true);
    };

    const handleClickAdmin = () => {
        setUser({ username: "", email: "", password: "" });
        setModalOpenAdmin(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleInputChangeAdmin = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setEditingUser(null);
        setModalOpen(false);
    };

    const handleFormSubmitAdmin = (e) => {
        e.preventDefault();
        addAdmin();
        setModalOpenAdmin(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MM-dd-yyyy HH:mm');
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

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="listproduct">
            <h1>Users List</h1>
            <div style={{ position: 'absolute', right: '40px' }}>
                <Button onClick={() => handleClickAdmin()} className="button-17">
                    <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                        <span style={{ fontSize: '20px' }}>+</span><p> Add Admin</p>
                    </div>
                </Button>
            </div>
            <TextField
                label="Search Users"
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
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{formatDate(user.date)}</TableCell>
                                <TableCell align="right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" width={30} style={{ cursor: 'pointer' }} onClick={() => handleEditClick(user)} />
                                    <img className="listcategory-remove-icon" onClick={() => removeUser(user.id)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSckjmVT1OZgpy0bFGkIAitjAu8Ed6_e2CLCA&s" width={30} alt="" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" width={500} mt={2}>
                <TablePagination
                    component="div"
                    count={allUsers.length}
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
            {editingUser && (
                <EditUser
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                />
            )}
            {user && (
                <UserModal
                    open={modalOpenAdmin}
                    handleClose={() => setModalOpenAdmin(false)}
                    user={user}
                    handleInputChangeAdmin={handleInputChangeAdmin}
                    handleFormSubmitAdmin={handleFormSubmitAdmin}
                />
            )}
        </div>
    );
};

export default ListUser;
