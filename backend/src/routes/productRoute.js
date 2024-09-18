const express = require('express');
const { allProducts, newCollections, popularProduct, relatedProducts, addproduct, removeproduct, updateProduct, productByCat, getProductById } = require('../controllers/productController');
const router = express.Router();
const { storage } = require('../../storage/storage');
const multer = require('multer');
const upload = multer({ storage });

router
    .post("/addproduct", upload.single('image'), addproduct)
    .post("/relatedproducts", relatedProducts)
    .put("/updateproduct/:id", upload.single('image'), updateProduct)
    .get("/allproducts", allProducts)
    .get("/newcollections", newCollections)
    .get("/popularinProduct", popularProduct)
    .get('/category/:categoryName', productByCat)
    .get('/getproduct/:id', getProductById)
    .delete("/removeproduct/:id", removeproduct)

module.exports = router