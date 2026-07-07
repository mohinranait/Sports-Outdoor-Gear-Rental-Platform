# GearUp - Gear Rental Platform

GearUp is a full-stack gear rental platform where customers can browse rental equipment, place rental orders, make secure online payments, and submit reviews after completing a rental. Providers can manage their listed gear, while administrators oversee the entire platform.

---

## Features

### Authentication & Authorization

- JWT Authentication
- Role-based authorization
- Customer, Provider, and Admin roles
- Secure password hashing
- Protected routes

---

## Customer Features

- Register & Login
- Browse all available rental gear
- Search and filter gear
- View gear details
- Place rental orders
- Secure online payment using SSLCommerz
- View order history
- Cancel unpaid orders
- Submit reviews after returning rented gear
- Manage profile

---

## Provider Features

- Add new rental gear
- Update gear information
- Delete gear
- Manage stock
- View received rental orders
- Track rental status

---

## Admin Features

- Dashboard overview
- Manage users
- Manage rental gear
- Manage rental orders
- Manage categories
- Monitor platform activities

---

## Rental Order System

- Rental duration calculation
- Automatic total amount calculation
- Stock validation
- Rental status management

Available Order Status:

- PLACED
- CONFIRMED
- ONGOING
- RETURNED
- CANCELLED

---

## Payment Integration

Integrated with SSLCommerz.

Payment Flow:

1. Customer places an order.
2. Order is stored with `PENDING` payment status.
3. A unique Transaction ID is generated.
4. Customer is redirected to SSLCommerz Payment Gateway.
5. After payment, SSLCommerz redirects to the server callback.
6. Payment is verified using SSLCommerz Validation API.
7. Order payment status is updated after successful verification.

---

## Review System

Customers can submit reviews only after successfully returning rented gear.

---

## Validation

- Zod Validation
- Request validation middleware
- Global error handling

---

## Security

- JWT Authentication
- Password Hashing
- Input Validation
- Protected API Routes
- Environment Variables

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- Bcrypt
- SSLCommerz Payment Gateway

---

## Database

- PostgreSQL

---

## API Features

- Authentication APIs
- User Management APIs
- Category APIs
- Gear APIs
- Rental Order APIs
- Payment APIs
- Review APIs

---

## Folder Structure

```
src
│
├── app
│   ├── modules
│   │   ├── auth
│   │   ├── user
│   │   ├── category
│   │   ├── gear
│   │   ├── rental-order
│   │   ├── payment
│   │   └── review
│   │
│   ├── middleware
│   ├── routes
│   ├── utils
│   └── config
│
├── prisma
│
└── server.ts
```

---

# Environment Variables

Create a `.env` file.

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

SSL_STORE_ID=
SSL_STORE_PASSWORD=
SSL_PAYMENT_API=
SSL_VALIDATION_API=

CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd gearup-backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migration

```bash
npx prisma migrate dev
```



Start Development Server

```bash
npm run dev
```

Build Production

```bash
npm run build
```

Run Production

```bash
npm start
```

---

# API Base URL

```
http://localhost:5000/api
```

---

# Payment Workflow

```
Create Order
      │
      ▼
Generate Transaction ID
      │
      ▼
Save Order (Placed)
      │
      ▼
Redirect to SSLCommerz
      │
      ▼
Customer Completes Payment
      │
      ▼
SSLCommerz Success Callback
      │
      ▼
Payment Validation API
      │
      ▼
Update Order Payment Status
```

---

# Future Improvements

- Email Notifications
- Wishlist
- Coupon System
- Refund System
- Rental Extension
- Analytics Dashboard
- Notifications
- Multiple Payment Methods

---

# Author

**Md. Ebrahim**

MERN Stack Developer