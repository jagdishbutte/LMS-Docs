# 🗃️ Database Design — AI-Based Lifestyle Intelligence Platform

### Owner: Jagdish
### Strategy: Polyglot Persistence (MySQL + MongoDB)

---

## 1. Overview

The system uses **polyglot persistence** — choosing the right database for each data type:

| Database | What It Stores | Why |
|----------|---------------|-----|
| **MySQL** | Users, Expenses | Structured, transactional, referential integrity needed |
| **MongoDB** | DailyLogs, Journals | Semi-structured, flexible schema, habits/meals change structure |

This ensures:
- **Data integrity** for financial + user data (MySQL constraints, FKs)
- **Flexibility** for lifestyle data that may evolve (MongoDB's schema-less design)

---

## 2. MySQL Database Design

### 2.1 Users Table

Stores user authentication and profile data.

```sql
CREATE TABLE users (
    id          BIGINT          PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL,
    email       VARCHAR(150)    UNIQUE NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    age         INT             NULL,
    weight      FLOAT           NULL,
    role        ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

| Field | Type | Constraints |
|-------|------|-------------|
| id | BIGINT | Primary Key, Auto Increment |
| name | VARCHAR(100) | Not Null |
| email | VARCHAR(150) | Unique, Not Null |
| password | VARCHAR(255) | Not Null (bcrypt hash) |
| age | INT | Nullable |
| weight | FLOAT | Nullable |
| role | ENUM('USER','ADMIN') | Default 'USER' |
| created_at | TIMESTAMP | Default CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | Auto-updated |

---

### 2.2 Expenses Table

Stores all user expense records.

```sql
CREATE TABLE expenses (
    id          BIGINT          PRIMARY KEY AUTO_INCREMENT,
    user_id     BIGINT          NOT NULL,
    amount      DECIMAL(10,2)   NOT NULL,
    category    VARCHAR(50)     NOT NULL,
    date        DATE            NOT NULL,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    INDEX idx_expenses_user_id (user_id),
    INDEX idx_expenses_date (date),
    INDEX idx_expenses_category (category)
);
```

| Field | Type | Constraints |
|-------|------|-------------|
| id | BIGINT | Primary Key, Auto Increment |
| user_id | BIGINT | Foreign Key → users(id), ON DELETE CASCADE |
| amount | DECIMAL(10,2) | Not Null, Must be positive |
| category | VARCHAR(50) | Not Null |
| date | DATE | Not Null |
| created_at | TIMESTAMP | Default CURRENT_TIMESTAMP |

**Relationships:**
- One user → Many expenses
- Foreign key ensures referential integrity
- CASCADE delete: if user is deleted, their expenses are removed

---

### 2.3 ER Diagram (MySQL)

```
┌──────────────────────────────┐
│          👤 users             │
│  id (PK)                     │
│  name, email, password       │
│  age, weight, role           │
│  created_at, updated_at     │
└──────────────┬───────────────┘
               │
               │ 1:N (user_id FK)
               │
┌──────────────▼───────────────┐
│        💰 expenses            │
│  id (PK)                     │
│  user_id (FK → users.id)     │
│  amount, category, date      │
│  created_at                  │
└──────────────────────────────┘
```

---

## 3. MongoDB Database Design

### 3.1 DailyLogs Collection

Stores all daily lifestyle data in a single document per user per date.

```json
{
  "_id": "ObjectId",
  "userId": "string (reference to MySQL user.id)",
  "date": "YYYY-MM-DD",

  "steps": 5000,
  "waterIntake": 2.5,
  "sleepHours": 6,

  "meals": ["Breakfast", "Lunch", "Dinner"],

  "habits": [
    { "name": "Workout", "completed": true },
    { "name": "Read 10 Pages", "completed": false }
  ],

  "mood": "Happy",

  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

**Constraints:**
- One document per user per date
- Compound uniqueness on `(userId, date)`

**Indexes:**
```javascript
db.dailyLogs.createIndex({ userId: 1 })
db.dailyLogs.createIndex({ date: 1 })
db.dailyLogs.createIndex({ userId: 1, date: 1 }, { unique: true })
```

---

### 3.2 Journals Collection

Stores user journal entries.

```json
{
  "_id": "ObjectId",
  "userId": "string",
  "date": "YYYY-MM-DD",
  "content": "Today was productive. Finished the dashboard prototype...",
  "mood": "Grateful",
  "createdAt": "ISODate"
}
```

**Constraints:**
- Optional: one journal per day per user (can be relaxed)

**Indexes:**
```javascript
db.journals.createIndex({ userId: 1 })
db.journals.createIndex({ date: 1 })
```

---

## 4. Cross-Database Relationship Strategy

Since MySQL and MongoDB are separate systems, there are **no direct foreign key constraints** between them.

Relationship is maintained via `userId`:

```
MySQL:   users.id = 101
MongoDB: dailyLogs.userId = "101"
MongoDB: journals.userId = "101"
```

**Consistency rules (enforced by backend):**
- Every MongoDB document must reference a valid MySQL user
- Backend validates userId before insertion
- No orphan records — deletion cascades handled in application layer

---

## 5. Aggregation Strategy

### Backend Aggregation Responsibilities

| Aggregation | Source | Used For |
|-------------|--------|----------|
| Daily → Weekly summaries | MongoDB (DailyLogs) | Analytics dashboard |
| Habit completion % | MongoDB (DailyLogs) | Analytics + AI insights |
| Expense totals | MySQL (Expenses) | Dashboard + Analytics |
| Category-wise breakdown | MySQL (Expenses) | Expense charts |
| Average sleep/steps | MongoDB (DailyLogs) | AI insight generation |

### MongoDB Aggregation Pipeline Example

```javascript
// Weekly average steps for a user
db.dailyLogs.aggregate([
  { $match: { userId: "101", date: { $gte: "2026-04-15", $lte: "2026-04-21" } } },
  { $group: { _id: null, avgSteps: { $avg: "$steps" }, avgSleep: { $avg: "$sleepHours" } } }
])
```

### MySQL Aggregation Example

```sql
-- Monthly expense breakdown by category
SELECT category, SUM(amount) as total, COUNT(*) as count
FROM expenses
WHERE user_id = 101 AND MONTH(date) = 4 AND YEAR(date) = 2026
GROUP BY category
ORDER BY total DESC;
```

---

## 6. AI Data Preparation

Before sending data to the AI service, the backend aggregates raw data into summarized format.

**The AI service never accesses databases directly.**

### Example Aggregated Input to AI:

```json
{
  "avgSleep": 5.5,
  "avgSteps": 3000,
  "weeklySpending": 3200,
  "habitCompletionRate": 60,
  "topExpenseCategory": "Food",
  "moodTrend": ["Happy", "Tired", "Happy", "Neutral", "Tired"]
}
```

---

## 7. Data Validation Rules

| Rule | Applied To |
|------|-----------|
| No negative values | steps, waterIntake, sleepHours, amount |
| Dates must be valid and not in future | date fields in DailyLogs, Expenses |
| Required fields must not be null | userId, date, amount, category |
| Email must be unique | users.email |
| Password minimum length | users.password (6+ characters) |
| Amount must be positive | expenses.amount |

---

## 8. Scalability Considerations

- MongoDB collections can scale horizontally (sharding on userId)
- MySQL can be optimized with proper indexing
- Modular schema supports future feature additions
- Vector DB (Phase 4) integrates separately for AI embeddings

---

<!-- 
## TODO: Implementation Deliverables
- [ ] MySQL DDL scripts
- [ ] MongoDB collection creation scripts  
- [ ] Seed data for testing
- [ ] Index creation scripts
- [ ] Aggregation query library
- [ ] ER diagram (visual)
-->
