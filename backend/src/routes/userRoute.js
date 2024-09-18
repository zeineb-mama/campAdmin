const express = require('express');
const { login, signup, addAdmin, getUserDetails, editUser, deleteUser, getAllUser } = require('../controllers/userController');
const router = express.Router();

router
    .post('/login', login)
    .post('/signup', signup)
    .post('/add-admin', addAdmin)
    .get('/users', getAllUser)
    .get('/user', getUserDetails)
    .put('/edit', editUser)
    .delete('/remove/:id', deleteUser)

module.exports = router
