# 🛒 E-Commerce Dashboard (Full Stack)

A modern **full-stack e-commerce dashboard** built with scalable architecture, real-world backend patterns, and production-ready deployment.

🚀 Live Demo
Frontend: https://ecommerce-dashboard-pjtm.vercel.app
Backend API: https://ecommerce-dashboard-dq17.onrender.com

---

## 📌 Features

### 🔐 Authentication & Authorization

* User Signup / Login (JWT based)
* Role-based access control (RBAC)
* Secure password hashing (bcrypt)

### 🛍️ Product Management

* Create / Update / Delete products
* Categories & Brands
* Inventory tracking

### 🛒 Cart & Orders

* Add to cart
* Order placement
* Order tracking

### 💳 Payments

* Payment flow integration (structure ready)

### ⭐ Reviews & Ratings

* Product reviews
* Verified purchase system

### 📊 Admin Dashboard

* Manage users, products, orders
* Logs & audit tracking

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL (Render)

### Dev Tools

* ESLint
* Nodemon
* Sequelize CLI

---

## 📂 Project Structure

```
ecommerce-dashboard/
│
├── frontend/        # Next.js frontend
├── backend/         # Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middlewares/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=10000
NODE_ENV=production

DATABASE_URL=

JWT_SECRET=your_secret_key
JWT_EXPIRY=18m
```

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone Repository

```
git clone https://github.com/sunil090/ecommerce-dashboard.git
cd ecommerce-dashboard
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🧠 Database Setup

We use:

```
Sequelize ORM + PostgreSQL
```

For quick setup:

```js
sequelize.sync({ alter: true })
```

---

## 🌍 Deployment

### Frontend

* Deployed on Vercel

### Backend

* Deployed on Render

### Database

* PostgreSQL (Render)

---

## 🔥 API Example

### Signup

```
POST /api/v1/users/signup
```

---

## 🧪 Future Improvements

* Payment gateway integration (Stripe/Razorpay)
* Admin analytics dashboard
* Email notifications
* Docker setup
* CI/CD pipeline

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Sunil**
GitHub: https://github.com/sunil090

---

## ⭐ Show Your Support

If you like this project:

👉 Give it a ⭐ on GitHub
👉 Share with others

---

💡 Built with real-world backend architecture & deployment experience.
