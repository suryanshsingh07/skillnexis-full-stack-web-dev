# SkillNexis Full Stack Web Development (MERN) Internship — Week 2

> **Candidate:** Suryansh Singh  
> **Role:** Full Stack Developer  
> **Location:** Lucknow, Uttar Pradesh, India  
> **Email:** [suryanshsinghchauhanthakur@gmail.com](mailto:suryanshsinghchauhanthakur@gmail.com) | **Phone:** +91-8874518917  
> **Profiles:** [Portfolio](https://suryanshsingh.vercel.app) · [LinkedIn](https://linkedin.com/in/suryansh-singh-thakur) · [GitHub](https://github.com/suryanshSingh07)

---

## Executive Overview

This repository contains the complete, verified Week 2 submission for the **SkillNexis Full Stack Web Development (MERN) Internship**. This week focuses on **React Fundamentals & Multi-Page Navigation** paired with **Production-Grade Node.js/Express Backend Architecture, MongoDB/Mongoose Integration, and JWT/bcrypt Security Engineering**.

Every deliverable specified in the SkillNexis Week 2 assignment guidelines has been fully implemented, accompanied by automated test suites and Postman collections.

---

## Week 2 Project Directory Index

```text
week-2/ (week-02/)
├── README.md                           # Master Week 2 technical documentation & test guide
│
├── react-fundamentals/                 # Deliverable A: React Fundamentals & Router App
│   ├── package.json                    # React 19 + React Router v6 + Vite + Oxlint
│   ├── vite.config.js                  # Vite configuration with React plugin
│   ├── index.html                      # HTML5 root with custom dark theme favicon
│   ├── .gitignore                      # Local ignore rules
│   ├── .oxlintrc.json                  # Linter rules
│   └── src/
│       ├── main.jsx                    # React StrictMode root mount
│       ├── App.jsx                     # React Router BrowserRouter shell
│       ├── styles/
│       │   └── index.css               # Global CSS variables & modern design tokens
│       ├── components/
│       │   ├── Navbar.jsx & .module.css     # Sticky header with active links & mobile drawer
│       │   ├── Layout.jsx & .module.css     # Shared layout container with footer credentials
│       │   ├── ProductCard.jsx & .module.css # Feature 1: Reusable product card with props
│       │   ├── Counter.jsx & .module.css     # Feature 2: Interactive Props & State engine
│       │   └── TodoApp.jsx & .module.css     # Feature 3: React To-Do with LocalStorage
│       └── pages/
│           ├── Home.jsx                # Overview & embedded live Counter demo
│           ├── Products.jsx            # Dynamic responsive product collection grid
│           ├── Todos.jsx               # Dedicated To-Do application page
│           ├── About.jsx               # Learning outcomes, architecture & author profile
│           ├── NotFound.jsx            # 404 Route fallback handler
│           └── Pages.module.css        # Scoped layout & typography styling
│
├── todo-rest-api/                      # Deliverable C: To-Do List REST API
│   ├── package.json                    # Express + Mongoose + Supertest + Jest
│   ├── .env.example                    # Environment variable template
│   ├── .gitignore                      # Environment & node_modules ignore rules
│   ├── src/
│   │   ├── app.js                      # Express application shell (routes, middleware, CORS)
│   │   ├── server.js                   # Server entry point listening on PORT 5001
│   │   ├── config/db.js                # Mongoose connection with error handling
│   │   ├── models/Task.js              # Task schema (title, description, completed, timestamps)
│   │   ├── controllers/taskController.js # CRUD handlers with status codes
│   │   ├── routes/taskRoutes.js        # RESTful route endpoints
│   │   ├── validators/taskValidator.js # Request payload validation & ObjectId checks
│   │   └── middleware/
│   │       ├── errorHandler.js         # Centralized error handler (CastError, ValidationError)
│   │       └── notFound.js             # 404 route handler
│   └── tests/
│       └── task.test.js                # 16 Automated Jest/Supertest integration tests
│
├── user-authentication-api/            # Deliverable D: User Authentication API
│   ├── package.json                    # Express + Mongoose + bcryptjs + JWT + Jest
│   ├── .env.example                    # Template with PORT=5002, JWT_SECRET, JWT_EXPIRES_IN
│   ├── .gitignore
│   ├── src/
│   │   ├── app.js                      # Express application shell
│   │   ├── server.js                   # Server entry point listening on PORT 5002
│   │   ├── config/db.js                # Mongoose connection
│   │   ├── models/User.js              # User schema with bcrypt hashing & matchPassword()
│   │   ├── controllers/authController.js # register, login, getMe handlers
│   │   ├── routes/authRoutes.js        # Public & protected endpoints
│   │   ├── validators/authValidator.js # RFC email check, password policy, name validation
│   │   └── middleware/
│   │       ├── auth.js                 # JWT Bearer token protection middleware
│   │       ├── errorHandler.js         # Centralized handler (duplicate key E11000)
│   │       └── notFound.js
│   └── tests/
│       └── auth.test.js                # 12 Automated Jest/Supertest security tests
│
├── notes-app-backend/                  # Deliverable E: Notes App Backend (Mini Project)
│   ├── package.json                    # Express + Mongoose + JWT + bcryptjs + Jest
│   ├── .env.example                    # Template with PORT=5003
│   ├── .gitignore
│   ├── src/
│   │   ├── app.js                      # Express application shell
│   │   ├── server.js                   # Server entry point listening on PORT 5003
│   │   ├── config/db.js                # Database connection
│   │   ├── models/
│   │   │   ├── User.js                 # User schema
│   │   │   └── Note.js                 # Note schema with owner ObjectId reference
│   │   ├── controllers/
│   │   │   ├── authController.js       # Authentication endpoints
│   │   │   └── noteController.js       # Authenticated CRUD with strict ownership logic
│   │   ├── routes/
│   │   │   ├── authRoutes.js           # Auth routes (/api/auth)
│   │   │   └── noteRoutes.js           # Protected note routes (/api/notes)
│   │   ├── validators/
│   │   │   ├── authValidator.js
│   │   │   └── noteValidator.js
│   │   └── middleware/
│   │       ├── auth.js                 # JWT protection middleware
│   │       ├── errorHandler.js
│   │       └── notFound.js
│   └── tests/
│       └── notes.test.js               # 8 Automated tests including Cross-User Ownership Isolation
│
└── postman/                            # Evaluator Postman Workspace
    ├── local.postman_environment.json  # Environment with variables for all 3 APIs
    ├── todo-api.postman_collection.json # 10 requests covering To-Do CRUD & error states
    ├── auth-api.postman_collection.json # 9 requests covering Auth, JWT & error handling
    └── notes-api.postman_collection.json # 12 requests covering Notes & cross-user security
```

---

## Week 2 Requirements Coverage Matrix

| Area | Requirement | Project Location | Implementation Details |
|---|---|---|---|
| **React** | Product Information Component | `react-fundamentals/` | [`ProductCard.jsx`](file:///Z:/SkillNexis/skillnexis-full-stack-web-dev/week-02/react-fundamentals/src/components/ProductCard.jsx): displays title, price formatted in INR, description, category badge, and interactive selection button. |
| **React** | Props & State Engine | `react-fundamentals/` | [`Counter.jsx`](file:///Z:/SkillNexis/skillnexis-full-stack-web-dev/week-02/react-fundamentals/src/components/Counter.jsx): props for bounds and step intervals, `useState` for state mutation, interactive log of state transitions. |
| **React** | To-Do Practice App | `react-fundamentals/` | [`TodoApp.jsx`](file:///Z:/SkillNexis/skillnexis-full-stack-web-dev/week-02/react-fundamentals/src/components/TodoApp.jsx): add task with validation, toggle completion, delete task, task count metrics, safe localStorage synchronization. |
| **React** | React Router Navigation | `react-fundamentals/` | [`App.jsx`](file:///Z:/SkillNexis/skillnexis-full-stack-web-dev/week-02/react-fundamentals/src/App.jsx): client-side routing for `/`, `/products`, `/todos`, `/about`, and `*` (404 Not Found), with active link styling and mobile drawer. |
| **React** | CSS Modules Styling | `react-fundamentals/` | 6 separate `.module.css` files providing scoped component styling without global stylesheet collisions. |
| **Backend** | To-Do List REST API | `todo-rest-api/` | Full CRUD (`GET`, `POST`, `PATCH`, `DELETE`) with Mongoose schema, input validation, 24-char ObjectId checks, centralized errors, and 16 automated tests. |
| **Backend** | User Authentication API | `user-authentication-api/` | Register with duplicate prevention, bcrypt 10-round password hashing, login with JWT issuance, and protected `/api/auth/me` with Bearer token middleware. 12 automated tests. |
| **Backend** | Notes Backend Mini Project | `notes-app-backend/` | Complete JWT-protected Notes CRUD (`GET`, `POST`, `PATCH`, `DELETE`) with **strict cross-user ownership isolation** (User B receives 404 when querying User A's note). 8 automated tests. |
| **Testing** | Postman Collections | `postman/` | 3 full collections with test scripts auto-extracting tokens and IDs into a shared environment file. |

---

## Prerequisites & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22.x recommended)
- **NPM**: v9.0.0 or higher
- **MongoDB**: Local MongoDB community service (`mongodb://127.0.0.1:27017`) OR a free MongoDB Atlas cluster connection string. *(Note: All automated tests run in-memory and do not require an active MongoDB server).*

---

## Execution Guide for Each Project

### 1. React Fundamentals Application
```bash
cd week-02/react-fundamentals

# Install dependencies
npm install

# Start development server
npm run dev
# -> Opens http://localhost:3000 (or http://localhost:5173)

# Build for production
npm run build
# Output: dist/ (0 errors, 49 modules transformed)

# Run linter
npm run lint
# Output: 0 warnings, 0 errors
```

### 2. To-Do List REST API (`PORT 5001`)
```bash
cd week-02/todo-rest-api

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run automated tests (16 tests)
npm test

# Start development server with live watch
npm run dev
# Server running at: http://localhost:5001
# Health check: http://localhost:5001/api/health
```

### 3. User Authentication API (`PORT 5002`)
```bash
cd week-02/user-authentication-api

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run automated tests (12 tests)
npm test

# Start development server with live watch
npm run dev
# Server running at: http://localhost:5002
# Health check: http://localhost:5002/api/health
```

### 4. Notes App Backend Mini Project (`PORT 5003`)
```bash
cd week-02/notes-app-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run automated tests (8 tests including ownership isolation)
npm test

# Start development server with live watch
npm run dev
# Server running at: http://localhost:5003
# Health check: http://localhost:5003/api/health
```

---

## API Endpoint Reference Tables

### A. To-Do List REST API (`http://localhost:5001`)

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `GET` | `/api/health` | Service health status & uptime | No | `200` |
| `GET` | `/api/tasks` | List all tasks (optional: `?completed=true/false`) | No | `200` |
| `GET` | `/api/tasks/:id` | Retrieve single task by ID | No | `200`, `400`, `404` |
| `POST` | `/api/tasks` | Create task (`title` required, `description`, `completed`) | No | `201`, `400` |
| `PATCH` | `/api/tasks/:id` | Partial update task (`title`, `description`, `completed`) | No | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/:id` | Delete task by ID | No | `200`, `400`, `404` |

#### Example Request: Create Task
```http
POST /api/tasks HTTP/1.1
Host: localhost:5001
Content-Type: application/json

{
  "title": "Complete SkillNexis Week 2 Assignment",
  "description": "Build React fundamentals app and three Express REST APIs with tests and Postman collections.",
  "completed": false
}
```

#### Example Response (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "671234567890abcdef123456",
    "title": "Complete SkillNexis Week 2 Assignment",
    "description": "Build React fundamentals app and three Express REST APIs with tests and Postman collections.",
    "completed": false,
    "createdAt": "2026-10-18T11:00:00.000Z",
    "updatedAt": "2026-10-18T11:00:00.000Z"
  }
}
```

---

### B. User Authentication API (`http://localhost:5002`)

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `GET` | `/api/health` | Service health status | No | `200` |
| `POST` | `/api/auth/register` | Register new user (`name`, `email`, `password`) | No | `201`, `400` |
| `POST` | `/api/auth/login` | Login user & issue JWT (`email`, `password`) | No | `200`, `400`, `401` |
| `GET` | `/api/auth/me` | Get authenticated user profile | **Yes (Bearer JWT)** | `200`, `401` |

#### Example Request: Register User
```http
POST /api/auth/register HTTP/1.1
Host: localhost:5002
Content-Type: application/json

{
  "name": "Suryansh Singh",
  "email": "suryansh.dev@example.com",
  "password": "SecurePass2026!"
}
```

#### Example Response (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "671234567890abcdef123488",
    "name": "Suryansh Singh",
    "email": "suryansh.dev@example.com",
    "createdAt": "2026-10-18T11:05:00.000Z"
  }
}
```

---

### C. Notes App Backend API (`http://localhost:5003`)

| Method | Endpoint | Description | Auth Required | Status Codes |
|---|---|---|---|---|
| `GET` | `/api/health` | Service health check | No | `200` |
| `POST` | `/api/auth/register` | Register user in notes database | No | `201`, `400` |
| `POST` | `/api/auth/login` | Login user & issue JWT | No | `200`, `401` |
| `GET` | `/api/notes` | List notes belonging to authenticated user | **Yes (Bearer JWT)** | `200`, `401` |
| `GET` | `/api/notes/:id` | Get note by ID (user-isolated) | **Yes (Bearer JWT)** | `200`, `401`, `404` |
| `POST` | `/api/notes` | Create note (owner derived from JWT) | **Yes (Bearer JWT)** | `201`, `400`, `401` |
| `PATCH` | `/api/notes/:id` | Update note (user-isolated) | **Yes (Bearer JWT)** | `200`, `400`, `401`, `404` |
| `DELETE` | `/api/notes/:id` | Delete note (user-isolated) | **Yes (Bearer JWT)** | `200`, `401`, `404` |

#### Security Feature: Cross-User Ownership Isolation
If **User B** attempts to read, update, or delete a note belonging to **User A**, the server responds with:
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "error": "Note not found or you do not have permission to access it."
}
```
*Note: Returning 404 rather than 403 prevents attackers from probing the existence of private note IDs belonging to other users.*

---

## Postman Collection Import & Execution Guide

1. Open **Postman**.
2. Click **Import** (top left).
3. Select all 4 files from `week-02/postman/`:
   - `local.postman_environment.json`
   - `todo-api.postman_collection.json`
   - `auth-api.postman_collection.json`
   - `notes-api.postman_collection.json`
4. In Postman's top-right environment selector, choose **"SkillNexis Week 2 - Local Environment"**.
5. Start the backend servers locally in separate terminal tabs (`npm run dev` in ports 5001, 5002, 5003).
6. Run the collections sequentially:
   - **`todo-api.postman_collection.json`**: Creates a task, stores `taskId` automatically in the environment, updates it, fetches it, and deletes it.
   - **`auth-api.postman_collection.json`**: Registers a user, automatically extracts the JWT into `authToken`, and calls `/api/auth/me`.
   - **`notes-api.postman_collection.json`**: Tests complete authenticated CRUD with automatic ID extraction.

---

## Actual Automated Test & Build Results

All automated checks and test suites were executed locally in PowerShell:

### 1. `react-fundamentals` Build & Lint Results
```text
$ npm run lint
> oxlint
Found 0 warnings and 0 errors.
Finished in 103ms on 13 files with 88 rules using 8 threads.

$ npm run build
> vite build
vite v6.4.4 building for production...
✓ 49 modules transformed.
dist/index.html                   0.75 kB │ gzip:  0.48 kB
dist/assets/index-D6El2p_g.css   13.64 kB │ gzip:  3.33 kB
dist/assets/index-BUiaxhbH.js   269.45 kB │ gzip: 84.90 kB
✓ built in 4.92s
```

### 2. `todo-rest-api` Test Results
```text
$ npm test
> jest --runInBand --detectOpenHandles

PASS tests/task.test.js
  To-Do REST API (/api/tasks) — Integration & Controller Tests
    GET /api/health
      √ should return 200 and operational service status (125 ms)
    POST /api/tasks (Create Task)
      √ should create a new task with valid data and return 201 (76 ms)
      √ should reject task creation with missing title and return 400 (31 ms)
      √ should reject task creation with short title (< 3 chars) and return 400 (35 ms)
      √ should reject task creation with title exceeding 200 chars and return 400 (30 ms)
    GET /api/tasks (List Tasks)
      √ should retrieve all tasks with count and return 200 (48 ms)
      √ should filter tasks by completed query param (29 ms)
    GET /api/tasks/:id (Retrieve Single Task)
      √ should retrieve task by valid ID and return 200 (25 ms)
      √ should return 404 for non-existent valid ObjectId (37 ms)
      √ should return 400 for malformed ObjectId format (24 ms)
    PATCH /api/tasks/:id (Update Task)
      √ should update completed status and title, returning 200 (26 ms)
      √ should reject update if request body has no valid fields (26 ms)
      √ should return 404 when updating non-existent task (25 ms)
    DELETE /api/tasks/:id (Delete Task)
      √ should delete task and return 200 (24 ms)
      √ should return 404 when deleting non-existent task (28 ms)
    Unknown Route Handler
      √ should return 404 for unmapped endpoints (28 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        4.636 s
```

### 3. `user-authentication-api` Test Results
```text
$ npm test
> jest --runInBand --detectOpenHandles

PASS tests/auth.test.js
  User Authentication API (/api/auth) — Integration & Security Tests
    GET /api/health
      √ should return 200 and operational service status (145 ms)
    POST /api/auth/register
      √ should register user with hashed password, return 201, safe user object, and JWT (211 ms)
      √ should reject registration if email is already registered and return 400 (176 ms)
      √ should reject registration with password under 6 characters (38 ms)
      √ should reject registration with invalid email format (33 ms)
      √ should reject registration with missing name (31 ms)
    POST /api/auth/login
      √ should authenticate valid credentials and return 200 with JWT token (256 ms)
      √ should reject login with wrong password and return generic 401 (265 ms)
      √ should reject login with unregistered email and return generic 401 (195 ms)
    GET /api/auth/me (Protected Route with JWT Middleware)
      √ should return user profile when provided valid Bearer token (190 ms)
      √ should reject request when Authorization header is missing (401) (160 ms)
      √ should reject request with an invalid/tampered token (401) (174 ms)

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        7.583 s
```

---

## Security Best Practices Implemented

1. **Password Hashing:** Passwords are never stored in plaintext. They are encrypted using `bcryptjs` with 10 salt rounds in a Mongoose `pre('save')` hook.
2. **Password Sanitization:** The `password` field is configured with `select: false` so it is never inadvertently returned in queries or API JSON responses.
3. **Generic Error Feedback:** Login failures return a generic message (`"Invalid email or password combination."`) rather than exposing whether the email or password was wrong, mitigating account enumeration attacks.
4. **Token Verification:** JWT signatures and expiration times are strictly validated. Bearer token extraction handles missing, malformed, or tampered tokens with HTTP 401.
5. **No Client Trust:** In the Notes API, note ownership (`owner`) is strictly derived from the verified JWT payload (`req.user.id`), ignoring any arbitrary `owner` fields supplied in request bodies.
6. **Cross-User Data Leakage Prevention:** Inaccessible notes belonging to other users return HTTP 404 rather than revealing their existence with 403.
7. **Body Parser Limits:** Request bodies are capped at `100kb` to protect against denial-of-service payload attacks.
8. **Secrets Management:** Sensitive keys and database URIs are loaded through environment variables (`.env`) with `.env.example` templates committed while actual secrets are ignored by `.gitignore`.

---

## Optional Deployment Guidance

### Deploying the React App (Vercel)
1. Navigate to `react-fundamentals/`.
2. Run `vercel` (or connect the repository to the [Vercel Dashboard](https://vercel.com)).
3. Configure the Single Page Application (SPA) rewrite rule in `vercel.json` if needed:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Deploying Node.js APIs (Render / Railway)
1. Push the repository to GitHub.
2. Create a Web Service on [Render](https://render.com) or [Railway](https://railway.app).
3. Set the Root Directory to the desired API folder (e.g., `week-02/todo-rest-api`).
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Supply environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`) in the platform dashboard.

---

## Final Evaluator Checklist

- [x] **React Practice 1:** ProductCard component created and rendered dynamically from sample data.
- [x] **React Practice 2:** Props and state demonstrated with interactive bounds, step selector, and history log.
- [x] **React Practice 3:** To-Do App with add, toggle, delete, task counters, validation, and localStorage persistence.
- [x] **React Practice 4:** React Router multi-page navigation (`/`, `/products`, `/todos`, `/about`, 404).
- [x] **React Practice 5:** CSS Modules styling with locally scoped class names across all components.
- [x] **Assignment 1:** MongoDB/Mongoose To-Do REST API (`GET`, `POST`, `PATCH`, `DELETE`) with 16 automated tests.
- [x] **Assignment 2:** User Authentication API with bcrypt hashing, JWT tokens, and protected `/me` endpoint with 12 tests.
- [x] **Mini Project:** Notes App Backend with full authenticated CRUD and strict cross-user ownership isolation.
- [x] **Postman:** 3 comprehensive Postman collections and a shared environment file.
- [x] **Quality:** 0 build errors, 0 linter warnings, 100% test pass rate across all test suites.
