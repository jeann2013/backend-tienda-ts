import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public total!: number;
  public date!: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    total: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'orders' }
);

export default Order;
