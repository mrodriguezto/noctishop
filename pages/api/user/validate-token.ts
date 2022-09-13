import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from 'database';
import { User } from 'models';
import { jwt } from 'utils/jwt';
import { IApiUser } from 'types';

type Data = { message: string } | { token: string; user: IApiUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return checkJwt(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

async function checkJwt(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({
      message: 'Token de autorización inválido',
    });
  }

  await db.connect();

  const user = await User.findById(userId).lean();

  await db.disconnect();

  if (!user)
    return res.status(400).json({ message: 'No existe un usuario para este id' });

  const { email, _id, role, name } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: { email, role, name },
  });
}
