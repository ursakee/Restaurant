# Restaurant

Welcome to the Restaurant application! This project is a comprehensive solution for managing restaurant operations, including ordering, menu management, and QR code-based table interactions.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Restaurant application provides a seamless experience for both customers and restaurant staff. Customers can view the menu, place orders, and get QR code-based table service, while staff can manage orders, menu items, and categories efficiently.

## [Figma Design](https://www.figma.com/design/dmQAO4YuG34yfOV3UZwvHh/Untitled?node-id=0-1&t=JeRwQb4IhSk2hg66-1)

## Features
- **Dynamic Menu:** View and manage a dynamic menu with various categories and food items.
- **Order Management:** Place and manage orders with options to customize ingredients.
- **QR Code Integration:** Generate and validate QR codes for table-specific interactions.
- **Real-time Updates:** Utilize WebSockets for real-time order updates and notifications.
- **User Authentication:** Secure user authentication and session management.

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- WebSockets

## Installation

### Prerequisites
- Node.js (>=14.x)
- PostgreSQL (>=12.x)

### Steps

1. Clone the repository:

```sh
git clone https://github.com/ursakee/Restaurant.git
cd Restaurant
```

2. Install dependencies:

```sh
cd client
npm install
cd ../server
npm install
```

3. Set up environment variables:
   Create a `.env` file in the server directory and add the following variables:

```env
PORT=your_port
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_secret_key
LINK=your_localhost
```

4. Run the application:
   In the server directory:
   
```sh
cd server
npm start
```
   
   In a separate terminal, start the client:

```sh
cd client
npm start
```

## Usage

### Client
The client application provides a user-friendly interface for customers to view the menu, place orders, and scan QR codes.

### Server
The server application handles all the backend logic, including API routes for managing categories, foods, orders, and QR codes, as well as WebSocket connections for real-time updates.

## API Endpoints

### Categories
- `GET /api/categories`: Retrieve all categories.

### Foods
- `GET /api/foods`: Retrieve all foods.
- `GET /api/foods/:id`: Retrieve details of a specific food item.

### Orders
- `POST /api/order/send`: Place a new order.
- `POST /api/order/table_order`: Retrieve the current order for a table.

### QR Codes
- `GET /api/generate-qr`: Generate a QR code for a table.
- `GET /api/validate-qr`: Validate a scanned QR code.
