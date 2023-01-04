import User from '../../../../models/User';
import { getSession } from 'next-auth/react';
import connectMongo from '../../../../utils/conn';
import { hashSync } from "bcryptjs";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else if (req.method === 'PUT') {
    return updateHandler(req, res)
  } else {
    return res.status(400).send({ error: 'Method not allowed' });
  }
};

const deleteHandler = async (req, res) => {
  connectMongo().catch(error => res.status(500).json({ error: "Connection to Database Failed...!" }))
  console.log(req.query.id)
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === 'admin@example.com') {
      return res.status(400).send({ error: 'Can not delete admin' });
    }
    await user.remove();
    const users = await User.find();
    res.status(200).json({ message: 'User Deleted', users });
  } else {
    res.status(404).send({ error: 'User Not Found' });
  }
};

const updateHandler = async (req, res) => {

  const { name, email, password, isAdmin } = req.body;
  console.log(typeof (isAdmin))

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    typeof (isAdmin) !== 'boolean' ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      error: 'Validation error',
    });
    return;
  }

  connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))
  const updatedUser = await User.findByIdAndUpdate(req.query.id, {
    name,
    email,
    password: hashSync(password),
    isAdmin
  }, { new: true });

  res.status(200).json(updatedUser);
}


export default handler;
