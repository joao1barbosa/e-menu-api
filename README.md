# eMenu-API

This is a simple project that I developed entirely on my own when I was studying API REST. To do so, I decided to create an API that serves an application of online menus. Managing everything, from the login to the list of products.

## 🧰 Features

- User, Restaurant and Product CRUD.
- Uploading and storing images on the server.
- Token management through JWT.

## 📱 Tech

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

To install the necessary packages, simply clone the repository and run the following line in a terminal:

```sh
npm i
```

Remember to create an env file like the one in the example.

## 🏗 Build

You can run the application using the dev script. However, since node does not support typescript and imports, you can create a build to use it:

```sh
npm run build
```

## 📦 Docker

In order to set up a Docker container with postgres, all you need to do is use the following command

```sh
docker run -d --name NAME -p PORT:PORT -e POSTGRES_PASSWORD=PASSWORD postgres
```

Just replace the uppercase words with the ones you set in DATABASE_URL in the dotenv file.

## 🏃 Run

Now that everything is ready to go, just run the following line in terminal if you have not already created a build:

```sh
npm run dev
```

Use the following command if you have a build:

```sh
npm run start
```

## 🥳 Thanks

The project may not be perfect, but it was a nice challenge for me to create such a complete API. I learned a lot during the development and I believe that it was a good foundation for my next studies and projects.
