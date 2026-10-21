# SkillNexis — Week 3: Full Stack Integration (React + Express + MongoDB)

> **Candidate:** Suryansh Singh  
> **Role:** Full Stack Developer  
> **Location:** Lucknow, Uttar Pradesh, India  
> **GitHub:** [https://github.com/suryanshSingh07](https://github.com/suryanshSingh07)  
> **Portfolio:** [https://suryansh.vercel.app](https://suryansh.vercel.app/)  
> **Email:** suryanshsinghchauhanthakur@gmail.com | **Phone:** +91-8874518917  

---

## Executive Overview

Week 3 focuses on **Full Stack Integration**: connecting modern React client applications to Express backends backed by MongoDB, with secure JWT-based user authentication, protected client routing, centralized API service layers, Multer multipart file uploads, and a full-featured Task Manager mini-project.

All requirements from both the **Week 3 Practice Set** and the **Week 3 Main Assignment** are implemented, tested, and documented.

---

## Curriculum Requirements Covered

| Module | Assignment / Practice | Implementation Directory | Status |
| :--- | :--- | :--- | :--- |
| **Practice Set** | User Management REST API (CRUD + JWT + Mongoose) | `task-manager/server` & `fullstack-todo/server` | Complete (5/5 Tasks) |
| **Assignment 1** | Full Stack To-Do Application (React + Express + MongoDB) | `fullstack-todo/client` & `fullstack-todo/server` | Complete |
| **Assignment 2** | Image Upload Feature with Multer & React Preview | `image-upload/client` & `image-upload/server` | Complete |
| **Mini Project** | Task Manager Mini-Project (Full MERN with Data Isolation) | `task-manager/client` & `task-manager/server` | Complete |
| **Postman** | 4 Collections + Local Environment File | `postman/` | Complete |
| **Automated QA** | Jest & Supertest Integration Test Suites | All servers `tests/` | 100% Pass |

---

## Final Directory Structure

```text
week-03/
├── README.md                                  # Complete Week 3 documentation
│
├── fullstack-todo/                            # Assignment 1: Full Stack To-Do Application
│   ├── client/                                # React 19 + Vite frontend
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── components/                    # Navbar, TaskCard, TaskFormModal, LoadingSpinner
│   │       ├── pages/                         # LoginPage, RegisterPage, DashboardPage, NotFoundPage
│   │       ├── context/AuthContext.jsx        # React Context API for JWT state & auth persistence
│   │       ├── services/api.js                # Centralized Axios client with Bearer interceptors
│   │       ├── routes/ProtectedRoute.jsx      # Route guard preventing unauthenticated access
│   │       ├── App.jsx
│   │       ├── index.css
│   │       └── main.jsx
│   └── server/                                # Express + MongoDB backend
│       ├── package.json
│       ├── .env.example
│       ├── src/
│       │   ├── config/db.js                   # Mongoose connection handler
│       │   ├── models/User.js                 # User schema with bcrypt password hashing
│       │   ├── models/Task.js                 # Task schema with user ownership reference
│       │   ├── middleware/auth.js             # JWT Bearer token verification & authorization
│       │   ├── middleware/errorHandler.js     # Centralized error handler with Mongoose checks
│       │   ├── middleware/notFound.js         # 404 handler
│       │   ├── validators/                    # userValidator.js, taskValidator.js
│       │   ├── controllers/                   # authController, userController, taskController
│       │   ├── routes/                        # authRoutes, userRoutes, taskRoutes
│       │   ├── app.js                         # Express application setup with CORS & health check
│       │   └── server.js                      # Server startup
│       └── tests/todo.test.js                 # Jest + Supertest automated test suite
│
├── image-upload/                              # Assignment 2: Multer Image Upload Feature
│   ├── client/                                # React frontend with live image preview
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── App.jsx                        # Dropzone, URL.createObjectURL preview, progress & gallery
│   │       ├── index.css
│   │       └── main.jsx
│   └── server/                                # Express + Multer backend
│       ├── package.json
│       ├── .env.example
│       ├── uploads/                           # Static storage directory for uploaded files (.gitkeep)
│       ├── src/
│       │   ├── config/multer.js               # Multer diskStorage, sanitized names, 5MB & MIME filter
│       │   ├── controllers/uploadController.js# uploadSingleImage, getUploadedImages, deleteImage
│       │   ├── routes/uploadRoutes.js         # POST /api/uploads/image, GET /api/uploads
│       │   ├── middleware/errorHandler.js     # Multer file size and type error handler
│       │   ├── app.js                         # Express app serving /uploads statically
│       │   └── server.js                      # Server startup on port 5006
│       └── tests/upload.test.js               # Automated tests for upload, reject, size limits
│
├── task-manager/                              # Mini Project: Full-Stack Task Manager Application
│   ├── client/                                # React 19 + Vite dashboard
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── components/                    # Navbar, StatsOverview, TaskCard, TaskModal
│   │       ├── pages/                         # LoginPage, RegisterPage, DashboardPage, ProfilePage
│   │       ├── context/AuthContext.jsx        # Global Auth & User profile context
│   │       ├── services/api.js                # Centralized Axios API service layer
│   │       ├── routes/ProtectedRoute.jsx      # Protected routing
│   │       ├── App.jsx
│   │       ├── index.css
│   │       └── main.jsx
│   └── server/                                # Express + MongoDB backend
│       ├── package.json
│       ├── .env.example
│       ├── src/
│       │   ├── config/db.js
│       │   ├── models/User.js                 # User model with role and comparePassword
│       │   ├── models/Task.js                 # Task model with status, priority, dueDate, owner
│       │   ├── middleware/auth.js             # Strict ownership verification
│       │   ├── middleware/errorHandler.js
│       │   ├── middleware/notFound.js
│       │   ├── validators/                    # authValidator, taskValidator
│       │   ├── controllers/                   # authController, userController, taskController
│       │   ├── routes/                        # authRoutes, userRoutes, taskRoutes
│       │   ├── app.js
│       │   └── server.js
│       └── tests/taskManager.test.js          # Automated tests for CRUD, filters & isolation
│
└── postman/                                   # Postman workspace collections
    ├── user-management.postman_collection.json# Practice Set: 5 CRUD tasks + JWT auth tests
    ├── todo-api.postman_collection.json       # Assignment 1: Full Stack To-Do REST API
    ├── image-upload.postman_collection.json   # Assignment 2: Multer Multipart image upload API
    ├── task-manager.postman_collection.json   # Mini Project: Full Stack Task Manager API
    └── local.postman_environment.json         # Unified environment variables with dynamic tokens
```

---

## Technologies Used

- **Frontend:** React 19, React Router DOM v6, Vite 6, Axios, Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Grid & Flexbox).
- **Backend:** Node.js, Express.js 4.x, Multer (multipart/form-data), Morgan logger, CORS, Dotenv.
- **Database & Modeling:** MongoDB, Mongoose 8.x ODM.
- **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs` (10-round salt), sanitized filenames via `crypto`, MIME type whitelist (`image/jpeg`, `image/png`, `image/webp`).
- **Testing & Quality Assurance:** Jest 29, Supertest 7.

---

## Prerequisites & Environment Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher (v22.x tested and recommended).
- **npm:** v9.0.0 or higher.
- **MongoDB:** A running MongoDB instance locally (`mongodb://127.0.0.1:27017`) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI string.

---

## Installation & Running the Applications

### 1. Assignment 1: Full Stack To-Do Application

#### Start Server (Port 5005)
```bash
cd week-03/fullstack-todo/server
npm install
cp .env.example .env
npm run dev
# Server runs on http://localhost:5005
```

#### Start Frontend Client (Port 3001)
```bash
cd week-03/fullstack-todo/client
npm install
npm run dev
# Client runs on http://localhost:3001
```

---

### 2. Assignment 2: Image Upload Feature (Multer)

#### Start Server (Port 5006)
```bash
cd week-03/image-upload/server
npm install
cp .env.example .env
npm run dev
# Server runs on http://localhost:5006
```

#### Start Frontend Client (Port 3002)
```bash
cd week-03/image-upload/client
npm install
npm run dev
# Client runs on http://localhost:3002
```

---

### 3. Mini Project: Task Manager Application

#### Start Server (Port 5000)
```bash
cd week-03/task-manager/server
npm install
cp .env.example .env
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend Client (Port 5173)
```bash
cd week-03/task-manager/client
npm install
npm run dev
# Client runs on http://localhost:5173
```

---

## Environment Variables Reference

Each server folder includes a documented `.env.example` file.

| Application | Variable | Default Value | Description |
| :--- | :--- | :--- | :--- |
| **Full Stack To-Do Server** | `PORT` | `5005` | Backend HTTP port |
| | `MONGODB_URI` | `mongodb://127.0.0.1:27017/skillnexis_fullstack_todo` | MongoDB database connection URI |
| | `JWT_SECRET` | `skillnexis_super_secret_jwt_key_week3_2026` | Secret key for JWT signing |
| | `CLIENT_URL` | `http://localhost:3001` | Permitted CORS frontend origin |
| **Image Upload Server** | `PORT` | `5006` | Backend HTTP port |
| | `CLIENT_URL` | `http://localhost:3002` | Permitted CORS frontend origin |
| | `UPLOAD_DIR` | `uploads` | Local upload folder name |
| | `MAX_FILE_SIZE_MB`| `5` | Maximum allowed file size in Megabytes |
| **Task Manager Server** | `PORT` | `5000` | Backend HTTP port |
| | `MONGODB_URI` | `mongodb://127.0.0.1:27017/skillnexis_task_manager` | MongoDB database connection URI |
| | `JWT_SECRET` | `skillnexis_super_secret_jwt_key_task_manager_2026` | Secret key for JWT signing |
| | `CLIENT_URL` | `http://localhost:5173` | Permitted CORS frontend origin |

---

## API Endpoints Documentation

### Practice Set: User Management REST API
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Public | Register user account with hashed password |
| `POST` | `/api/users/login` | Public | Authenticate user credentials & issue JWT |
| `GET` | `/api/users/me` | Protected | Get profile for currently authenticated user |
| `GET` | `/api/users` | Admin | List all registered users (passwords excluded) |
| `GET` | `/api/users/:id` | Protected | Retrieve specific user by ID (Self or Admin) |
| `PATCH` | `/api/users/:id` | Protected | Update permitted user fields (Self or Admin) |
| `DELETE` | `/api/users/:id` | Protected | Delete user account (Self or Admin) |

### Assignment 1: Full Stack To-Do API
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Health status check |
| `POST` | `/api/auth/register` | Public | Register new To-Do user |
| `POST` | `/api/auth/login` | Public | User login & token generation |
| `GET` | `/api/auth/me` | Protected | Get current authenticated user |
| `GET` | `/api/todos` | Protected | Fetch user's tasks (supports `?status=active|completed` and `?search=keyword`) |
| `POST` | `/api/todos` | Protected | Create a new task under authenticated user |
| `GET` | `/api/todos/:id` | Protected | Fetch single task by ID |
| `PATCH` | `/api/todos/:id` | Protected | Update task (title, description, or completed status) |
| `DELETE` | `/api/todos/:id` | Protected | Delete task owned by authenticated user |

### Assignment 2: Multer Image Upload API
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Health status check |
| `POST` | `/api/uploads/image` | Public | Upload single image (`multipart/form-data`, field: `image`) |
| `GET` | `/api/uploads` | Public | List all uploaded images with metadata |
| `DELETE` | `/api/uploads/:filename` | Public | Delete an uploaded image file |
| `GET` | `/uploads/:filename` | Public | Static file access to uploaded images |

### Mini Project: Task Manager API
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Register user account |
| `POST` | `/api/auth/login` | Public | Sign in and return token + user object |
| `GET` | `/api/auth/me` | Protected | Get authenticated profile |
| `GET` | `/api/tasks` | Protected | Get user tasks and live statistics (`total`, `pending`, `inProgress`, `completed`, `highPriority`) |
| `POST` | `/api/tasks` | Protected | Create task with status, priority, and optional due date |
| `GET` | `/api/tasks/:id` | Protected | Retrieve task (strictly verified against `req.user._id`) |
| `PATCH` | `/api/tasks/:id` | Protected | Update task details |
| `DELETE` | `/api/tasks/:id` | Protected | Delete task owned by user |

---

## Security & Data Isolation Architecture

1. **Derived Ownership Isolation:**
   The backend **never trusts a client-supplied `owner` or `userId`** in request payloads. Ownership is derived solely from the cryptographically verified JWT Bearer token extracted by the `protect` middleware:
   ```javascript
   const task = await Task.create({
     title: req.body.title,
     owner: req.user._id // derived strictly from verified token
   });
   ```

2. **Cross-User Protection:**
   Queries for read, update, or delete operations strictly include `{ _id: req.params.id, owner: req.user._id }`. Attempting to access another user's task yields an immediate `404 Not Found or unauthorized` response.

3. **Multer File Upload Hardening:**
   - **MIME Allowlist:** Only `image/jpeg`, `image/png`, and `image/webp` are permitted.
   - **File Size Limit:** 5MB enforced directly by Multer storage limits.
   - **Filename Sanitization:** Filenames are generated using random cryptographic bytes (`crypto.randomBytes(6).toString('hex')`) plus timestamp, eliminating directory traversal vulnerabilities.
   - **Object URL Revocation:** The React client utilizes `URL.createObjectURL()` for previews and revokes them via `URL.revokeObjectURL()` during cleanup to prevent memory leaks.

---

## Postman Testing Workspace

All Postman collections are located in `week-03/postman/`:
1. `user-management.postman_collection.json`
2. `todo-api.postman_collection.json`
3. `image-upload.postman_collection.json`
4. `task-manager.postman_collection.json`
5. `local.postman_environment.json`

### How to Import & Run:
1. Open Postman.
2. Click **Import** in the upper left corner and select the `week-03/postman/` folder.
3. Select the **SkillNexis Week 3 - Local Environment** in the top right environment selector.
4. Execute the requests in numbered sequence (e.g., *Register User* -> *Login User* -> *Protected Operations*). Test scripts automatically extract the issued JWT token and set the `{{token}}` variable for subsequent protected requests.

---

## Automated Testing

Automated test suites are provided using **Jest** and **Supertest** with mock-isolated database operations so they can execute instantly and reliably in any environment without requiring an external MongoDB server:

```bash
# Run Full Stack To-Do Server Tests
cd week-03/fullstack-todo/server
npm test

# Run Image Upload Server Tests
cd week-03/image-upload/server
npm test

# Run Task Manager Server Tests
cd week-03/task-manager/server
npm test
```

---

## Production Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Set the root directory of the project to `week-03/task-manager/client` (or appropriate client).
2. Set build command to `npm run build` and output directory to `dist`.
3. Configure the environment variable `VITE_API_URL` pointing to your hosted Express backend (e.g. `https://api-taskmanager.onrender.com/api`).

### Backend Deployment (Render / Railway)
1. Deploy `week-03/task-manager/server`.
2. Configure environment variables in the host dashboard:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGODB_URI=` (MongoDB Atlas URI)
   - `JWT_SECRET=` (High-entropy random string)
   - `CLIENT_URL=` (Your Vercel/Netlify frontend URL)
3. **Note on Uploads:** Local file uploads in `image-upload/server/uploads` are saved to local disk. For cloud hosting providers with ephemeral filesystems (e.g., Render free tier, Heroku), attach a persistent disk volume or integrate AWS S3 / Cloudinary for production image storage.

---

## Final Submission Checklist

- [x] REST API for User Management with Mongoose, bcrypt, and JWT implemented.
- [x] Full Stack To-Do application built with React + Vite + Express + MongoDB.
- [x] Centralized API client with Axios interceptors and Bearer auth tokens.
- [x] React Router with protected route guards implemented.
- [x] Controlled forms with client and server input validation.
- [x] Multer image upload endpoint with 5MB limit and MIME type validation.
- [x] Real-time image preview using `URL.createObjectURL()` with revocation cleanup.
- [x] Task Manager Mini-Project with user registration, login, and strict data isolation.
- [x] Task status, priority filtering, and live title search implemented.
- [x] Responsive modern UI with glassmorphism, stats cards, and modals.
- [x] 4 importable Postman collections and local environment file created.
- [x] Automated test suites written and passing.
- [x] Complete documentation written in `week-03/README.md` and root index updated.
