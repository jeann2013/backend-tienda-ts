import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import connectMongo from './config/mongo';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import { setupWebSocket } from './websockets/reporting';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
setupWebSocket(server);

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

server.listen(process.env.PORT || 3000, async () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
  await sequelize.sync({ alter: true });
  await connectMongo();
});