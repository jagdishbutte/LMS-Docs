# ⚡ AI-Based Lifestyle Intelligence Platform

### A data-driven lifestyle management system that tracks, analyzes, and learns from your daily habits.

> Not a to-do app. Not a fitness tracker. A **lifestyle intelligence engine** with AI-powered insights.

---

## What Is This?

Imagine logging your day — steps, sleep, water, meals, expenses, mood — and getting this:

```
Dashboard:  Steps: 8,432 | Sleep: 7.5 hrs | Water: 2.5L | Spent: ₹450
AI Insight: "You slept 1hr less than your weekly average. Consider winding down earlier."
Chatbot:    "Why am I feeling tired?" → "Based on your data, your sleep dropped 15% this week..."
```

Behind that simple experience, a full **platform pipeline** runs:

```
Your daily input
     ↓
📝 Daily Log Module     →  steps, sleep, water, meals, habits → MongoDB
     ↓
💰 Expense Module       →  spending categorized → MySQL
     ↓
📊 Analytics Engine     →  weekly trends, habit completion rates
     ↓
🤖 AI Insight Engine    →  rule-based + LLM-powered recommendations
     ↓
📈 Dashboard            →  everything visualized in real-time
```

**The tracking is just the input. The intelligence is the product.**

---

## System Architecture

```
                    ┌────────────────────────────┐
                    │     Frontend (React)        │
                    │  Dashboard + Daily Log +    │
                    │  Analytics + Chat           │
                    └────────────┬───────────────┘
                                 │ REST API
                                 ▼
            ┌──────────────────────────────────────┐
            │       Spring Boot Backend            │
            │   (Modular Monolith Architecture)    │
            │                                      │
            │  ┌────────────┐   ┌──────────────┐   │
            │  │ Auth       │   │ User         │   │
            │  └────────────┘   └──────────────┘   │
            │  ┌────────────┐   ┌──────────────┐   │
            │  │ Expense    │   │ Lifestyle    │   │
            │  └────────────┘   └──────────────┘   │
            │  ┌────────────┐   ┌──────────────┐   │
            │  │ Journal    │   │ Admin        │   │
            │  └────────────┘   └──────────────┘   │
            │       ┌────────────────────┐         │
            │       │ AI Integration     │─────────┼──────┐
            │       └────────────────────┘         │      │
            └──────────┬───────────────────────────┘      │
                       │                                   │
         ┌─────────────┼──────────────┐                   │
         ▼             ▼              ▼                   ▼
  ┌────────────┐ ┌──────────┐ ┌──────────────┐  ┌──────────────┐
  │   MySQL    │ │ MongoDB  │ │  Vector DB   │  │  AI Service  │
  │(Users,Exp) │ │(Logs,Jnl)│ │ (Embeddings) │  │  (FastAPI)   │
  └────────────┘ └──────────┘ └──────────────┘  └──────────────┘
```

---

## Tech Stack

```
Frontend  →  React + Redux (dashboard + forms + chat)
Backend   →  Java + Spring Boot (modular monolith)
Database  →  MySQL (structured) + MongoDB (flexible)
AI        →  Python FastAPI + LLM + RAG pipeline
```

---

## Team

| Member    | Responsibility                          |
|-----------|-----------------------------------------|
| Jagdish   | Data Design, API Design, AI Integration |
| Mahim     | UI/UX Design, Frontend Implementation   |
| Shaurya   | AI System Design, LLM + RAG Pipeline    |

---

## Documentation

| Document                                         | Description                              |
|--------------------------------------------------|------------------------------------------|
| [SRS](srs.md)                                    | Full Software Requirements Specification |
| [Project Roadmap](PROJECT_ROADMAP.md)            | Build phases, timeline, deliverables     |
| [Database Design](database_design.md)            | MySQL + MongoDB schema design            |
| [API Reference](api_reference.md)                | REST API documentation                   |
| [AI System Design](ai_system_design.md)          | Rule engine + LLM + RAG architecture     |
| [UI Wireframes](UI.md)                           | ASCII wireframes for all pages           |
| [UI Design Spec](docs/ui_design.md)              | Frontend component & page specifications |

---

## Project Status

- [x] SRS Document — Complete
- [x] UI Wireframes — Complete
- [x] Dashboard Prototype — Complete (activity-tracker/)
- [ ] Database Implementation
- [ ] Backend Modules
- [ ] Frontend Pages
- [ ] AI Service
- [ ] Deployment

---

📄 *See `PROJECT_ROADMAP.md` for the full build plan and `srs.md` for the formal specification.*
