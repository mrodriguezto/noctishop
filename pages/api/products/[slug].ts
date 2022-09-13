import { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from 'types/products';
import { Product } from 'models';
import { db } from 'database';

type Data = { message: string } | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductsBySlug(req, res);

    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
}

async function getProductsBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { slug = '' } = req.query;

  await db.connect();

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado',
    });
  }

  product.images = product.images.map(image => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });

  res.status(200).json(product);
}
