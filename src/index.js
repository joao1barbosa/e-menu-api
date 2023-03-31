import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
// import { routes } from './modules/routes';
import { UserRouter } from './modules/user/router';

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/public', express.static(resolve(__dirname, '..', 'public')));

// server.use(routes);

server.use('/user', UserRouter);

server.listen(process.env.PORT, () => {
  console.log();
  console.log(`Escutando na porta ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});
