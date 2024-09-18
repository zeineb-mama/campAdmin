import React, { useEffect, useState } from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes, useNavigate } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import ListCategory from "../Components/ListCategory/ListCategory";
import AddCategory from "../Components/AddCategory/AddCategory";
import NotFound from "../Components/error/notFound";
import ListOrder from "../Components/ListOrder/ListOrder";
import ListUser from "../Components/ListUser/ListUser";
import AdminDashboard from "../Components/Statistics/Statistic";


const Admin = () => {


  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/listcategory" element={<ListCategory />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/listorders" element={<ListOrder />} />
        <Route path="/users" element={<ListUser />} />
        <Route path="/" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
};

export default Admin;
