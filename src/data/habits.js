export const COLORS = [
  { id: 'violet', label: 'Violet', hex: '#8B5CF6', light: '#EDE9FE' },
  { id: 'rose',   label: 'Rose',   hex: '#F43F5E', light: '#FFE4E6' },
  { id: 'amber',  label: 'Amber',  hex: '#F59E0B', light: '#FEF3C7' },
  { id: 'teal',   label: 'Teal',   hex: '#14B8A6', light: '#CCFBF1' },
  { id: 'blue',   label: 'Blue',   hex: '#3B82F6', light: '#DBEAFE' },
  { id: 'green',  label: 'Green',  hex: '#22C55E', light: '#DCFCE7' },
  { id: 'orange', label: 'Orange', hex: '#F97316', light: '#FFEDD5' },
  { id: 'pink',   label: 'Pink',   hex: '#EC4899', light: '#FCE7F3' },
]

export const COLOR_MAP = Object.fromEntries(COLORS.map(c => [c.id, c]))

// Generate dates for the past N days
export function pastDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - 1 - i))
    return d.toISOString().slice(0, 10)
  })
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

// Generate random completions for seed data
function seedCompletions(days, pct = 0.75) {
  return Object.fromEntries(
    days.map(d => [d, Math.random() < pct])
  )
}

const days = pastDays(30)

export const SEED_HABITS = [
  {
    id: 1,
    name: 'Morning Run',
    description: '30 minutes outside',
    color: 'violet',
    emoji: '🏃',
    completions: seedCompletions(days, 0.8),
    createdAt: days[0],
  },
  {
    id: 2,
    name: 'Read',
    description: '20 pages a day',
    color: 'amber',
    emoji: '📚',
    completions: seedCompletions(days, 0.9),
    createdAt: days[0],
  },
  {
    id: 3,
    name: 'Meditate',
    description: '10 minutes of mindfulness',
    color: 'teal',
    emoji: '🧘',
    completions: seedCompletions(days, 0.65),
    createdAt: days[0],
  },
  {
    id: 4,
    name: 'Drink Water',
    description: '8 glasses per day',
    color: 'blue',
    emoji: '💧',
    completions: seedCompletions(days, 0.85),
    createdAt: days[0],
  },
  {
    id: 5,
    name: 'No Social Media',
    description: 'Stay off Instagram & Twitter',
    color: 'rose',
    emoji: '📵',
    completions: seedCompletions(days, 0.55),
    createdAt: days[0],
  },
]
