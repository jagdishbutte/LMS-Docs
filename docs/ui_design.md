# 🎨 UI Design Specification

### Owner: Mahim
### Status: 📋 Scaffolding — To be filled by Mahim

---

## Overview

> This document should detail the frontend implementation plan, component library, and page-by-page design decisions.

**Reference documents:**
- [UI Wireframes (UI.md)](../UI.md) — ASCII wireframes for all 7 pages
- [SRS §4 — User Interface Design](../srs.md) — Functional UI requirements
- [Dashboard Prototype](../activity-tracker/) — Working D3.js dashboard

---

## TODO: Design System

<!-- Mahim: Define your design tokens here -->
- [ ] Color palette
- [ ] Typography (fonts, sizes, weights)
- [ ] Spacing scale
- [ ] Component styles (buttons, inputs, cards, modals)
- [ ] Dark/light mode decision

---

## TODO: Component Library

<!-- Mahim: List reusable React components -->

| Component | Used In | Props | Status |
|-----------|---------|-------|--------|
| Card | Dashboard, Analytics | title, value, icon, change | ⬜ |
| Chart | Dashboard, Analytics, Expenses | type, data, labels | ⬜ |
| InputField | Daily Log, Expenses, Journal | label, type, value, onChange | ⬜ |
| Modal | Edit forms | isOpen, onClose, children | ⬜ |
| Table | Expenses, Journal history | columns, data, actions | ⬜ |
| Sidebar | Layout (all pages) | navItems, activeItem | ⬜ |
| Navbar | Layout (all pages) | user, onLogout | ⬜ |

---

## TODO: Page Breakdown

<!-- Mahim: Add implementation details per page -->

### Authentication Pages
- Login Page — *See [UI.md](../UI.md) §1*
- Register Page — *See [UI.md](../UI.md) §1*

### Dashboard Page
- *See [UI.md](../UI.md) §2*
- Existing prototype: `activity-tracker/`

### Daily Log Page
- *See [UI.md](../UI.md) §3*

### Analytics Page
- *See [UI.md](../UI.md) §4*

### Expenses Page
- *See [UI.md](../UI.md) §5*

### Journal Page
- *See [UI.md](../UI.md) §6*

### Admin Page
- *See [UI.md](../UI.md) §7*

---

## TODO: State Management (Redux)

<!-- Mahim: Define Redux store structure -->

```
store/
├── authSlice        →  user, token, isAuthenticated
├── dashboardSlice   →  summary cards, chart data
├── dailyLogSlice    →  current log, form state
├── expenseSlice     →  expenses list, filters
├── journalSlice     →  entries list, current entry
├── analyticsSlice   →  chart data, date range
└── adminSlice       →  system metrics (admin only)
```

---

## TODO: Routing

| Route | Page | Auth Required | Role |
|-------|------|---------------|------|
| `/login` | Login | No | — |
| `/register` | Register | No | — |
| `/dashboard` | Dashboard | Yes | USER |
| `/daily-log` | Daily Log | Yes | USER |
| `/analytics` | Analytics | Yes | USER |
| `/expenses` | Expenses | Yes | USER |
| `/journal` | Journal | Yes | USER |
| `/admin` | Admin | Yes | ADMIN |

---

## TODO: API Integration

<!-- Mahim: Document how frontend connects to backend -->
- [ ] Axios instance with base URL config
- [ ] JWT interceptor (attach token to every request)
- [ ] 401 handler (redirect to login)
- [ ] Error handling patterns

---

*This document is a scaffolding template. Mahim should fill in implementation details as the frontend is built.*
