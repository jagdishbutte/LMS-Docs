# 🔌 API Reference — AI-Based Lifestyle Intelligence Platform

### Owner: Jagdish
### Base URL: `/api/v1`
### Authentication: JWT (Bearer Token)
### Content-Type: `application/json`

---

## Overview

All APIs (except Auth endpoints) require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

Admin endpoints additionally require `role = ADMIN`.

---

## 1. Authentication APIs

### 1.1 Register User

**`POST`** `/auth/register`

**Auth Required:** No

**Request Body:**
```json
{
  "name": "Jagdish",
  "email": "jagdish@email.com",
  "password": "123456"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "timestamp": "2026-04-22T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists"
}
```

**Validations:**
- Email must be unique
- Password minimum 6 characters
- Name is required

---

### 1.2 Login User

**`POST`** `/auth/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "jagdish@email.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": 101,
    "name": "Jagdish",
    "role": "USER"
  }
}
```

**Error Response (401):**
```json
{
  "timestamp": "2026-04-22T10:00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

---

## 2. User Profile APIs

### 2.1 Get Profile

**`GET`** `/users/profile`

**Auth Required:** Yes (Bearer Token)

**Response (200):**
```json
{
  "name": "Jagdish",
  "email": "jagdish@email.com",
  "age": 23,
  "weight": 50,
  "role": "USER"
}
```

---

### 2.2 Update Profile

**`PUT`** `/users/profile`

**Auth Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "name": "Jagdish",
  "age": 24,
  "weight": 52
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

---

## 3. Daily Log APIs (Core)

### 3.1 Create / Update Daily Log

**`POST`** `/daily-log`

**Auth Required:** Yes

**Behavior:** Upsert — if log exists for the date, update it. Otherwise, create new.

**Request Body:**
```json
{
  "date": "2026-04-19",
  "steps": 5000,
  "waterIntake": 2.5,
  "sleepHours": 6,
  "meals": ["Breakfast", "Lunch"],
  "habits": [
    { "name": "Workout", "completed": true },
    { "name": "Read 10 Pages", "completed": false }
  ],
  "mood": "Happy"
}
```

**Response (200/201):**
```json
{
  "message": "Daily log saved successfully",
  "date": "2026-04-19"
}
```

**Validations:**
- Date must not be in the future
- Steps, waterIntake, sleepHours must be non-negative
- Only one log per user per date

---

### 3.2 Get Daily Log by Date

**`GET`** `/daily-log?date=2026-04-19`

**Auth Required:** Yes

**Response (200):**
```json
{
  "date": "2026-04-19",
  "steps": 5000,
  "waterIntake": 2.5,
  "sleepHours": 6,
  "meals": ["Breakfast", "Lunch"],
  "habits": [
    { "name": "Workout", "completed": true }
  ],
  "mood": "Happy"
}
```

**Response (404):** No log found for this date.

---

### 3.3 Get Logs by Date Range

**`GET`** `/daily-log/range?start=2026-04-01&end=2026-04-19`

**Auth Required:** Yes

**Response (200):**
```json
[
  {
    "date": "2026-04-01",
    "steps": 7200,
    "waterIntake": 3.0,
    "sleepHours": 7.5,
    "meals": ["Breakfast", "Lunch", "Dinner"],
    "habits": [...],
    "mood": "Happy"
  },
  ...
]
```

---

## 4. Expense APIs

### 4.1 Add Expense

**`POST`** `/expenses`

**Auth Required:** Yes

**Request Body:**
```json
{
  "amount": 200,
  "category": "Food",
  "date": "2026-04-19"
}
```

**Response (201):**
```json
{
  "id": 15,
  "message": "Expense added successfully"
}
```

**Validations:**
- Amount must be positive
- Date must be valid
- Category is required

---

### 4.2 Get Expenses by Date Range

**`GET`** `/expenses?start=2026-04-01&end=2026-04-30`

**Auth Required:** Yes

**Response (200):**
```json
[
  {
    "id": 15,
    "amount": 200.00,
    "category": "Food",
    "date": "2026-04-19"
  },
  {
    "id": 14,
    "amount": 50.00,
    "category": "Transport",
    "date": "2026-04-18"
  }
]
```

---

### 4.3 Update Expense

**`PUT`** `/expenses/{id}`

**Auth Required:** Yes

**Request Body:**
```json
{
  "amount": 250,
  "category": "Groceries",
  "date": "2026-04-19"
}
```

**Response (200):**
```json
{
  "message": "Expense updated successfully"
}
```

---

### 4.4 Delete Expense

**`DELETE`** `/expenses/{id}`

**Auth Required:** Yes

**Response (200):**
```json
{
  "message": "Expense deleted successfully"
}
```

---

## 5. Journal APIs

### 5.1 Create Journal Entry

**`POST`** `/journals`

**Auth Required:** Yes

**Request Body:**
```json
{
  "date": "2026-04-19",
  "content": "Today was productive. Finished the dashboard prototype.",
  "mood": "Happy"
}
```

**Response (201):**
```json
{
  "id": "64a7b3c...",
  "message": "Journal entry saved"
}
```

---

### 5.2 Get Journal Entries

**`GET`** `/journals`

**Auth Required:** Yes

**Response (200):**
```json
[
  {
    "id": "64a7b3c...",
    "date": "2026-04-19",
    "content": "Today was productive...",
    "mood": "Happy",
    "createdAt": "2026-04-19T18:30:00"
  }
]
```

---

### 5.3 Update Journal Entry

**`PUT`** `/journals/{id}`

**Auth Required:** Yes

**Request Body:**
```json
{
  "content": "Updated thoughts for the day.",
  "mood": "Grateful"
}
```

---

### 5.4 Delete Journal Entry

**`DELETE`** `/journals/{id}`

**Auth Required:** Yes

**Response (200):**
```json
{
  "message": "Journal entry deleted"
}
```

---

## 6. Dashboard APIs

### 6.1 Get Dashboard Summary

**`GET`** `/dashboard`

**Auth Required:** Yes

**Response (200):**
```json
{
  "steps": 5000,
  "water": 2.5,
  "sleep": 6,
  "expensesToday": 300,
  "habitsCompleted": 3,
  "habitsTotal": 5,
  "mood": "Happy"
}
```

---

### 6.2 Get Analytics Data

**`GET`** `/analytics?range=weekly`

**Auth Required:** Yes

**Query Params:**
- `range` — `weekly` or `monthly`

**Response (200):**
```json
{
  "range": "weekly",
  "steps": [5000, 7200, 3800, 9100, 6500, 4200, 8432],
  "sleep": [6.0, 7.5, 5.5, 8.0, 6.5, 7.0, 7.5],
  "water": [2.5, 3.0, 1.8, 2.2, 3.5, 2.0, 2.5],
  "expenses": [300, 150, 450, 200, 100, 350, 250],
  "habitCompletionRate": 68,
  "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
}
```

---

## 7. AI APIs

### 7.1 Get AI Insights

**`GET`** `/ai/insights`

**Auth Required:** Yes

**Response (200):**
```json
{
  "insights": [
    {
      "type": "warning",
      "message": "Your average sleep is below recommended level (5.5 hrs vs 7 hrs)"
    },
    {
      "type": "positive",
      "message": "Spending is down 15% this week!"
    },
    {
      "type": "suggestion",
      "message": "Try to maintain your Wednesday step count momentum"
    }
  ]
}
```

---

### 7.2 Chat with AI

**`POST`** `/ai/chat`

**Auth Required:** Yes

**Request Body:**
```json
{
  "question": "Why am I feeling tired?"
}
```

**Response (200):**
```json
{
  "answer": "Based on your data, your average sleep this week is 5.5 hours, which is below the recommended 7 hours. Additionally, your water intake has been lower than usual. Consider going to bed earlier and increasing hydration.",
  "sources": ["sleep_data", "water_data"]
}
```

---

## 8. Admin APIs

### 8.1 Get System Stats

**`GET`** `/admin/stats`

**Auth Required:** Yes (ADMIN role only)

**Response (200):**
```json
{
  "totalUsers": 1245,
  "activeUsers": 890,
  "avgSteps": 6500,
  "avgExpenses": 350,
  "habitCompletionRate": 62
}
```

---

## 9. Error Response Format

All errors follow a consistent structure:

```json
{
  "timestamp": "2026-04-19T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input data"
}
```

### HTTP Status Codes Used

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Validation failure |
| 401 | Unauthorized | Missing/invalid JWT |
| 403 | Forbidden | Insufficient role (e.g., non-admin accessing admin API) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Unexpected server error |

---

## 10. API Security Summary

| Rule | Details |
|------|---------|
| All APIs except `/auth/*` require JWT | Token in `Authorization: Bearer <token>` header |
| Admin routes require ADMIN role | `/admin/*` endpoints |
| User can only access own data | Backend filters by authenticated userId |
| Passwords are hashed | bcrypt, never stored in plain text |
| AI service endpoints are internal | Not exposed directly to frontend |
