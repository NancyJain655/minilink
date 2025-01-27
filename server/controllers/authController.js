const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, mobileNumber, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email is already registered' });

    existingUser = await User.findOne({ mobileNumber });
    if (existingUser) return res.status(400).json({ msg: 'Mobile number is already registered' });

    const user = new User({ name, email, mobileNumber, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'Registered successfully',
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'user is not registered please sign up' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      msg: 'logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobileNumber:user.mobileNumber, // Include the fields you want to store
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  const { name, email, mobileNumber } = req.body;  // Only 3 parameters (name, email, mobile number)

  try {
    const user = await User.findById(req.user.id);  // Get user from decoded JWT
    if (!user) return res.status(404).json({ msg: 'User not found' });

    let emailChanged = false;
    let mobileChanged = false;

    if (name) user.name = name;
    if (email && email !== user.email) {
      user.email = email;
      emailChanged = true; // Mark that email has been changed
    }
    if (mobileNumber && mobileNumber !== user.mobileNumber) {
      user.mobileNumber = mobileNumber;
      mobileChanged = true; // Mark mobile number as changed
    }


    await user.save();

    if (emailChanged) {
      return res.json({ 
        msg: 'User updated successfully. Please log in again with your new email.',
        redirectToLogin: true // Indicate to the client that they should log out and log in again
      });
    }

    const msg = mobileChanged
    ? "User updated successfully. Mobile number updated."
    : "User updated successfully.";
  return res.json({ msg, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have the user ID from the decoded token

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Logout user
const logoutUser = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, logoutUser };




