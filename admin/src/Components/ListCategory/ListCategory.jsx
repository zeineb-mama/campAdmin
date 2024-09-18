import React, { useEffect, useState } from 'react'
import EditCategory from '../EditCategory/EditCategory';
import { backend_url } from "../../App";
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import "./ListCategory.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListCategory = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
    });
    const fetchCategories = () => {
        fetch(`${backend_url}/api/category/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };

    const updateCaregory = async (category) => {
        await fetch(`${backend_url}/api/category/updateCategory`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        fetchCategories();
    }
    const removeCategory = async (id) => {
        const response = await fetch(`${backend_url}/api/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            alert("Cannot delete this category because it's being used in other records.");
        }
        fetchCategories();
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEditClick = (product) => {
        setEditingCategory(product.id);
        setFormData({
            id: product.id,
            name: product.name,
        });
        setModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateCaregory(formData);
        setEditingCategory(null);
        setModalOpen(false);
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

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="listproduct">
            <h1>All Products List</h1>
            <div style={{ position: 'absolute', right: '40px' }}>
                <Link to='/addcategory' className="button-17">
                    <p>+ Add Category</p>
                </Link>
            </div>

            <TextField
                label="Search Categories"
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
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                            <TableRow key={index}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell align="right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" width={30} style={{ cursor: 'pointer' }} onClick={() => handleEditClick(category)} />
                                    <img className="listcategory-remove-icon" onClick={() => removeCategory(category.id)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSckjmVT1OZgpy0bFGkIAitjAu8Ed6_e2CLCA&s" width={30} alt="" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" width={500} mt={2}>
                <TablePagination
                    component="div"
                    count={categories.length}
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

            {editingCategory && (
                <EditCategory
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default ListCategory