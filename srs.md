# AI-Based Lifestyle Intelligence Platform

### Software Requirements Specification (SRS)

---

## 1. Introduction

### 1.1 Purpose

This document defines the requirements, system design, and technology stack for the AI-Based Lifestyle Intelligence Platform. The system aims to track user lifestyle activities and provide actionable insights using analytics and AI.

---

### 1.2 Scope

The application is a web-based platform that enables users to:

* Track daily lifestyle activities (fitness, habits, food, sleep)
* Manage personal expenses
* Maintain journals
* View analytics dashboards
* Receive AI-driven insights

The system also includes an admin panel for monitoring aggregated user behavior.

---

### 1.3 Definitions

* **Daily Log**: A structured record of a user's daily activities
* **AI Insights**: Suggestions generated using rules or machine learning models
* **RAG**: Retrieval-Augmented Generation for AI responses

---

## 2. System Overview

### 2.1 System Architecture

The system follows a microservices-based architecture:

* API Gateway (Spring Boot)
* Lifestyle Service (Node.js)
* AI Service (Python/Node)
* Frontend (React)

---

### 2.2 User Roles

#### 2.2.1 User

* Tracks personal data
* Views analytics
* Interacts with AI

#### 2.2.2 Admin

* Monitors system usage
* Views aggregated insights

---

## 3. Functional Requirements

---

### 3.1 Authentication Module

#### Features:

* User Registration
* User Login (JWT-based)
* Logout
* Password encryption (bcrypt)
* Role-based access (User/Admin)

---

### 3.2 User Profile Module

#### Features:

* Create and update profile
* Fields:

  * Name
  * Age
  * Weight
  * Lifestyle goals (fitness, savings)

---

### 3.3 Daily Log Module (Core System)

#### Description:

A unified structure to store all daily lifestyle activities.

#### Features:

* Add/Edit/Delete daily log
* Fields:

  * Steps count
  * Water intake
  * Sleep hours
  * Meals (array)
  * Habits (dynamic checklist)
  * Mood

---

### 3.4 Expense Management Module

#### Features:

* Add/Edit/Delete expenses
* Fields:

  * Amount
  * Category
  * Date
* Monthly and category-wise aggregation

---

### 3.5 Journal Module

#### Features:

* Daily text entry
* Mood tagging
* Edit/Delete entries
* View history

---

### 3.6 Dashboard Module

#### Features:

##### Daily Dashboard:

* Today's activity summary
* Today's expenses

##### Analytics Dashboard:

* Weekly/monthly trends
* Habit completion rate
* Expense breakdown

---

### 3.7 AI Insight Module

#### Phase 1:

* Rule-based insights:

  * Spending trends
  * Habit consistency

#### Phase 2:

* AI Chatbot:

  * Natural language queries
  * Context-aware responses

---

### 3.8 Admin Module

#### Features:

* View total users
* Active user statistics
* Aggregated lifestyle patterns
* Expense trends

---

## 4. Non-Functional Requirements

### 4.1 Performance

* Dashboard load time < 2 seconds

### 4.2 Security

* JWT authentication
* Password hashing
* Role-based authorization

### 4.3 Scalability

* Modular microservices architecture

### 4.4 Usability

* Responsive UI (mobile + desktop)

### 4.5 Reliability

* System uptime target: 99%

---

## 5. Data Requirements

### 5.1 Relational Data (MySQL)

* Users
* Expenses

### 5.2 NoSQL Data (MongoDB)

* Daily logs
* Journals
* Habits

### 5.3 AI Data

* Embeddings stored in vector database

---

## 6. Technology Stack

### Backend

* Spring Boot (API Gateway, Auth, Expenses)
* Node.js (Lifestyle Service)
* Python FastAPI (AI Service)

### Frontend

* React
* Redux Toolkit
* Tailwind CSS

### Databases

* MySQL
* MongoDB
* Vector DB (FAISS/Pinecone)

---

## 7. System Constraints

* Must include Java and SQL (CDAC requirement)
* Limited development time
* 3-member team

---

## 8. Future Enhancements

* Predictive analytics
* Notifications system
* Mobile app version

---
