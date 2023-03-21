import express from 'express';
import { resolve } from 'path';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'public')));
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
