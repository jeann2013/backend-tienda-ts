import { Request, Response } from 'express';
import Order from '../models/Order';
import { logEvent } from '../util/logService';

export const createOrder = async (req: Request, res: Response) => {
  const order = await Order.create(req.body);
  await logEvent('Order Created', { orderId: order.id, userId: order.userId, total: order.total });
  res.json(order);
};

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll({ where: { userId: req.params.userId } });
  res.json(orders);
};
