import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from 'types';

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    // case 'PUT':
    //     return updateProduct( req, res );

    // case 'POST':
    //     return createProduct( req, res )

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find().sort({ title: 'asc' }).lean();

  await db.disconnect();

  // // TODO:
  // const updatedProducts = products.map(product => {
  //   product.images = product.images.map(image => {
  //     return image.includes('http')
  //       ? image
  //       : `${process.env.HOST_NAME}products/${image}`;
  //   });

  //   return product;
  // });

  // res.status(200).json(updatedProducts);

  res.status(200).json(products);
};
