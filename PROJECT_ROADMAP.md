# 🗺️ Project Roadmap — AI-Based Lifestyle Intelligence Platform

> **TL;DR:** We're building a lifestyle tracking platform with AI-powered insights. The system tracks daily activities, expenses, and mood — then generates actionable recommendations using rule-based logic and LLM-powered analysis.

---

## 🎯 The Pitch

> *"We built a data-driven lifestyle intelligence platform that combines polyglot persistence (MySQL + MongoDB), modular backend architecture, and a hybrid AI system with rule-based analytics and RAG-powered chatbot — all visualized through a real-time React dashboard."*

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           React + Redux Frontend                │
│   📊 Dashboard  +      Daily Log  +  🤖 Chat   │
└──────────────┬──────────────────────────────────┘
               │ REST API (JWT Protected)
┌──────────────▼──────────────────────────────────┐
│         Spring Boot Backend                     │
│         (Modular Monolith)                      │
│                                                 │
│   🔐 Auth  →  👤 User  →  💰 Expense           │
│   📝 Lifestyle  →  📓 Journal  →  🛡️ Admin     │
│                                                 │
│            🤖 AI Integration Module             │
└──────────┬─────────────────┬────────────────────┘
           │                 │
    ┌──────▼──────┐   ┌──────▼──────────┐
    │   MySQL     │   │  MongoDB        │
    │  (Users,    │   │  (DailyLogs,    │
    │   Expenses) │   │   Journals)     │
    └─────────────┘   └─────────────────┘
               ↕
        ┌──────────────────┐
        │  🤖 AI Service   │
        │  Python FastAPI  │
        │  + Vector DB     │
        └──────────────────┘
```

---

## 👥 Team Ownership

| Member    | Owns                                    | Builds                                     |
|-----------|-----------------------------------------|--------------------------------------------|
| **Jagdish** | Data Design, API Design, AI Integration | Database schemas, REST APIs, AI pipeline  |
| **Mahim**   | UI/UX Design, Frontend                  | React pages, dashboard, components        |
| **Shaurya** | AI System Design                        | FastAPI service, LLM integration, RAG     |

---

## 🧱 BUILD PHASES

### Each phase is independently testable and produces working deliverables.

---

### 🧱 PHASE 1 — Database Layer 🗃️
**Owner:** Jagdish
**Status:** 📋 Designed → see [database_design.md](database_design.md)

**What gets built:**
- MySQL schema (Users + Expenses tables with constraints, indexes)
- MongoDB collection design (DailyLogs + Journals)
- Seed data for testing
- Aggregation queries

**Deliverables:**
- [ ] MySQL DDL scripts (CREATE TABLE, constraints, indexes)
- [ ] MongoDB collection schemas
- [ ] Seed data scripts
- [ ] Aggregation / analytics queries
- [ ] ER diagram

> 📄 Full schema spec: [database_design.md](database_design.md)

---

### 🧱 PHASE 2 — Backend Modules (Spring Boot) 🚀
**Owner:** Jagdish (API design) + Team (implementation)
**Status:** 📋 Designed → see [api_reference.md](api_reference.md)

**What gets built:**
- Auth Module (JWT registration, login, role-based access)
- User Module (profile CRUD)
- Expense Module (expense CRUD + analytics)
- Lifestyle Module (daily log upsert + date range queries)
- Journal Module (entry CRUD + mood tracking)
- Dashboard Module (aggregated summary APIs)
- Admin Module (system-level read-only analytics)

**Deliverables:**
- [ ] Spring Boot project with module package structure
- [ ] REST controllers for all modules
- [ ] Spring Data JPA entities (MySQL)
- [ ] MongoDB repositories (DailyLogs, Journals)
- [ ] JWT authentication + Spring Security
- [ ] Global error handling
- [ ] API testing via Postman

> 📄 Full API spec: [api_reference.md](api_reference.md)

---

### 🧱 PHASE 3 — Frontend (React) ⚛️
**Owner:** Mahim
**Status:** 📋 Wireframed (UI.md) + Dashboard prototype built

**What gets built:**
- Login / Register pages
- Dashboard page (summary cards + charts + insights)
- Daily Log page (activity, meals, habits, mood input)
- Analytics page (date range charts + trends)
- Expense page (add/edit/delete + category breakdown)
- Journal page (text entry + mood + history)
- Admin page (system metrics + global charts)
- Shared layout (sidebar + navbar)

**Deliverables:**
- [ ] React app with routing
- [ ] Redux store for auth + dashboard state
- [ ] All 7 pages implemented
- [ ] Reusable components (Card, Chart, Input, Modal, Table)
- [ ] Axios integration with backend APIs
- [ ] Responsive design

> 📄 Wireframes: [UI.md](UI.md)
> 📄 Design spec: [docs/ui_design.md](docs/ui_design.md)

---

### 🧱 PHASE 4 — AI Integration 🤖
**Owner:** Jagdish + Shaurya
**Status:** 📋 Designed → see [ai_system_design.md](ai_system_design.md)

**What gets built:**

#### Phase 4a — Rule-Based Insights (Backend)
- Simple deterministic rules in Spring Boot:
  - `avgSleep < 6` → "Insufficient sleep"
  - `weeklySpending > threshold` → "Overspending"
  - `habitCompletionRate < 50%` → "Low consistency"
- No external AI dependency
- Always available, fast, deterministic

#### Phase 4b — AI-Based Insights (FastAPI Service)
- Python FastAPI service
- LLM-powered personalized insights
- Backend aggregates data → sends summary → AI responds

#### Phase 4c — RAG Chatbot
- User asks natural language questions
- Backend sends user context + query to AI service
- AI retrieves relevant data (optional vector DB)
- LLM generates contextual response

**Deliverables:**
- [ ] Rule-based insight engine (Spring Boot)
- [ ] FastAPI AI service
- [ ] `/ai/insights` endpoint
- [ ] `/ai/chat` endpoint
- [ ] Fallback to rules if AI fails
- [ ] Data aggregation pipeline (backend → AI)

> 📄 Full AI spec: [ai_system_design.md](ai_system_design.md)

---

### 🧱 PHASE 5 — Polish & Deployment 🚢
**Owner:** All
**Status:** ⏳ Future

**What gets done:**
- [ ] Admin module final implementation
- [ ] End-to-end testing
- [ ] Docker containerization
- [ ] Frontend → Vercel/Netlify
- [ ] Backend → Render/AWS
- [ ] Databases → MongoDB Atlas + MySQL Cloud
- [ ] AI Service → Separate deployment

---

## ✅ What's Done

- [x] SRS Document (1686 lines, all modules specified)
- [x] UI Wireframes (all 7 pages)
- [x] Dashboard Prototype (activity-tracker/ with D3.js)
- [x] Database schema design (MySQL + MongoDB)
- [x] API design (all endpoints specified)
- [x] AI system design (rule-based + LLM + RAG)

## ⏳ What's Next

- [ ] **Phase 1: Database scripts** ← START HERE
- [ ] Phase 2: Spring Boot backend
- [ ] Phase 3: React frontend
- [ ] Phase 4: AI service
- [ ] Phase 5: Deployment

---

*Last updated: April 22, 2026*
*Status: Starting.*
