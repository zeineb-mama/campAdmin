const express = require('express')
const { registerCategory, getCategory, deleteCategory, updateCategory, getCategorieById } = require('../controllers/categoryController')
const router = express.Router()

router.post('/register', registerCategory)
    .get('/categories', getCategory)
    .get('/:id', getCategorieById)
    .put('/updateCategory', updateCategory)
    .delete('/:id', deleteCategory)


module.exports = router