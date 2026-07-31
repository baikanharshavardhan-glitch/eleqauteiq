# ElevateIQ Backend API

Node.js + Express + PostgreSQL backend for the ElevateIQ Employee Portal.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# → Fill in your PostgreSQL credentials and keys in .env

# 3. Start development server
npm run dev

# 4. Production
npm start
```

---

## 📁 Project Structure

```
elevateiq-backend/
├── server.js                  ← Entry point
├── .env.example               ← Environment template
├── package.json
└── src/
    ├── database/
    │   └── db.js              ← PostgreSQL connection pool
    ├── middleware/
    │   ├── auth.middleware.js ← JWT protect + role guard
    │   └── rateLimiter.js     ← Rate limiting
    ├── controllers/           ← Business logic
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── course.controller.js
    │   ├── attendance.controller.js
    │   ├── leave.controller.js
    │   ├── payroll.controller.js
    │   ├── performance.controller.js
    │   ├── ticket.controller.js
    │   ├── ai.controller.js
    │   └── announcement.controller.js
    ├── routes/                ← Express routers
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   ├── course.routes.js
    │   ├── attendance.routes.js
    │   ├── leave.routes.js
    │   ├── payroll.routes.js
    │   ├── performance.routes.js
    │   ├── ticket.routes.js
    │   ├── ai.routes.js
    │   └── announcement.routes.js
    └── utils/
        └── response.js        ← Unified API response helpers
```

---

## 🔐 Authentication

All protected routes need this header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📡 API Endpoints

### AUTH  `/api/auth`
| Method | Route              | Access  | Description          |
|--------|--------------------|---------|----------------------|
| POST   | /register          | Public  | Register new employee|
| POST   | /login             | Public  | Login & get token    |
| GET    | /me                | Private | Get logged-in user   |
| PUT    | /change-password   | Private | Change password      |

### USERS  `/api/users`
| Method | Route              | Access         | Description           |
|--------|--------------------|----------------|-----------------------|
| GET    | /profile           | Employee       | Get my profile        |
| PUT    | /profile           | Employee       | Update my profile     |
| POST   | /skills            | Employee       | Add skill             |
| DELETE | /skills/:id        | Employee       | Remove skill          |
| GET    | /                  | Admin/Manager  | All employees         |
| GET    | /:id               | Admin/Manager  | Single employee       |
| PATCH  | /:id/deactivate    | Admin          | Deactivate employee   |

### COURSES  `/api/courses`
| Method | Route              | Access   | Description           |
|--------|--------------------|----------|-----------------------|
| GET    | /                  | Employee | All courses           |
| GET    | /my                | Employee | My enrolled courses   |
| POST   | /:id/enroll        | Employee | Enroll in course      |
| PATCH  | /:id/progress      | Employee | Update progress       |
| POST   | /                  | Admin    | Create course         |
| DELETE | /:id               | Admin    | Delete course         |

### ATTENDANCE  `/api/attendance`
| Method | Route         | Access        | Description           |
|--------|---------------|---------------|-----------------------|
| POST   | /mark         | Employee      | Mark attendance       |
| GET    | /my           | Employee      | My attendance         |
| GET    | /summary      | Employee      | Attendance summary    |
| GET    | /all          | Admin/Manager | All employees         |

### LEAVES  `/api/leaves`
| Method | Route          | Access        | Description           |
|--------|----------------|---------------|-----------------------|
| POST   | /apply         | Employee      | Apply for leave       |
| GET    | /my            | Employee      | My leave history      |
| GET    | /balance       | Employee      | Leave balance         |
| GET    | /pending       | Admin/Manager | Pending applications  |
| PATCH  | /:id/action    | Admin/Manager | Approve/Reject        |
| DELETE | /:id           | Employee      | Cancel leave          |

### PAYROLL  `/api/payroll`
| Method | Route     | Access        | Description       |
|--------|-----------|---------------|-------------------|
| GET    | /my       | Employee      | My payslips       |
| GET    | /latest   | Employee      | Latest payslip    |
| GET    | /summary  | Employee      | YTD summary       |
| GET    | /all      | Admin/Manager | All payroll       |
| POST   | /         | Admin         | Create payslip    |

### PERFORMANCE  `/api/performance`
| Method | Route        | Access        | Description        |
|--------|--------------|---------------|--------------------|
| GET    | /reviews     | Employee      | My reviews         |
| GET    | /goals       | Employee      | My goals           |
| GET    | /summary     | Employee      | Stats summary      |
| POST   | /goals       | Employee      | Add goal           |
| PATCH  | /goals/:id   | Employee      | Update goal        |
| DELETE | /goals/:id   | Employee      | Delete goal        |
| POST   | /reviews     | Admin/Manager | Submit review      |

### TICKETS  `/api/tickets`
| Method | Route        | Access        | Description        |
|--------|--------------|---------------|--------------------|
| POST   | /            | Employee      | Raise ticket       |
| GET    | /my          | Employee      | My tickets         |
| GET    | /            | Admin/Manager | All tickets        |
| PATCH  | /:id/status  | Admin/Manager | Update status      |
| DELETE | /:id         | Employee      | Delete open ticket |

### AI ASSISTANT  `/api/ai`
| Method | Route     | Access   | Description          |
|--------|-----------|----------|----------------------|
| POST   | /chat     | Employee | Send message         |
| GET    | /history  | Employee | Chat history         |
| DELETE | /history  | Employee | Clear history        |

### ANNOUNCEMENTS  `/api/announcements`
| Method | Route  | Access        | Description         |
|--------|--------|---------------|---------------------|
| GET    | /      | Employee      | All announcements   |
| POST   | /      | Admin/Manager | Create announcement |
| DELETE | /:id   | Admin         | Delete announcement |

---

## 🌐 Roles & Permissions

| Role      | Access Level                                  |
|-----------|-----------------------------------------------|
| employee  | Own data only                                 |
| manager   | Own data + view team data + approve leaves    |
| admin     | Full access to everything                     |

---

## 🔧 Connect to Frontend

In your React frontend, replace direct API calls like:

```js
// ❌ Old (direct Anthropic call from frontend)
fetch("https://api.anthropic.com/v1/messages", { ... })

// ✅ New (through your backend)
fetch("http://https://eleqauteiq-backend.vercel.app/api/ai/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ message: userInput, session_id: "default" })
})
```
