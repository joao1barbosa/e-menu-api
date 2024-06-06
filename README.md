# eMenu-API

This is a simple project that I developed entirely on my own while studying REST APIs. I created an API for an online menu application, managing everything from user login to product listings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Build](#build)
- [Docker](#docker)
- [Run](#run)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🧰 Features

- User, Restaurant, and Product CRUD operations.
- Image uploading and storage on the server.
- Token management using JWT.

## 📱 Tech Stack

- **Typescript**
- **Node.js**
- **Express**
- **Nodemon**
- **Multer**
- **JWT**
- **Zod**
- **Prisma OEM**
- **PostgreSQL**

## 🔧 Installation

To install the necessary packages, clone the repository and run the following command in the terminal:

```sh
npm i
```

## 🌐 Environment Variables

Create a .env file in the root directory of your project and add the following environment variables:

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
TOKEN_SECRET=your_jwt_secret
```

Refer to the .env.example file for a complete list of required environment variables.

## 🏗 Build

You can run the application using the development script. However, since Node.js does not natively support TypeScript and ES modules, you should create a build to use it:

```sh
npm run build
```

## 📦 Docker

To set up a Docker container with PostgreSQL, use the following command:

```sh
docker run -d --name NAME -p PORT:PORT -e POSTGRES_PASSWORD=PASSWORD postgres
```

Replace the uppercase placeholders with the appropriate values as specified in the DATABASE_URL in your .env file.

## 🏃 Run

Once everything is set up, you can start the application with the following commands:

For development:

```sh
npm run dev
```

For production (after building):

```sh
npm run start
```

### 📋 API Endpoints

#### Token Endpoints

- **POST /token**: Creates a token for a user by validating their credentials (email and password).

#### User Endpoints

- **POST /user**: Create a new user.
- **PATCH /user**: Update the user using their token to identify them.
- **DELETE /user**: Delete the user using their token to identify them.

#### Restaurant Endpoints

- **POST /restaurants**: Create a new restaurant and link it to the user registered in the token.
- **PATCH /restaurants/**: Update a restaurant using the user ID linked to it in the token to identify it.
- **DELETE /restaurants/**: Delete a restaurant using the user ID linked to it in the token to identify it.
- **GET /restaurants/:id**: Get a restaurant by ID.

#### Product Endpoints

- **POST /products**: Create a new product and link it to the restaurant registered in the token.
- **PUT /products/:id**: Update the product using the ID passed in the request body and the restaurant ID registered in the token to identify it.
- **DELETE /products/:id**: Delete the product using the ID passed in the request body and the restaurant ID registered in the token to identify it.
- **GET /products/:id**: List all the products from a restaurant (by their ID).

### 🤝 Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.do

## 🥳 Acknowledgements

This project may not be perfect, but it was a significant challenge for me to create a complete API. I learned a lot during its development, and it provided a solid foundation for my future studies and projects.
