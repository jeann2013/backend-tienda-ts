import { Server } from 'socket.io';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import Product from '../models/Product';
import User from '../models/User';
import sequelize from '../config/database';

export const setupWebSocket = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSocket');

    const sendReport = async () => {
      const totalVentasHoy = await Order.sum('total', { where: { date: new Date().toISOString().split('T')[0] } });
      const productoMasVendido = await OrderDetail.findOne({
        attributes: ['productId', [sequelize.fn('SUM', sequelize.col('quantity')), 'totalCantidad']],
        group: ['productId'],
        order: [[sequelize.literal('totalCantidad'), 'DESC']],
        include: [{ model: Product, attributes: ['name'] }],
      });
      const usuariosMasCompras = await Order.findAll({
        attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('id')), 'totalCompras']],
        group: ['userId'],
        order: [[sequelize.literal('totalCompras'), 'DESC']],
        include: [{ model: User, attributes: ['name'] }],
      });

      socket.emit('reporte', {
        totalVentasHoy: totalVentasHoy || 0,
        productoMasVendido: productoMasVendido ? (productoMasVendido.getDataValue('Product')?.name || 'N/A') : 'N/A',
        usuariosMasCompras: usuariosMasCompras.map(user => ({
          name: user.getDataValue('User')?.name,
          totalCompras: user.get('totalCompras'),
        })),
      });
    };

    setInterval(sendReport, 10000); // Actualiza cada 10 segundos

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};