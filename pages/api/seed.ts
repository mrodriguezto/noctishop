import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from 'database';
import { Product, User } from 'models';

type Data = {
  message: string;
};

// Accesible only in dev environment
// Deletes all the data from the db and inserts many docs using a seeder
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: 'Not allowed',
    });
  }

  await db.connect();

  Promise.all([User.deleteMany(), User.insertMany(seedData.initialData.users)]);
  Promise.all([
    Product.deleteMany(),
    Product.insertMany(seedData.initialData.products),
  ]);

  await db.disconnect();

  res.status(200).json({ message: 'Success' });
}
