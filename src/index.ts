import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

server.listen(process.env.PORT || 3000, async () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
  await sequelize.sync({ alter: true });  
});

export { io };
