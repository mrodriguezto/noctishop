import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'database';
import { Product } from 'models';
import { IProduct } from 'types/products';

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);

    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { term = '' } = req.query;

  if (!term.length)
    return res.status(400).json({
      message: 'Bad Request: Search term not specified',
    });

  term = term.toString().trim().toLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: { $search: term },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}
