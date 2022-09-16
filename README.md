# Noctishop

Noctishop is an almost fully featured e-commerce website that supports authentication, payments via paypal, products, users and orders management through a dedicated UI for admins.

Made with Next.js, MUI and MongoDB. It also uses Cloudinary for storing product images, Github OAuth for authentication and Paypal.

## Prerequisites

- Node.js >= 16.0 installed
- MongoDB cluster
- Cloudinary account
- Paypal app (must have the client_id and secret_id)
- Dedicated Github OAuth app

## Running locally

### Setting up the environment

Rename the `env.example` to `.env` and assign each variable to your corresponding keys.

The default values for certain variables are already assigned (tax and host), give them a new value just when necessary.

### Install all the packages

```
npm install
```

or (if you're using yarn):

```
yarn
```

### Start the server

```
npm run dev
```

or (if you're using yarn):

```
yarn dev
```

It should start running on localhost:3000 🤓
