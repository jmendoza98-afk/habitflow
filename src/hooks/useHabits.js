import { useState, useCallback, useRef } from 'react'
import { SEED_HABITS, todayStr, pastDays } from '../data/habits'

const STORAGE_KEY = 'habitflow_habits'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED_HABITS
  } catch {
    return SEED_HABITS
  }
}

function save(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

function getNextId(habits) {
  return habits.length > 0 ? Math.max(...habits.map(h => h.id)) + 1 : 1
}

export function calcStreak(completions) {
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (completions[key]) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export function calcRate(completions) {
  const days = pastDays(30)
  const done  = days.filter(d => completions[d]).length
  return Math.round((done / 30) * 100)
}

export function weekData(habits) {
  const days = pastDays(7)
  return days.map(date => {
    const dayName = DAY_NAMES[new Date(date + 'T00:00:00').getDay()]
    const label   = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })
    const scheduledHabits = habits.filter(h =>
      !h.scheduledDays || h.scheduledDays.includes(dayName)
    )
    const count = scheduledHabits.filter(h => h.completions[date]).length
    return { date, label, count, total: scheduledHabits.length }
  })
}

export function useHabits() {
  const [habits, setHabits] = useState(() => load())
  const nextIdRef = useRef(getNextId(load()))

  const today    = todayStr()
  const todayDay = DAY_NAMES[new Date().getDay()]

  // Only show habits scheduled for today
  const todayHabits = habits.filter(h =>
    !h.scheduledDays || h.scheduledDays.includes(todayDay)
  )

  const updateHabits = useCallback((updater) => {
    setHabits(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      save(next)
      return next
    })
  }, [])

  const toggleDay = useCallback((id, date) => {
  updateHabits(prev => prev.map(h => {
    if (h.id !== id) return h
    const current = !!h.completions[date]
    return { ...h, completions: { ...h.completions, [date]: !current } }
  }))
}, [updateHabits])

const toggleToday = useCallback((id) => {
  toggleDay(id, today)
}, [today, toggleDay])

  const addHabit = useCallback((data) => {
    const habit = {
      id: nextIdRef.current++,
      ...data,
      completions: {},
      createdAt: today,
    }
    updateHabits(prev => [habit, ...prev])
  }, [today, updateHabits])

  const deleteHabit = useCallback((id) => {
    updateHabits(prev => prev.filter(h => h.id !== id))
  }, [updateHabits])

  const completedToday = todayHabits.filter(h => h.completions[today]).length
  const totalHabits    = todayHabits.length
  const overallRate    = totalHabits > 0
    ? Math.round((completedToday / totalHabits) * 100)
    : 0

  return {
    habits: todayHabits,
    allHabits: habits,
    today,
    todayDay,
    completedToday,
    totalHabits,
    overallRate,
    toggleDay,
    toggleToday,
    addHabit,
    deleteHabit,
  }
}
