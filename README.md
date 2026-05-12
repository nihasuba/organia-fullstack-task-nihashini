# 🚀 Organia – Full-Stack Task Management System

A modern and responsive **Full-Stack Task Management Application** built to improve productivity and simplify task organization.  
Users can securely register, log in, create tasks, update progress, and manage workflows through an intuitive dashboard interface.

# 🛠️ Tech Stack

## 🎨 Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 🧩 Lucide React

## ⚙️ Backend
- 🚀 NestJS
- 🔐 JWT Authentication
- 🗄️ Prisma ORM

## 🛢️ Database
- 🐘 PostgreSQL (Supabase)

## ☁️ Deployment
- ▲ Vercel (Frontend)
- 🚂 Railway (Backend)

---

# 📂 Project Structure

```bash
organia-task-manager/
│
├── client/        # React Frontend
├── server/        # NestJS Backend
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Navigate to Server

```bash
cd server
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Create Environment File

Create a `.env` file inside the `server` directory.

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"

JWT_SECRET="your_secret_key"

PORT=3000
```

## 4️⃣ Run Prisma & Start Server

```bash
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

---

# 💻 Frontend Setup

## 1️⃣ Navigate to Client

```bash
cd ../client
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Create Environment File

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=your_backend_url
```

## 4️⃣ Start Development Server

```bash
npm run dev
```

---

# 🔑 API Documentation

## 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Login and receive JWT token |

---

## ✅ Task Routes

| GET | `/tasks/:userId` | Get all tasks for a user |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update task details/status |
| DELETE | `/tasks/:id` | Delete a task |

---

# 🧪 Demo Credentials

Use the following credentials to test the application:

```txt
Email: cst21032@std.uwu.ac.lk
Password: nihashini09
```

# 🌐 Live Demo

🚀 Frontend Deployment:  
https://organia-fullstack-task-nihashini.vercel.app/

---

```txt
MIT License © 2026 Nihashini
```
