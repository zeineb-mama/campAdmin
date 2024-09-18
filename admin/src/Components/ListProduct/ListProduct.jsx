import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { backend_url, currency } from "../../App";
import EditProduct from '../EditProduct/EditProduct';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, IconButton, Box } from '@mui/material';

const ListProduct = () => {
  const [image, setImage] = useState(null);
  const [allproducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [data, setdata] = useState({
    id: "",
    name: "",
    old_price: "",
    new_price: "",
    categoryId: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInfo = () => {
    fetch(`${backend_url}/api/product/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  const fetchCategories = () => {
    fetch(`${backend_url}/api/category/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchInfo();
    fetchCategories();
  }, []);

  const updateProduct = async () => {
    let formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('categoryId', data.categoryId);
    formdata.append('new_price', data.new_price);
    formdata.append('old_price', data.old_price);
    if (image) {
      formdata.append('image', image);
    }

    const addProductResponse = await fetch(`${backend_url}/api/product/updateproduct/${data.id}`, {
      method: 'PUT',
      body: formdata,
    });
    const addProductResponseJson = await addProductResponse.json();
    if (addProductResponseJson.status === 'success') {
      setEditingProduct(null);
      setModalOpen(false);
    }
    fetchInfo();
  }

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${backend_url}/api/product/removeproduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.status === 400) {
        alert(`Cannot delete this product. It is associated with the following orders: ${result.associatedOrders.join(', ')}`);
        return;
      }

      if (result.status === 'success') {
        fetchInfo(); // Rafraîchir la liste des produits
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const removeSelectedProducts = async () => {
    for (const id of selectedProducts) {
      await removeProduct(id);
    }
    setSelectedProducts([]);
  }

  const handleEditClick = (product) => {
    setEditingProduct(product.id);
    setdata({
      id: product.id,
      name: product.name,
      old_price: product.old_price,
      new_price: product.new_price,
      categoryId: product.categoryId,
    });
    setModalOpen(true);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value
    });
  };

  const handleFormSubmit = (formData) => {
    updateProduct(formData);
    setEditingProduct(null);
    setModalOpen(false);
    setImage(null)
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleCheckboxChange = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = allproducts.map(product => product.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
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

  const filteredProducts = allproducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div style={{ position: 'absolute', right: '40px' }}>
        <Link to='/addproduct' className="button-17">
          <p>+ Add Product</p>
        </Link>
      </div>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: '20px 0' }}
        fullWidth
      />
      {selectedProducts.length > 0 &&
        <button onClick={removeSelectedProducts} className="button-17">Remove Selected</button>
      }
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <input type="checkbox"
                  onChange={handleSelectAll}
                  style={{ height: '20px', cursor: "pointer", }}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Old Price</TableCell>
              <TableCell>New</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleCheckboxChange(e, product.id)}
                    style={{ height: '15px' }}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img className="listproduct-product-icon" width={170} src={product.image} alt="" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.old_price}</TableCell>
                <TableCell>{product.new_price}</TableCell>
                <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                <TableCell align="right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" width={30} style={{ cursor: 'pointer' }} onClick={() => handleEditClick(product)} />
                  <img className="listproduct-remove-icon" onClick={() => removeProduct(product.id)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSckjmVT1OZgpy0bFGkIAitjAu8Ed6_e2CLCA&s" width={30} alt="" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" width={500} mt={2}>
        <TablePagination
          component="div"
          count={allproducts.length}
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
      {editingProduct && (
        <EditProduct
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          data={data}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          categories={categories}
          setImage={setImage}
          image={image}
        />
      )}
    </div>
  )
}
export default ListProduct;
