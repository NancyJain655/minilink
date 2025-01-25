const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post('/register', registerUser);

// @route POST /api/auth/login
// @desc Login user
router.post('/login', loginUser);
// @route PUT /api/auth/update
// @desc Update user
router.put('/update', authMiddleware, updateUser);

// @route DELETE /api/auth/delete
// @desc Delete user
router.delete('/delete', authMiddleware, deleteUser);

// @route POST /api/auth/logout
// @desc Logout user
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
