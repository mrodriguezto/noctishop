import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from 'database';
import { User } from 'models';
import { jwt } from 'utils/jwt';
import { validations } from 'utils/validations';
import { IApiUser } from 'types';

type Data = { message: string } | { token: string; user: IApiUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

type RegisterBody = {
  email: string;
  password: string;
  name: string;
};

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '', name = '' } = req.body as RegisterBody;

  // Validations

  if (name.length < 2)
    return res.status(400).json({
      message: 'El nombre debe tener un mínimo de dos caracteres',
    });

  if (password.length < 8)
    return res.status(400).json({
      message: 'La contrasela debe tener un mínimo de 8 caracteres',
    });

  if (!validations.isValidEmail(email))
    return res.status(400).json({
      message: 'El email tiene un formato inválido',
    });

  // Validate existing user

  await db.connect();

  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'Email ingresado ya tiene una cuenta asociada' });
  }

  // Create new user

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Ocurrió un error al almacenar la información. Intente de nuevo',
    });
  }

  await db.disconnect();

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: { email, role, name },
  });
}
