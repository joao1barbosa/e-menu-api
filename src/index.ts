import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { resolve } from 'path';
import routes from './modules/routes';

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  }),
);
server.use('/public', express.static(resolve(__dirname, '..', 'public')));

server.use(routes);

server.listen(process.env.PORT, () => {
  console.log();
  console.log(`Escutando na porta ${process.env.PORT}`);
  console.log(`${process.env.URL}:${process.env.PORT}`);
});
