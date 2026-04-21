
### 1. Authentication Pages

**Login Page**
```text
+-----------------------------------------------------------------+
|                                                                 |
|                         [Logo] AppName                          |
|                                                                 |
|                         +-------------------+                   |
|                         | Email             |                   |
|                         +-------------------+                   |
|                         +-------------------+                   |
|                         | Password          |                   |
|                         +-------------------+                   |
|                                                                 |
|                         [     LOGIN     ]                       |
|                                                                 |
|                    Don't have an account? Register              |
|                                                                 |
+-----------------------------------------------------------------+
```

**Register Page**
```text
+-----------------------------------------------------------------+
|                                                                 |
|                         [Logo] AppName                          |
|                                                                 |
|                         +-------------------+                   |
|                         | Name              |                   |
|                         +-------------------+                   |
|                         | Email             |                   |
|                         +-------------------+                   |
|                         | Password          |                   |
|                         +-------------------+                   |
|                         | Confirm Password  |                   |
|                         +-------------------+                   |
|                                                                 |
|                         [    REGISTER   ]                       |
|                                                                 |
|                     Already have an account? Login              |
|                                                                 |
+-----------------------------------------------------------------+
```

---

### 2. Dashboard Page (MOST IMPORTANT)
*This layout establishes the responsive Sidebar Navigation and Top Navbar used for all authenticated pages.*

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  DASHBOARD                                     |
|                |                                                |
| > Dashboard    |  +---------+ +---------+ +---------+ +-------+ |
| - Daily Log    |  | Steps   | | Water   | | Sleep   | | Exp.  | |
| - Analytics    |  | 8,432   | | 2.5 L   | | 7.5 hrs | | $45   | |
| - Expenses     |  +---------+ +---------+ +---------+ +-------+ |
| - Journal      |                                                |
| - Admin        |  [====== Weekly Activity Chart (Bar) ======]   |
|                |                                                |
|                |  [======== Expense Trend Chart (Line) =====]   |
|                |                                                |
|                |  AI INSIGHTS / SYSTEM SUGGESTIONS:             |
|                |  * You slept 1 hr less than your weekly avg.   |
|                |  * Spending is down 15% this week! Keep it up. |
+----------------+------------------------------------------------+
```

---

### 3. Daily Log Page

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  DAILY LOG                                     |
|                |                                                |
| - Dashboard    |  Date: [ < ] [ Today: Oct 24, 2023 ] [ > ]     |
| > Daily Log    |                                                |
| - Analytics    |  ACTIVITY:                                     |
| - Expenses     |  Steps: [       ]       Sleep (h): [       ]   |
| - Journal      |  Water: [       ]                              |
| - Admin        |                                                |
|                |  MEALS:                                        |
|                |  - [ Breakfast: Oatmeal        ] (x)           |
|                |  - [ Lunch: Salad              ] (x)           |
|                |  [ + Add Meal ]                                |
|                |                                                |
|                |  HABITS:                                       |
|                |  [x] Read 10 Pages      [ ] 30 Min Workout     |
|                |  [ + Add Habit ]                               |
|                |                                                |
|                |  MOOD: [ Happy (Emoji Dropdown) v ]            |
|                |                                                |
|                |  [         SAVE / UPDATE LOG          ]        |
+----------------+------------------------------------------------+
```

---

### 4. Analytics Page

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  ANALYTICS                                     |
|                |                                                |
| - Dashboard    |  Filters: Date Range [ Last 30 Days v ]        |
| - Daily Log    |                                                |
| > Analytics    |  [======= Weekly/Monthly Steps Chart ======]   |
| - Expenses     |                                                |
| - Journal      |  +--------------------+ +--------------------+ |
| - Admin        |  | Sleep Trend Chart  | | Habit % Completion | |
|                |  |       (Line)       | |       (Pie)        | |
|                |  +--------------------+ +--------------------+ |
|                |                                                |
|                |  [====== Expense Comparison Chart (Bar) ===]   |
+----------------+------------------------------------------------+
```

---

### 5. Expenses Page

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  EXPENSES                                      |
|                |                                                |
| - Dashboard    |  ADD EXPENSE:                                  |
| - Daily Log    |  $[ Amount ] [ Category v ] [ Date v ] [ Add ] |
| - Analytics    |                                                |
| > Expenses     |  EXPENSE LIST:                                 |
| - Journal      |  Oct 24 | Groceries   | $45.00   [Edit] [Del]  |
| - Admin        |  Oct 23 | Transport   | $12.50   [Edit] [Del]  |
|                |  Oct 21 | Dining      | $30.00   [Edit] [Del]  |
|                |                                                |
|                |  SUMMARY (Current Month):                      |
|                |  Total Expenses: $87.50                        |
|                |  [===== Category Breakdown Chart (Pie) ====]   |
+----------------+------------------------------------------------+
```

---

### 6. Journal Page

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  JOURNAL                                       |
|                |                                                |
| - Dashboard    |  NEW ENTRY:                                    |
| - Daily Log    |  +-----------------------------------------+   |
| - Analytics    |  | Record your thoughts and reflections... |   |
| - Expenses     |  |                                         |   |
| > Journal      |  +-----------------------------------------+   |
| - Admin        |  Mood: [ Grateful v ]       [ SAVE ENTRY ]     |
|                |                                                |
|                |  HISTORY:                                      |
|                |  Oct 24 - Mood: Grateful                       |
|                |  "Had a productive day, finished the wiref..." |
|                |  [Edit] [Delete]                               |
|                |  --------------------------------------------- |
|                |  Oct 23 - Mood: Tired                          |
|                |  "Long meetings today, skipped gym..."         |
|                |  [Edit] [Delete]                               |
+----------------+------------------------------------------------+
```

---

### 7. Admin Page

```text
+-----------------------------------------------------------------+
|  [Logo] AppName                                   [ User Menu ] |
+----------------+------------------------------------------------+
| NAVIGATION     |  ADMIN DASHBOARD                               |
|                |                                                |
| - Dashboard    |  SYSTEM METRICS:                               |
| - Daily Log    |  +------------------+   +------------------+   |
| - Analytics    |  | Total Users      |   | Active Users     |   |
| - Expenses     |  |       1,245      |   |         890      |   |
| - Journal      |  +------------------+   +------------------+   |
| > Admin        |                                                |
|                |  GLOBAL DATA CHARTS:                           |
|                |  [====== Avg Steps Across All Users =======]   |
|                |                                                |
|                |  [====== System-wide Expense Trends =======]   |
|                |                                                |
|                |  [====== Habit Completion Trends ==========]   |
+----------------+------------------------------------------------+
```