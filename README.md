# 🚀 Task Manager API

A secure and scalable RESTful API built using **Node.js** and **Express.js** that allows users to register, authenticate, and manage their personal tasks. This project demonstrates integration with both **PostgreSQL (Neon)** and **MongoDB (Atlas)** along with authentication, validation, event-driven features, and external service integration.

🔗 **Live API:** https://task-api-3yau.onrender.com

---

## 📌 Features

* 🔐 User Registration & Login (JWT Authentication)
* 👤 User Profile (Authenticated)
* 📝 Task Management (CRUD operations)
* 🔒 Authorization (Users can only access their own tasks)
* 🏷️ Task Categorization & Tags
* 🔍 Filter tasks by category and tags
* ⏰ Event-driven Task Reminders (1 hour before due date)
* 🌐 Webhook Integration on task completion
* 🔁 Webhook retry logic with exponential backoff
* ✅ Data Validation using express-validator
* ⚠️ Global Error Handling
* ☁️ Cloud Database Integration (Neon + MongoDB Atlas)
* 🌍 Deployment Ready (Render)

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Authentication:** JSON Web Token (JWT)
* **Password Hashing:** bcrypt.js
* **Relational DB:** PostgreSQL (via Neon)
* **NoSQL DB:** MongoDB (via Mongoose)
* **Validation:** express-validator
* **Environment Management:** dotenv

---

## 📁 Project Structure

```
task-manager-api/
│
├── config/              # Database configurations
├── controllers/         # Business logic
├── middleware/          # Auth, validation, error handling
├── models/              # DB models (Postgres + Mongo)
├── routes/              # API routes
├── validators/          # Request validation logic
├── utils/               # Scheduler & webhook logic
│
├── app.js               # Express app setup
├── server.js            # Entry point
├── .env                 # Environment variables
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/aakash1612/Task_api.git
cd Task_api
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure environment variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key

# PostgreSQL (Neon)
DATABASE_URL=your_neon_connection_string

# MongoDB Atlas
MONGO_URI=your_mongodb_connection_string

# Webhook URL
WEBHOOK_URL=https://webhook.site/your-unique-id
```

---

### 4️⃣ Run the application

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔹 Authentication

**POST /api/auth/register**

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

**POST /api/auth/login**

```json
{
  "token": "your_jwt_token"
}
```

---

**GET /api/auth/profile**

Header:

```
Authorization: Bearer <token>
```

---

### 🔹 Task Management

**POST /api/tasks**

```json
{
  "title": "Complete assignment",
  "description": "Backend API",
  "status": "pending",
  "category": "Work",
  "tags": ["urgent", "backend"]
}
```

---

**GET /api/tasks**

---

**GET /api/tasks/:id**

---

**PUT /api/tasks/:id**

---

**DELETE /api/tasks/:id**

---

## 🔍 Filtering Tasks

```
GET /api/tasks?category=Work
GET /api/tasks?tag=urgent
```

---

## 🔐 Authorization

All task routes require authentication.

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚠️ Validation Rules

* Email must be valid
* Password must be at least 6 characters
* Task title is required
* Status must be `pending` or `completed`
* Due date must be valid ISO format

---

## ❌ Error Handling

Handles:

* 400 → Validation errors
* 401 → Unauthorized
* 403 → Forbidden
* 404 → Not Found
* 500 → Internal Server Error

---

## ⏰ Task Reminder System

* When a task is created or updated with a due date, a reminder is scheduled.
* Implemented using an in-memory scheduler (`setTimeout`).
* Reminder triggers **1 hour before due date**.
* Output is logged to console (simulated notification).

---

## 🏷️ Categories & Tags

* Tasks support **category** (e.g., Work, Personal).
* Tasks support multiple **tags** (array of strings).
* Enables flexible filtering and organization.

---

## 🌐 Webhook Integration

* When a task is marked **completed**, a webhook is triggered.
* Sends a POST request to external service (e.g., webhook.site).

### Payload:

```json
{
  "id": "...",
  "title": "...",
  "userId": "...",
  "completedAt": "..."
}
```

---

## 🔁 Webhook Retry Logic

* Retries up to **3 times** if webhook fails.
* Uses **exponential backoff**:

  * 2 seconds → 4 seconds → 8 seconds
* Ensures reliable delivery.

---

## 🧠 Design Decisions

* PostgreSQL for structured user data
* MongoDB for flexible task storage
* JWT for stateless authentication
* In-memory scheduler for simplicity
* Webhook system for event-driven architecture
* MVC architecture for clean code

---

## 🌍 Deployment

* Render → Backend hosting (https://task-api-3yau.onrender.com)
* Neon → PostgreSQL
* MongoDB Atlas → MongoDB

---

## 👨‍💻 Author

Developed by **Akash Varshney**



