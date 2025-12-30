# 🔐 Secure Notes App

A full-stack **Secure Notes Application** built using **React, Tailwind CSS, Node.js, Express, and MongoDB**.  
This application allows users to securely **register, log in, and manage personal notes**, with **AES encryption** applied to note content before storing it in the database.

This project is developed as part of the **Associate Software Engineer – React JS Assignment**.

---

## ✨ Features

### Authentication

- User Registration and Login
- JWT-based authentication
- Password hashing using bcrypt

### Notes Management

- Add new notes
- View personal notes
- Delete notes
- Notes are **encrypted on the client side (AES)** before storing

### UI

- Responsive UI built with **Tailwind CSS**
- Login / Register page
- Dashboard after login
- Header with Logout and User Avatar

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Context API
- Axios
- CryptoJS (AES encryption)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcryptjs

---

## 📁 Project Structure

secure-notes-app/
│
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ └── Note.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── notes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
└── frontend/
├── src/
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── pages/
│ │ ├── Login.jsx
| | └── Register.jsx
│ │ └── Dashboard.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json

---

## ⚙️ Prerequisites

Make sure the following are installed on your system:

- Node.js (v20 or above)
- MongoDB (local)
- MongoDB Compass
- VS Code

---

## 🚀 Setup & Installation (Local)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/secure-notes-app.git
cd secure-notes-app
```

==================================================

## 🔧 Backend Setup

### 2️⃣ Go to Backend Folder

```bash
cd backend
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create Environment Variables File

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secure_notes
JWT_SECRET=your_jwt_secret_key
```

### 5️⃣ Start MongoDB (Local)

Open MongoDB Compass  
Use the following connection string:

```
mongodb://127.0.0.1:27017
```

### 6️⃣ Start Backend Server

```bash
node server.js
```

Backend will run at:
```
http://localhost:5000
```

==================================================

## 🎨 Frontend Setup

### 7️⃣ Go to Frontend Folder

```bash
cd ../frontend
```

### 8️⃣ Install Dependencies

```bash
npm install
```

### 9️⃣ Start Frontend Server

```bash
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

==================================================

## 🔐 Notes

- Make sure backend is running before frontend
- MongoDB must be connected before starting backend
- JWT token is stored in localStorage after login
- AES encryption is applied on client side

==================================================
