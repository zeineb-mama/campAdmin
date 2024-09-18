import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    categoryId: "",
    new_price: "",
    old_price: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${backend_url}/api/category/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addProduct = async () => {
    try {
      let formData = new FormData();
      formData.append('name', productDetails.name);
      formData.append('description', productDetails.description);
      formData.append('categoryId', productDetails.categoryId);
      formData.append('new_price', productDetails.new_price);
      formData.append('old_price', productDetails.old_price);
      if (image) {
        formData.append('image', image);
      }

      const addProductResponse = await fetch(`${backend_url}/api/product/addproduct`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await addProductResponse.json();

      if (!addProductResponse.ok) {
        throw new Error(`Failed to add product: ${responseData.message || 'Unknown error'}`);
      }

      alert("Product Added");
      setProductDetails({
        name: "",
        description: "",
        categoryId: "",
        new_price: "",
        old_price: ""
      });
      setImage(null);

    } catch (error) {
      console.error('Error adding product:', error);
      alert(error.message);
    }
  };


  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description" value={productDetails.description} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.categoryId} name="categoryId" className="add-product-selector" onChange={changeHandler}>
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn" onClick={addProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;
