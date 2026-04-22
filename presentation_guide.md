# 🎤 Presentation Guide — Phase 1 Evaluation
### AI-Based Lifestyle Intelligence Platform

---

## ⏱️ Time & Slide Overview

| Detail | Value |
|--------|-------|
| Target Duration | **15 minutes** (safe within 12–20 min window) |
| Total Slides | **18 slides** |
| Per Person | **~5 minutes / 6 slides** |
| Pace | ~45–50 seconds per slide |
| Tool | Google Slides / PowerPoint |
| Record Via | Zoom or Google Meet |
| **Deadline** | **Friday, 24th April 2026** |

---

## 👥 Division of Slides

| Member | Slides | Section | Time |
|--------|--------|---------|------|
| **Shaurya** | 1 – 6 | Intro + Problem + Architecture + AI Design | ~5 min |
| **Mahim** | 7 – 12 | Use Case + All UI Screens | ~5 min |
| **Jagdish** | 13 – 18 | Backend + Database + API + Conclusion | ~5 min |

> **Shaurya presents first** (intro + AI), then hands off to Mahim (UI), then Jagdish closes (backend + DB + API).

---

## 🟦 SHAURYA — Slides 1 to 6

---

### Slide 1 — Title Slide
**Content:**
- Title: *AI-Based Lifestyle Intelligence Platform*
- Subtitle: *Phase 1 Evaluation | CDAC*
- Team: Jagdish · Mahim · Shaurya
- Date: April 2026

**Speaker Note:**
> "Good [morning/afternoon]. We're presenting the AI-Based Lifestyle Intelligence Platform — a system that unifies lifestyle tracking, financial management, and AI-powered insights into a single intelligent platform. I'm Shaurya, and I'll be covering the project overview, system architecture, and the AI design."

---

### Slide 2 — The Problem
**Content:**
- Heading: *"Everyone is tracking. Nobody is connecting the dots."*
- 3 bullet points:
  - 😴 People sleep poorly but don't see how it affects their week
  - 💸 People overspend but can't pinpoint why
  - 📉 People start habits and quit — with no understanding of the pattern
- Comparison table:

| Existing Tools | Limitation |
|----------------|------------|
| Fitness apps | Only track steps |
| Expense trackers | Show spending, no insight |
| Habit apps | Just checklists, no intelligence |
| Journaling apps | Isolated, not connected to data |

**Speaker Note:**
> "In today's world, lifestyle, habits, and finances are the three pillars of a healthy and happy life. Yet people are managing each of these in separate, disconnected apps that show data — but offer no real intelligence."

---

### Slide 3 — The Solution
**Content:**
- Heading: *"One platform. Three pillars. AI that connects them."*
- 4 numbered points:
  1. **Collect** — daily logs, expenses, journals, mood in one place
  2. **Connect** — sleep vs. productivity, spending vs. stress
  3. **Explain** — not just charts, but what the data actually means
  4. **Advise** — personalized AI recommendations based on *your* patterns

- Example box:
```
User asks: "Why am I feeling tired?"
AI replies: "Your sleep dropped 15% this week.
             Your water intake averaged 1.8L — below your 2.5L target.
             Both are impacting your energy levels."
```

**Speaker Note:**
> "Our solution is a unified Lifestyle Intelligence Platform. It doesn't just show you data — it tells you what your data means, and what to do about it."

---

### Slide 4 — System Architecture
**Content:**
- Heading: *"Modular Backend + Polyglot Persistence + External AI Service"*
- Architecture diagram (copy from README.md):

```
         ┌──────────────────────┐
         │   Frontend (React)   │
         └──────────┬───────────┘
                    │ REST API
         ┌──────────▼───────────────────────┐
         │     Spring Boot Backend          │
         │  Auth | User | Expense           │
         │  Lifestyle | Journal | Admin     │
         │     AI Integration Module   ─────┼──→ AI Service (FastAPI)
         └──────────────────────────────────┘
              │           │           │
           MySQL       MongoDB    Vector DB
         (Users,Exp) (Logs,Jnl) (Embeddings)
```

**Speaker Note:**
> "The backend is built as a modular monolith using Spring Boot — 7 independent modules with clear boundaries, all in a single deployable unit. We use polyglot persistence: MySQL for structured transactional data, and MongoDB for flexible lifestyle data. The AI service runs separately as a Python FastAPI application."

---

### Slide 5 — AI Design: Phase 1 (Rule-Based Engine)
**Content:**
- Heading: *"Phase 1: Rule-Based Insights — Always Available"*
- How it works:
  - Backend aggregates user data weekly
  - Simple threshold rules fire deterministic insights
- Example rules table:

| Condition | Insight Generated |
|-----------|-------------------|
| `avgSleep < 6 hrs` | "You're getting insufficient sleep" |
| `weeklySpending > budget` | "You're overspending this week" |
| `habitCompletion < 50%` | "Low habit consistency this week" |
| `avgWater < 2.5L` | "Water intake is below target" |

- Footer note: *"No AI service needed. Always on. Zero latency."*

**Speaker Note:**
> "The AI system has three phases. Phase 1 is a rule-based insight engine that runs directly in Spring Boot — no external dependency. It generates deterministic, instant insights based on thresholds. If the AI service is ever down, this always works as a fallback."

---

### Slide 6 — AI Design: Phase 2 + 3 (LLM + RAG Chatbot)
**Content:**
- Heading: *"Phase 2 & 3: LLM Insights + RAG Chatbot"*

Two columns:

**Phase 2 — LLM Insights:**
- Backend sends aggregated summary (not raw data) to FastAPI
- LLM generates personalized, context-aware insights
- Example: Instead of "sleep < 6 hrs" → *"Your sleep has been declining since Tuesday — your late-night sessions are showing up in your mood data."*

**Phase 3 — RAG Chatbot:**
- User asks a natural language question
- Backend sends user summary + question to AI service
- AI retrieves relevant context → LLM generates response

- RAG flow diagram:
```
User Question
     ↓
Backend: Fetch + Aggregate user data
     ↓
AI Service: Retrieve context (Vector DB) → Generate response (LLM)
     ↓
Personalized Answer
```

**Speaker Note:**
> "Phase 2 upgrades insights using an LLM — the backend sends only aggregated summaries to the AI service, never raw data. Phase 3 adds a RAG-powered chatbot, where users can ask natural language questions about their lifestyle. The AI retrieves relevant context and generates specific, actionable answers."

---

## 🟩 MAHIM — Slides 7 to 12

---

### Slide 7 — Use Case Diagram
**Content:**
- Heading: *"Use Case Diagram — Actors and Interactions"*
- Two actors: **User** and **Admin**
- Use case diagram (draw this in draw.io or PowerPoint shapes):

```
              ┌─────────────────────────────────────────────┐
              │            Lifestyle Platform               │
              │                                             │
  ┌──────┐    │  ○ Register / Login                         │
  │      │───▶│  ○ View Dashboard                           │
  │ User │    │  ○ Log Daily Activity (steps, sleep, water) │
  │      │───▶│  ○ Track Habits                             │
  └──────┘    │  ○ Log Expenses                             │
              │  ○ Write Journal Entry                       │
              │  ○ View Analytics                            │
              │  ○ Get AI Insights                          │
              │  ○ Chat with AI                             │
              │                                             │
  ┌───────┐   │  ○ View System Statistics                   │
  │ Admin │──▶│  ○ Monitor Active Users                     │
  └───────┘   │  ○ View Aggregated Trends                   │
              │                                             │
              └─────────────────────────────────────────────┘
```

**Speaker Note:**
> "There are two actors in the system — the regular User and the Admin. Users can log daily activities, track habits, manage expenses, write journal entries, view analytics, and interact with the AI chatbot. Admins have read-only access to system-level statistics."

---

### Slide 8 — UI: Authentication Pages
**Content:**
- Heading: *"Authentication — Login & Register"*
- Side-by-side screenshots/wireframes of Login and Register pages
- Key components:
  - Login: Email + Password + Login button + "Register" link
  - Register: Name + Email + Password + Confirm Password + Register button
- Behavior note: On success → redirect to Dashboard. On failure → show error.

**Speaker Note:**
> "The authentication flow is straightforward. Users register with name, email, and password. On login, the backend issues a JWT token which is attached to every subsequent API request for authorization."

---

### Slide 9 — UI: Dashboard (Most Important)
**Content:**
- Heading: *"Dashboard — Your Daily Intelligence Hub"*
- Full wireframe / screenshot of dashboard layout:
  - **Top:** 4 summary cards (Steps, Water, Sleep, Expenses)
  - **Middle:** Weekly Activity Chart (bar) + Expense Trend Chart (line)
  - **Bottom:** AI Insights section
- Point out the sidebar navigation

**Speaker Note:**
> "The dashboard is the heart of the platform. At a glance, users see today's key metrics — steps, sleep, water, and spending. Below that, charts show weekly trends. The bottom section displays AI-generated insights specific to that user's data patterns."

---

### Slide 10 — UI: Daily Log Page
**Content:**
- Heading: *"Daily Log — Tracking Your Day"*
- Wireframe of the Daily Log page with sections labeled:
  - Date selector (with prev/next navigation)
  - Activity section (steps, sleep, water inputs)
  - Meals section (add/remove meal entries)
  - Habits section (checkboxes + add new habit)
  - Mood section (emoji dropdown)
  - Save / Update button
- Key behavior: If log exists for date → pre-fill. Else → create new.

**Speaker Note:**
> "The Daily Log page is where users input their day's data. It's designed as a single-page form with four sections — activity, meals, habits, and mood. The system uses an upsert strategy: only one log allowed per user per date."

---

### Slide 11 — UI: Analytics + Expense Pages
**Content:**
- Two wireframes side by side:

**Analytics Page:**
- Date range filter
- Steps chart (bar)
- Sleep trend (line)
- Habit completion rate (pie)
- Expense comparison (bar)

**Expense Page:**
- Add expense form (amount, category, date)
- Expense list with Edit/Delete
- Monthly total + Category pie chart

**Speaker Note:**
> "The Analytics page gives users a deeper look at their trends over time — weekly or monthly. The Expense page handles financial tracking: users can add, edit, and delete expenses, and see a category-wise breakdown of their spending."

---

### Slide 12 — UI: Journal + Admin Pages
**Content:**
- Two wireframes side by side:

**Journal Page:**
- Text area for entry
- Mood selector dropdown
- Save button
- History list with edit/delete

**Admin Page:**
- Total Users + Active Users metric cards
- Avg Steps across users (chart)
- System-wide Expense Trends (chart)
- Habit Completion Trends (chart)
- Note: *Admin has read-only access*

**Speaker Note:**
> "The Journal page allows users to record daily thoughts and mood — these qualitative entries are also fed into the AI context for more nuanced insights. The Admin page is role-restricted and shows system-level aggregated data — no personal user data is exposed."

---

## 🟥 JAGDISH — Slides 13 to 18

---

### Slide 13 — Tech Stack
**Content:**
- Heading: *"Tech Stack — Every Choice Has a Reason"*

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + Redux | Component-based, state management |
| Backend | Java + Spring Boot | Modular monolith, CDAC-aligned |
| Relational DB | MySQL | Structured data, ACID compliance |
| NoSQL DB | MongoDB | Flexible schema for lifestyle data |
| AI Service | Python FastAPI | LLM ecosystem, lightweight |
| Auth | JWT | Stateless, scalable token auth |
| Deployment | Docker + Vercel | Container isolation, easy hosting |

**Speaker Note:**
> "Every technology was chosen deliberately. Spring Boot for the modular backend — we needed clear separation without microservice overhead. Polyglot persistence because user data and lifestyle data have fundamentally different storage needs. FastAPI for the AI service because Python has the best LLM tooling."

---

### Slide 14 — Backend Architecture
**Content:**
- Heading: *"Backend — 7 Modules, One Deployable Unit"*
- Module diagram:

```
Spring Boot Application
├── 🔐 Auth Module       → JWT, registration, login, roles
├── 👤 User Module       → Profile management
├── 💰 Expense Module    → CRUD + analytics (MySQL)
├── 📝 Lifestyle Module  → Daily log upsert (MongoDB)
├── 📓 Journal Module    → Entry CRUD (MongoDB)
├── 🤖 AI Integration    → Data aggregation + AI service client
└── 🛡️ Admin Module     → System stats (read-only)
```

- Key principle callout box: *"Modular Monolith: Single deployable unit. Each module has clear boundaries and owns its domain."*

**Speaker Note:**
> "The backend is organized as a modular monolith — seven independent modules in a single Spring Boot application. Each module owns its domain: the Lifestyle module handles MongoDB, the Expense module owns MySQL, and the AI Integration module is the bridge between backend data and the external AI service."

---

### Slide 15 — Database Design
**Content:**
- Heading: *"Polyglot Persistence — Right DB for Right Data"*

Two columns:

**MySQL (Relational)**
```
users table
├── id, name, email, password
├── age, weight, role
└── created_at, updated_at

expenses table
├── id, user_id (FK)
├── amount, category, date
└── created_at
```

**MongoDB (NoSQL)**
```json
DailyLogs collection
{
  "userId": "101",
  "date": "2026-04-19",
  "steps": 5000,
  "sleepHours": 6,
  "waterIntake": 2.5,
  "meals": ["Breakfast", "Lunch"],
  "habits": [{ "name": "Workout", "completed": true }],
  "mood": "Happy"
}
```

**Speaker Note:**
> "We use two databases for different reasons. MySQL stores structured, transactional data — users and expenses — where referential integrity and ACID compliance matter. MongoDB stores daily logs and journals — semi-structured data where the schema needs to be flexible as habits and meals vary day to day."

---

### Slide 16 — API Design
**Content:**
- Heading: *"REST API — 8 Module Groups, JWT Protected"*
- API overview table:

| Module | Key Endpoints |
|--------|--------------|
| Auth | `POST /auth/register` `POST /auth/login` |
| User | `GET /users/profile` `PUT /users/profile` |
| Daily Log | `POST /daily-log` (upsert) `GET /daily-log?date=` |
| Expense | `POST /expenses` `GET /expenses?range=` `PUT/DELETE /expenses/{id}` |
| Journal | `POST /journals` `GET /journals` `PUT/DELETE /journals/{id}` |
| Dashboard | `GET /dashboard` `GET /analytics?range=weekly` |
| AI | `GET /ai/insights` `POST /ai/chat` |
| Admin | `GET /admin/stats` |

- Footer: *"All endpoints (except /auth) require: `Authorization: Bearer <JWT_TOKEN>`"*

**Speaker Note:**
> "The API follows REST principles with JWT-based authentication on all endpoints except registration and login. The daily log uses an upsert pattern — one log per user per date, create or update. The AI endpoints are the bridge to the external FastAPI service."

---

### Slide 17 — Data Flow (End to End)
**Content:**
- Heading: *"End-to-End Data Flow — How It All Connects"*
- Flow diagram:

```
1. User logs in  →  JWT token issued
        ↓
2. User logs daily data (steps, sleep, water, meals, habits)
   →  Stored in MongoDB (DailyLogs)
        ↓
3. User adds expense
   →  Stored in MySQL (Expenses)
        ↓
4. Dashboard loads
   →  Backend aggregates MongoDB + MySQL data
   →  Frontend renders charts + summary cards
        ↓
5. AI Insights requested
   →  Backend computes weekly averages
   →  Sends compact summary to AI Service (FastAPI)
   →  Rule engine + LLM generate insights
   →  Insights displayed on dashboard
        ↓
6. User chats with AI
   →  Question + context sent to AI Service
   →  RAG pipeline retrieves + generates response
   →  Answer shown in chat panel
```

**Speaker Note:**
> "This is the complete data flow for a typical user session. Notice that the AI service never touches the databases directly — the backend always aggregates first and sends only summarized, anonymized data. This is a deliberate security and design decision."

---

### Slide 18 — Conclusion + Next Steps
**Content:**
- Heading: *"Where We Are + Where We're Going"*

**✅ Completed (Phase 1):**
- Full SRS documentation
- System architecture design
- Database schema design (MySQL + MongoDB)
- Complete REST API specification
- AI system design (Rule-based + LLM + RAG)
- UI wireframes for all 7 pages
- Working dashboard prototype (D3.js)

**⏳ Next Steps:**
- Phase 2: Database implementation (SQL scripts)
- Phase 3: Spring Boot backend modules
- Phase 4: React frontend (all pages)
- Phase 5: AI service (FastAPI + LLM integration)
- Phase 6: Testing + Deployment

- Closing quote: *"The tracking is the input. The intelligence is the product."*

**Speaker Note:**
> "To summarize — we've completed the full design phase: architecture, database design, API contracts, AI system design, and UI wireframes. The dashboard prototype is already running. Implementation begins now, starting with the database layer. Thank you."

---

## 🎨 Slide Design Tips

- **Theme:** Dark background (navy/dark blue) with white text — matches the dashboard prototype style
- **Font:** Inter or Roboto (clean, modern)
- **Accent colors:** Use the same palette as the prototype:
  - Steps: `#4fc3f7` (blue)
  - Expenses: `#66bb6a` (green)
  - Sleep: `#ab47bc` (purple)
  - Water: `#29b6f6` (light blue)
- **Diagrams:** Use simple boxes and arrows — don't overthink. ASCII-style works fine for technical slides.
- **Slide structure:** Heading → Visual/Diagram → 2-3 bullet points (max). Don't crowd text.
- **Use Case Diagram:** Draw in draw.io (free) or use PowerPoint shapes

---

## 📋 Recording Checklist

- [ ] All 3 members join the Zoom/Meet call
- [ ] Screen share the PPT (one person shares, others speak on their turn)
- [ ] Speak at a steady pace — 18 slides × ~50 sec = ~15 minutes
- [ ] Each person introduces themselves before their section
- [ ] Record the full session
- [ ] Check audio quality before starting
- [ ] Submit before Friday 24th April 2026 EOD

---

## 🗣️ Speaking Script Template (per person)

**Shaurya (opens):**
> "Hi, I'm Shaurya. I'll be covering the project overview, system architecture, and the AI system design."
> *[presents slides 1-6]*
> "With that, I'll hand over to Mahim who will walk us through the user interface design."

**Mahim:**
> "Thank you Shaurya. I'm Mahim, and I'll be presenting the use case diagram and UI design for each user role."
> *[presents slides 7-12]*
> "Now I'll hand over to Jagdish for the backend architecture, database, and API design."

**Jagdish:**
> "Thank you Mahim. I'm Jagdish, and I'll cover the tech stack, backend modules, database design, and API layer."
> *[presents slides 13-18]*
> "That concludes our Phase 1 presentation. We're happy to take any questions."
