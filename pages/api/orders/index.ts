import { db } from 'database';
import { Order, Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IOrder } from 'types';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItems, total } = req.body as IOrder;

  // Verify user

  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Sin autorización' });
  }

  // Create an array with the user's products

  const productsIds = orderItems.map(product => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } }).lean();

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        prod => prod._id.toString() === current._id,
      )?.price;

      if (!currentPrice) {
        throw new Error('El producto no existe. Verifica los items en tu carrito');
      }

      return current.quantity * currentPrice + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const serverTotal = subtotal * (taxRate + 1);

    if (total !== serverTotal) {
      throw new Error(
        'El monto total es diferente en distintas instancias. Posible manipulación',
      );
    }

    const userId = session.user._id;

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

    newOrder.total = Math.round(newOrder.total * 100) / 100;
    newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    console.log(error);
    res
      .status(400)
      .json({ message: error.message || 'Revisar los logs del servidor' });
  } finally {
    await db.disconnect();
  }
}
