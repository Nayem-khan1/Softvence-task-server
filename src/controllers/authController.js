import User from '../models/User.js';
import {
  createUser,
  generateToken,
  validatePassword
} from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'Email already used' });
    }

    const user = await createUser({ name, email, password });
    const token = generateToken(user._id);

    res
      .cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' })
      .json({ user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res
      .cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' })
      .json({ user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
