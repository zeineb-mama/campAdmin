import React, { useState } from "react";
import { backend_url } from "../../App";

const AddCategory = () => {
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
    });

    const addCategory = async () => {
        try {
            const addCategoryResponse = await fetch(`${backend_url}/api/category/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryDetails),
            });
            const responseData = await addCategoryResponse.json();
            if (!addCategoryResponse.ok) {
                throw new Error(`Failed to add category: ${responseData.message || 'Unknown error'}`);
            }
            alert("Category Added");
            setCategoryDetails({
                name: "",
            });
        } catch (error) {
            console.error('Error adding category:', error);
            alert(error.message);
        }
    };

    const changeHandler = (e) => {
        setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="addproduct">
            <div className="addproduct-itemfield">
                <p>Category title</p>
                <input type="text" name="name" value={categoryDetails.name} onChange={changeHandler} placeholder="Type the name of category" />
            </div>
            <button className="addproduct-btn" onClick={addCategory}>ADD</button>
        </div>
    );
};

export default AddCategory;
