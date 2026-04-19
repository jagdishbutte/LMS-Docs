# AI-Based Lifestyle Intelligence Platform

### Software Requirements Specification (SRS)

---

## 1. Introduction

---

### 1.1 Purpose

This document provide a comprehensive specification of the **AI-Based Lifestyle Intelligence Platform**, including its functional requirements, system architecture, data design, and technology stack.

The system is designed as a **data-driven lifestyle management and intelligence platform** that integrates user activity tracking, financial tracking, and AI-based analytics to deliver actionable insights.

---

### 1.2 Scope

The AI-Based Lifestyle Intelligence Platform is a web-based application that enables users to **collect, manage, analyze, and interpret** their daily lifestyle data in a unified system.

The system integrates multiple domains:

* **Lifestyle Tracking**

  * Daily activities such as steps, sleep, water intake, meals, and habits

* **Financial Tracking**

  * Expense recording with category-based analysis

* **Behavioral Tracking**

  * Journals and mood logging for qualitative insights

* **Analytics & Visualization**

  * Dashboards showing trends, summaries, and performance metrics

* **AI-Based Intelligence**

  * Rule-based and AI-generated insights based on user behavior patterns

Additionally, the system includes an **Admin Module** to monitor system usage and analyze aggregated data.

---

### 1.3 Definitions and Terminology

| Term                                 | Description                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Daily Log                            | A consolidated record of a user's daily activities including health, habits, and lifestyle inputs |
| AI Insight                           | A recommendation or observation generated based on user data                                      |
| RAG (Retrieval-Augmented Generation) | AI technique combining stored data with language models for contextual responses                  |
| Modular Monolith                     | A single application structured into independent modules with clear boundaries                    |
| Polyglot Persistence                 | Use of multiple databases (SQL + NoSQL) based on data requirements                                |

---

### 1.4 System Overview (High-Level)

The system is implemented as a **Modular Backend using Spring Boot**, combined with an external AI service for advanced analytics.

Key characteristics:

* Backend application with well-defined modules
* Integration of multiple data storage technologies:

  * MySQL for structured data
  * MongoDB for flexible lifestyle data
* External AI service for insight generation and chatbot functionality

The system emphasizes:

* Maintainability through modular design
* Scalability through clear separation of concerns
* Extensibility for future enhancements

---

## 2. System Overview

---

### 2.1 System Architecture

The system follows a **Modular Monolith Architecture with External AI Service Integration**.

All core backend functionalities are implemented within a single **Spring Boot application**, organized into well-defined modules (bounded contexts). This approach reduces system complexity while maintaining clear separation of concerns.

An external **AI Service** is integrated for advanced analytics and natural language processing.

---

### 2.2 Architecture Components

#### 2.2.1 Frontend Application

* Built using React and Redux
* Responsible for user interaction and data visualization
* Communicates with backend via REST APIs

---

#### 2.2.2 Backend Application (Spring Boot)

A single deployable unit structured into multiple modules:

##### Modules:

* **Auth Module**

  * Handles authentication and authorization (JWT-based)

* **User Module**

  * Manages user profiles and preferences

* **Expense Module**

  * Handles expense tracking and analytics (MySQL)

* **Lifestyle Module**

  * Manages daily logs including fitness, habits, and lifestyle data (MongoDB)

* **Journal Module**

  * Handles journal entries and mood tracking (MongoDB)

* **AI Integration Module**

  * Communicates with external AI service
  * Prepares and aggregates data for AI processing

* **Admin Module**

  * Provides system-level analytics and monitoring

---

#### 2.2.3 Databases

* **MySQL (Relational Database)**

  * Stores structured data:

    * Users
    * Expenses

* **MongoDB (NoSQL Database)**

  * Stores flexible and semi-structured data:

    * Daily Logs
    * Journals

* **Vector Database (AI Service)**

  * Stores embeddings for semantic search and AI processing

---

#### 2.2.4 AI Service (External)

* Built using Python FastAPI (or Node.js if required)
* Handles:

  * Insight generation
  * Natural language queries
  * Embedding and retrieval (RAG)
* Communicates with backend via REST APIs

---

### 2.3 Architectural Design Principles

* **Modular Monolith Design**

  * Single deployable unit with logically separated modules

* **Separation of Concerns**

  * Each module is responsible for a specific domain

* **Polyglot Persistence**

  * MySQL for structured data, MongoDB for flexible data

* **Scalability**

  * System can evolve into microservices if required

* **Maintainability**

  * Clear module boundaries reduce code complexity

---

### 2.4 Module Responsibilities

| Module         | Responsibilities                    |
| -------------- | ----------------------------------- |
| Auth           | Authentication, JWT validation      |
| User           | Profile management                  |
| Expense        | Expense CRUD, analytics             |
| Lifestyle      | Daily log management                |
| Journal        | Journal CRUD                        |
| AI Integration | Data aggregation + AI communication |
| Admin          | System analytics                    |

---

### 2.5 Communication Flow

1. User interacts with frontend
2. Frontend sends request to Spring Boot backend
3. Backend:

   * Authenticates request
   * Routes to appropriate module
4. Module interacts with:

   * MySQL (structured data)
   * MongoDB (flexible data)
5. AI-related requests:

   * Backend sends processed data to AI Service
   * AI Service returns insights
6. Response is sent back to frontend

---

### 2.6 Data Flow Overview

* User inputs daily data → stored in MongoDB (DailyLogs)
* Financial data → stored in MySQL (Expenses)
* Aggregated data → processed by backend
* AI module → consumes aggregated data for insights

---

### 2.7 Deployment Overview

* Frontend → Vercel / Netlify
* Backend → Render / AWS / Docker
* Databases → MongoDB Atlas + MySQL Cloud
* AI Service → Separate deployment (FastAPI server)

---

### 2.8 System Assumptions

* Users will regularly input daily data
* Internet connectivity is required
* AI service availability may affect insight generation

---

### 2.9 System Architecture Diagram

                        ┌────────────────────────────┐
                        │        Frontend (React)    │
                        │  - Dashboard               │
                        │  - Daily Logs UI           │
                        │  - Analytics               │
                        └────────────┬───────────────┘
                                     │ REST API
                                     ▼
                ┌──────────────────────────────────────┐
                │        Spring Boot Backend           │
                │    (Modular Monolith Architecture)   │
                │                                      │
                │  ┌──────────────┐   ┌──────────────┐ │
                │  │ Auth Module  │   │ User Module  │ │
                │  └──────────────┘   └──────────────┘ │
                │                                      │
                │  ┌──────────────┐   ┌──────────────┐ │
                │  │ Expense Mod  │   │ Lifestyle Mod│ │
                │  └──────────────┘   └──────────────┘ │
                │                                      │
                │  ┌──────────────┐   ┌──────────────┐ │
                │  │ Journal Mod  │   │ Admin Module │ │
                │  └──────────────┘   └──────────────┘ │
                │                                      │
                │        ┌────────────────────┐        │
                │        │ AI Integration Mod │────────┼────────────┐
                │        └────────────────────┘        │            │
                └──────────────┬───────────────────────┘            │
                               │                                    │
             ┌─────────────────┼─────────────────┐                  │
             ▼                 ▼                 ▼                  ▼
     ┌──────────────┐  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐
     │   MySQL DB   │  │  MongoDB DB  │  │  Vector DB     │  │  AI Service  │
     │ (Users, Exp) │  │ (Logs, Journ)│  │ (Embeddings)   │  │ (FastAPI)    │
     └──────────────┘  └──────────────┘  └────────────────┘  └──────────────┘

---

## 3. Functional Requirements 

---

### 3.1 Authentication Module

#### Description:

Handles user identity, authentication, and access control.

#### Functional Requirements:

* User can register using:

  * Email (unique)
  * Password (encrypted)

* User can log in using valid credentials

* System generates **JWT token** upon successful login

* Token must be included in all protected API requests

* User can logout (client-side token removal)

* Role-based access:

  * USER
  * ADMIN

#### Validations:

* Email must be unique
* Password must meet minimum length (e.g., 6 characters)

---

### 3.2 User Profile Module

#### Description:

Stores and manages user-specific personal data.

#### Functional Requirements:

* User can create/update profile:

  * Name
  * Age
  * Weight
  * Lifestyle goals (fitness, savings)

* User can view profile data

* Profile is linked to user account (1:1 relationship)

---

### 3.3 Daily Log Module (Core Module)

#### Description:

Central system to track all daily lifestyle activities.

#### Functional Requirements:

* User can create or update a **daily log for a specific date**

* Only **one daily log per user per date** is allowed

* If log exists → update

* If not → create new

---

#### Data Fields:

* Date
* Steps (integer)
* Water intake (liters)
* Sleep hours
* Meals (array of strings)
* Habits (array of objects):

  * habit name
  * status (completed/not completed)
* Mood (optional)

---

#### Operations:

* Create daily log
* Update daily log
* Fetch daily log by date
* Fetch logs for a date range

---

#### Validations:

* Date must not be in the future
* Numeric fields must be non-negative

---

### 3.4 Expense Management Module

#### Description:

Tracks and analyzes user spending.

#### Functional Requirements:

* User can add expense:

  * Amount
  * Category (predefined or custom)
  * Date

* User can:

  * Edit expense
  * Delete expense

* System supports:

  * Fetch expenses by date range
  * Monthly aggregation
  * Category-wise breakdown

---

#### Validations:

* Amount must be positive
* Date must be valid

---

### 3.5 Journal Module

#### Description:

Captures qualitative user data (thoughts, reflections).

#### Functional Requirements:

* User can create journal entry:

  * Text content
  * Date
  * Mood (optional)

* User can:

  * Edit entry
  * Delete entry
  * View history

---

#### Constraints:

* One journal entry per day (optional rule, can be relaxed)

---

### 3.6 Dashboard Module

#### Description:

Provides summarized and visual representation of user data.

---

#### 3.6.1 Daily Dashboard

* Displays:

  * Today’s steps
  * Water intake
  * Sleep hours
  * Habit completion
  * Today’s expenses

---

#### 3.6.2 Analytics Dashboard

* Displays:

  * Weekly/monthly trends
  * Expense charts
  * Habit completion rate
  * Average sleep and activity

---

#### Requirements:

* Data must be aggregated at backend
* Frontend only renders processed data

---

### 3.7 AI Insight Module

#### Description:

Generates insights based on user behavior and data patterns.

---

#### Phase 1 (Rule-Based Insights)

System generates insights such as:

* “Your average sleep is below recommended level”
* “You are overspending this week”
* “Habit consistency is low”

---

#### Phase 2 (AI-Based Insights)

* User can interact with chatbot:

  * Ask questions about lifestyle or spending

* System sends user data to AI service

* AI service returns:

  * Insights
  * Recommendations

---

#### Requirements:

* Backend must aggregate data before sending to AI
* AI service should not directly access raw databases

---

### 3.8 Admin Module

#### Description:

Provides system-level analytics for administrators.

---

#### Functional Requirements:

* Admin can:

  * View total number of users
  * View active users (based on recent activity)
  * View aggregated statistics:

    * Average steps
    * Average expenses
    * Habit trends

---

#### Constraints:

* Admin cannot modify user data
* Admin only has read access

---

### 3.9 Error Handling

#### Requirements:

* All APIs must return:

  * Proper HTTP status codes
  * Structured error messages

Example:

* 400 → Bad Request
* 401 → Unauthorized
* 500 → Internal Server Error

---

### 3.10 Logging Requirements

* Log:

  * API requests
  * Errors
  * AI service calls

---

## 4. User Interface Design

---

### 4.1 Design Principles

* Responsive design (mobile-first)
* Clean and minimal UI
* Data-focused dashboards
* Consistent layout across pages
* Reusable components

---

### 4.2 Application Layout Structure

All authenticated pages follow a common layout:

* **Top Navbar**

  * App name/logo
  * User profile dropdown (logout)

* **Sidebar Navigation**

  * Dashboard
  * Daily Log
  * Analytics
  * Expenses
  * Journal
  * Admin (only for admin role)

* **Main Content Area**

  * Page-specific content

---

### 4.3 Pages and UI Breakdown (Mahim)

---

## 4.3.1 Authentication Pages

### Login Page

#### Components:

* Email input
* Password input
* Login button
* Link to Register page

#### Behavior:

* On success → Redirect to Dashboard
* On failure → Show error message

---

### Register Page

#### Components:

* Name input
* Email input
* Password input
* Confirm password
* Register button

---

## 4.3.2 Dashboard Page (MOST IMPORTANT)

### Purpose:

Provide a **quick overview of user’s current status**

---

### Layout:

#### Top Section (Summary Cards)

* Steps today
* Water intake
* Sleep hours
* Today's expenses

---

#### Middle Section (Charts)

* Weekly activity chart
* Expense trend chart

---

#### Bottom Section (Insights)

* AI insights / system suggestions

---

### Data Source:

* Aggregated backend APIs

---

## 4.3.3 Daily Log Page

### Purpose:

Input and update daily lifestyle data

---

### Layout:

#### Date Selector

* Select or auto-fill today’s date

---

#### Input Sections:

1. **Activity Section**

   * Steps input
   * Sleep hours input
   * Water intake input

2. **Meals Section**

   * Add/remove meal entries (list input)

3. **Habits Section**

   * List of habits with checkboxes
   * Add new habit option

4. **Mood Section**

   * Dropdown or emoji selector

---

#### Actions:

* Save / Update button

---

### Behavior:

* If log exists → pre-fill data
* Else → create new log

---

## 4.3.4 Analytics Page

### Purpose:

Provide deeper insights into trends

---

### Layout:

#### Filters:

* Date range selector

---

#### Charts:

* Weekly/monthly steps
* Sleep trend
* Habit completion rate
* Expense comparison

---

### Data:

* Fully aggregated backend responses

---

## 4.3.5 Expense Page

### Purpose:

Manage and analyze expenses

---

### Layout:

#### Add Expense Form:

* Amount input
* Category dropdown
* Date picker
* Add button

---

#### Expense List:

* List of expenses
* Edit / Delete buttons

---

#### Summary Section:

* Monthly total
* Category-wise breakdown (chart)

---

## 4.3.6 Journal Page

### Purpose:

Record daily thoughts and reflections

---

### Layout:

#### Entry Form:

* Text area
* Mood selector
* Save button

---

#### History Section:

* List of previous entries
* Edit / Delete options

---

## 4.3.7 Admin Page

### Access:

Admin role only

---

### Layout:

#### Metrics:

* Total users
* Active users

---

#### Charts:

* Average steps across users
* Expense trends
* Habit completion trends

---

---

### 4.4 Component Reusability

Reusable components:

* Card component (dashboard stats)
* Chart component
* Input field component
* Modal (edit forms)
* Table/list component

---

### 4.5 UI State Management

* Use Redux for:

  * User authentication state
  * Dashboard data
  * Analytics data

* Local state for:

  * Forms (daily log, expense, journal)

---

### 4.6 Navigation Flow

1. User logs in
2. Redirect to Dashboard
3. User navigates via sidebar
4. Data fetched via API per page
5. Updates reflect immediately in UI

---

## 5. Data Design and Database Schema (Jagdish)

---

### 5.1 Overview

The system uses **polyglot persistence**, combining:

* **MySQL** → for structured, transactional data
* **MongoDB** → for flexible, semi-structured lifestyle data

This approach ensures:

* Data integrity (financial + user data)
* Flexibility (daily logs and habits)

---

## 5.2 MySQL Database Design

---

### 5.2.1 Users Table

#### Description:

Stores user authentication and profile data

#### Schema:

| Field      | Type                 | Constraints                 |
| ---------- | -------------------- | --------------------------- |
| id         | BIGINT               | Primary Key, Auto Increment |
| name       | VARCHAR(100)         | Not Null                    |
| email      | VARCHAR(150)         | Unique, Not Null            |
| password   | VARCHAR(255)         | Not Null                    |
| age        | INT                  | Nullable                    |
| weight     | FLOAT                | Nullable                    |
| role       | ENUM('USER','ADMIN') | Default 'USER'              |
| created_at | TIMESTAMP            | Default CURRENT_TIMESTAMP   |
| updated_at | TIMESTAMP            | Auto-updated                |

---

### 5.2.2 Expenses Table

#### Description:

Stores all user expense records

#### Schema:

| Field      | Type          | Constraints                 |
| ---------- | ------------- | --------------------------- |
| id         | BIGINT        | Primary Key, Auto Increment |
| user_id    | BIGINT        | Foreign Key → users(id)     |
| amount     | DECIMAL(10,2) | Not Null                    |
| category   | VARCHAR(50)   | Not Null                    |
| date       | DATE          | Not Null                    |
| created_at | TIMESTAMP     | Default CURRENT_TIMESTAMP   |

---

#### Relationships:

* One user → Many expenses
* Foreign key ensures referential integrity

---

## 5.3 MongoDB Database Design

---

### 5.3.1 DailyLogs Collection

#### Description:

Stores all daily lifestyle data in a single document

---

#### Schema:

```json
{
  "_id": ObjectId,
  "userId": "string (reference to MySQL user)",
  "date": "YYYY-MM-DD",

  "steps": Number,
  "waterIntake": Number,
  "sleepHours": Number,

  "meals": ["Breakfast", "Lunch"],

  "habits": [
    {
      "name": "Workout",
      "completed": true
    }
  ],

  "mood": "Happy",

  "createdAt": Date,
  "updatedAt": Date
}
```

---

#### Constraints:

* One document per user per date
* Compound uniqueness:

  * (userId + date)

---

#### Indexing:

* Index on userId
* Index on date

---

### 5.3.2 Journals Collection

#### Description:

Stores user journal entries

---

#### Schema:

```json
{
  "_id": ObjectId,
  "userId": "string",
  "date": "YYYY-MM-DD",
  "content": "text",
  "mood": "string",
  "createdAt": Date
}
```

---

#### Constraints:

* Optional: one journal per day per user

---

#### Indexing:

* Index on userId
* Index on date

---

## 5.4 Data Relationships (Cross-Database)

Since MySQL and MongoDB are separate:

* No direct foreign key constraints between DBs
* Relationship maintained via:

  * `userId`

---

### Example:

* MySQL → user.id = 101
* MongoDB → userId = "101"

---

## 5.5 Data Consistency Strategy

* User data stored in MySQL
* MongoDB references userId
* Backend ensures consistency:

  * No orphan records
  * Validation before insertion

---

## 5.6 Aggregation Strategy

---

### Backend Aggregation Responsibilities:

* Daily → Weekly summaries
* Expense totals
* Habit completion %

---

### MongoDB Aggregation:

* Used for:

  * Activity trends
  * Habit stats

---

### MySQL Aggregation:

* Used for:

  * Expense totals
  * Category breakdown

---

## 5.7 AI Data Preparation

Before sending data to AI:

* Backend aggregates:

  * Weekly averages
  * Behavioral patterns

---

### Example Input to AI:

```json
{
  "avgSleep": 5.5,
  "weeklySpending": 3200,
  "habitCompletion": 60
}
```

---

## 5.8 Data Validation Rules

* No negative values (steps, money, etc.)
* Dates must be valid
* Required fields must not be null

---

## 5.9 Future Scalability Considerations

* MongoDB collections can scale horizontally
* MySQL can be optimized using indexing
* Modular schema supports future feature additions

---

## 6. API Design (Jagdish)

---

### 6.1 Overview

The backend exposes **RESTful APIs** structured around functional modules.

* Base URL: `/api/v1`
* Authentication: JWT (Bearer Token)
* Content-Type: `application/json`

---

### 6.2 Authentication APIs

---

#### 6.2.1 Register User

**POST** `/auth/register`

##### Request Body:

```json
{
  "name": "Jagdish",
  "email": "jagdish@email.com",
  "password": "123456"
}
```

##### Response:

```json
{
  "message": "User registered successfully"
}
```

---

#### 6.2.2 Login User

**POST** `/auth/login`

##### Request:

```json
{
  "email": "jagdish@email.com",
  "password": "123456"
}
```

##### Response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 101,
    "name": "Jagdish",
    "role": "USER"
  }
}
```

---

### 6.3 User Profile APIs

---

#### 6.3.1 Get Profile

**GET** `/users/profile`

##### Headers:

* Authorization: Bearer TOKEN

##### Response:

```json
{
  "name": "Jagdish",
  "age": 23,
  "weight": 50
}
```

---

#### 6.3.2 Update Profile

**PUT** `/users/profile`

##### Request:

```json
{
  "name": "Jagdish",
  "age": 24,
  "weight": 52
}
```

---

### 6.4 Daily Log APIs (Core)

---

#### 6.4.1 Create/Update Daily Log

**POST** `/daily-log`

👉 Upsert behavior

##### Request:

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

---

#### 6.4.2 Get Daily Log by Date

**GET** `/daily-log?date=2026-04-19`

---

#### 6.4.3 Get Logs by Range

**GET** `/daily-log/range?start=2026-04-01&end=2026-04-19`

---

### 6.5 Expense APIs

---

#### 6.5.1 Add Expense

**POST** `/expenses`

```json
{
  "amount": 200,
  "category": "Food",
  "date": "2026-04-19"
}
```

---

#### 6.5.2 Get Expenses

**GET** `/expenses?start=2026-04-01&end=2026-04-30`

---

#### 6.5.3 Update Expense

**PUT** `/expenses/{id}`

---

#### 6.5.4 Delete Expense

**DELETE** `/expenses/{id}`

---

### 6.6 Journal APIs

---

#### 6.6.1 Create Entry

**POST** `/journals`

```json
{
  "date": "2026-04-19",
  "content": "Today was productive",
  "mood": "Happy"
}
```

---

#### 6.6.2 Get Entries

**GET** `/journals`

---

#### 6.6.3 Update Entry

**PUT** `/journals/{id}`

---

#### 6.6.4 Delete Entry

**DELETE** `/journals/{id}`

---

### 6.7 Dashboard APIs

---

#### 6.7.1 Get Dashboard Summary

**GET** `/dashboard`

##### Response:

```json
{
  "steps": 5000,
  "water": 2.5,
  "sleep": 6,
  "expensesToday": 300
}
```

---

#### 6.7.2 Get Analytics Data

**GET** `/analytics?range=weekly`

---

### 6.8 AI APIs

---

#### 6.8.1 Get Insights

**GET** `/ai/insights`

---

#### 6.8.2 Chat with AI

**POST** `/ai/chat`

```json
{
  "question": "Why am I feeling tired?"
}
```

---

### 6.9 Admin APIs

---

#### 6.9.1 Get System Stats

**GET** `/admin/stats`

---

### 6.10 Error Response Format

```json
{
  "timestamp": "2026-04-19T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input data"
}
```

---

### 6.11 API Security

* All APIs (except auth) require JWT
* Role-based access for admin routes

---

## 7. AI System Design (Shaurya)

---

### 7.1 Overview

The AI module enhances the system by providing **data-driven insights and conversational assistance** based on user lifestyle and financial data.

The AI system follows a **hybrid approach**:

* Rule-based analytics (fast, deterministic)
* AI-based inference (context-aware, flexible)

---

### 7.2 AI System Architecture

The AI system is implemented as an **external service** that communicates with the Spring Boot backend.

#### Components:

1. **Backend AI Integration Module (Spring Boot)**

   * Aggregates and preprocesses user data
   * Sends structured input to AI service

2. **AI Service (Python FastAPI)**

   * Handles:

     * Insight generation
     * Natural language queries
     * Embedding and retrieval (optional advanced)

3. **Vector Database**

   * Stores embeddings for semantic search (Phase 2)

---

### 7.3 AI Data Flow

1. User requests insight or asks a question
2. Backend:

   * Fetches user data (MySQL + MongoDB)
   * Aggregates into summarized format
3. Backend sends structured data to AI service
4. AI service processes input and generates response
5. Response returned to frontend

---

### 7.4 Data Preparation Strategy

The backend **does NOT send raw data** to AI.

Instead, it sends **aggregated summaries**.

---

#### Example Input to AI:

```json
{
  "avgSleep": 5.5,
  "avgSteps": 3000,
  "weeklySpending": 3200,
  "habitCompletionRate": 60
}
```

---

### 7.5 Rule-Based Insight Engine (Phase 1)

#### Description:

Simple logic-based system implemented in backend

---

#### Example Rules:

* If `avgSleep < 6` → "You are getting insufficient sleep"
* If `weeklySpending > threshold` → "You are overspending"
* If `habitCompletionRate < 50%` → "Low habit consistency"

---

#### Benefits:

* Fast
* No external dependency
* Always available

---

### 7.6 AI-Based Insight Engine (Phase 2)

#### Description:

Uses LLM to generate personalized insights

---

#### Capabilities:

* Interpret user behavior patterns
* Provide recommendations
* Answer user questions

---

#### Example Queries:

* "Why am I feeling tired?"
* "Where am I spending too much?"
* "How can I improve my routine?"

---

### 7.7 Chatbot System (RAG-Based)

#### Description:

Implements **Retrieval-Augmented Generation**

---

#### Flow:

1. User sends query
2. Backend sends:

   * User summary
   * Query
3. AI service:

   * Retrieves relevant context (optional vector DB)
   * Generates response using LLM

---

### 7.8 AI Service APIs

---

#### 7.8.1 Generate Insights

**POST** `/ai/insights`

```json
{
  "summary": { ... }
}
```

---

#### 7.8.2 Chat API

**POST** `/ai/chat`

```json
{
  "question": "How can I improve my sleep?",
  "context": { ... }
}
```

---

### 7.9 Performance Considerations

* AI calls should be **asynchronous (optional)**
* Cache repeated insights
* Limit frequency of AI calls

---

### 7.10 Failure Handling

* If AI service fails:

  * Fallback to rule-based insights
  * Return default message

---

### 7.11 Security Considerations

* Do not expose raw user data unnecessarily
* Sanitize inputs before sending to AI
* Secure AI endpoints

---

### 7.12 Future Enhancements

* Personalized recommendations using ML models
* Predictive analytics (habit trends)
* Continuous learning from user behavior

---
