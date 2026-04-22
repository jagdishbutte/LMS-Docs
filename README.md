# ⚡ AI-Based Lifestyle Intelligence Platform

### Because living well isn't just about working hard — it's about knowing yourself.

---

## The Problem

In today's world, for someone to live a healthy and fulfilling life, **three pillars are non-negotiable: lifestyle, habits, and finances.**

Yet most people are failing at all three — not because they don't care, but because **they have no visibility.**

- They sleep poorly but don't connect it to their productivity crash on Thursdays.
- They overspend every month but can't pinpoint where the money went.
- They start habits and abandon them within two weeks — without knowing why.

The existing tools don't help:

| Tool | Problem |
|------|---------|
| Fitness apps | Track steps. That's it. |
| Expense trackers | Show you what you spent. No insight on why. |
| Habit apps | Just a checklist. No intelligence. |
| Journaling apps | Isolated. No connection to your actual data. |

**Everyone is tracking in silos. Nobody is connecting the dots.**

There is no single platform that looks at your sleep, your spending, your habits, and your mood — and tells you what it actually means.

---

## The Solution

> *"In today's world, lifestyle, habits and finances are the three pillars of a healthy, happy life. We built one platform to manage all three — intelligently."*

**The AI-Based Lifestyle Intelligence Platform** is a unified system that:

1. **Collects** everything in one place — daily logs, expenses, journals, mood
2. **Connects** the dots across domains — sleep vs. productivity, spending vs. stress
3. **Explains** what your data means — not just charts, but actual insights
4. **Advises** through an AI coach that knows *your* patterns, not generic tips

---

## Why This Is Different

| Traditional Apps | Our Platform |
|-----------------|--------------|
| Separate apps for each domain | Everything in one unified system |
| You look at data | We tell you what the data means |
| Static charts | Dynamic AI-powered insights |
| Generic tips ("drink more water") | Personalized recommendations ("your water intake dropped 20% on days you skip breakfast") |
| No memory of your patterns | Learns and adapts over time |

---

## What It Does

Imagine logging your day and getting this:

```
Dashboard:  Steps: 8,432 | Sleep: 7.5 hrs | Water: 2.5L | Spent: ₹450
AI Insight: "You slept 1hr less than your weekly average. Consider winding down earlier."
Chatbot:    "Why am I feeling tired?"
            → "Your sleep dropped 15% this week. On top of that, your water intake
               averaged 1.8L — below your 2.5L target. Both are affecting your energy."
```

Behind that simple experience, a full **platform pipeline** runs:

```
Your daily input
     ↓
📝 Daily Log Module     →  steps, sleep, water, meals, habits → stored
     ↓
💰 Expense Module       →  spending tracked by category → analyzed
     ↓
📊 Analytics Engine     →  weekly trends, habit completion rates → computed
     ↓
🤖 AI Insight Engine    →  rule-based + LLM-powered recommendations → generated
     ↓
📈 Dashboard            →  everything visualized, in real-time
```

**The tracking is the input. The intelligence is the product.**

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
