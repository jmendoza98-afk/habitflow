# HabitFlow

A colorful habit tracker built with React, JavaScript, and Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Features

- Add habits with custom emoji, color, and description
- Toggle daily completion with one click
- Streak counter per habit
- 30-day completion rate per habit
- Last 7 days dot indicator per habit
- Weekly bar chart across all habits
- Today's progress ring
- Celebration banner when all habits are done
- localStorage persistence

## Project structure

```
src/
├── data/
│   └── habits.js           # Colors, seed data, date helpers
├── hooks/
│   └── useHabits.js        # All state, streak logic, localStorage
├── components/
│   ├── HabitCard.jsx        # Individual habit with streak + dots
│   ├── AddHabitForm.jsx     # Modal to add a new habit
│   ├── WeekChart.jsx        # Recharts bar chart for the week
│   └── ProgressRing.jsx     # SVG ring for today's completion
├── App.jsx
├── App.module.css
├── main.jsx
└── index.css
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
