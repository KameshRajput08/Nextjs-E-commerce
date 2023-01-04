import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import connectMongo from '../../../utils/conn';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))
  const updatedUser = await User.findByIdAndUpdate(session.user._id, {
    name,
    email,
    password: bcryptjs.hashSync(password)
  }, { new: true });

  res.status(200).json(updatedUser);
}

export default handler;
