import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Order from './Order';
import Product from './Product';

const OrderDetail = sequelize.define('OrderDetail', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unitPrice: { type: DataTypes.FLOAT, allowNull: false },
});

export default OrderDetail;