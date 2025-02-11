import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logEvent } from '../util/logService';

export const registerUser = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    await logEvent('User Login', { userId: user.id, email: user.email });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};
