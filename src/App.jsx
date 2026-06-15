import { useState, useEffect } from 'react'
import { useHabits } from './hooks/useHabits'
import { useAuth } from './hooks/useAuth'
import { useConfetti } from './components/Confetti'
import { HabitCard } from './components/HabitCard'
import { AddHabitForm } from './components/AddHabitForm'
import { WeekChart } from './components/WeekChart'
import { ProgressRing } from './components/ProgressRing'
import { AuthPage } from './components/AuthPage'
import styles from './App.module.css'

export default function App() {
  const { currentUser, error, setError, signup, login, logout } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const { fire } = useConfetti()
  const {
  habits, today, completedToday, totalHabits,
  overallRate, toggleToday, toggleDay, addHabit, deleteHabit,
  } = useHabits()

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  const allDone = totalHabits > 0 && completedToday === totalHabits

  // Fire confetti when all habits are done
  useEffect(() => {
    if (allDone) fire()
  }, [allDone])

  if (!currentUser) {
    return (
      <AuthPage
        onLogin={login}
        onSignup={signup}
        error={error}
        setError={setError}
      />
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.logo}>habit<span>flow</span></h1>
            <p className={styles.date}>{todayLabel}</p>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.welcome}>👋 {currentUser}</span>
            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + New Habit
            </button>
            <button className={styles.logoutBtn} onClick={logout}>
              Log out
            </button>
          </div>
        </div>

        {allDone && (
          <div className={styles.banner}>
            🎉 All habits complete for today — great work!
          </div>
        )}

        <div className={styles.topRow}>
          <div className={styles.ringWrap}>
            <ProgressRing pct={overallRate} completed={completedToday} total={totalHabits} />
            <div className={styles.ringLabel}>
              <span className={styles.ringTitle}>Today's Progress</span>
              <span className={styles.ringSub}>
                {completedToday === 0 && 'Let\'s get started!'}
                {completedToday > 0 && completedToday < totalHabits && 'Keep it up!'}
                {allDone && 'You crushed it! 🔥'}
              </span>
            </div>
          </div>
          <div className={styles.chartWrap}>
            <WeekChart habits={habits} />
          </div>
        </div>

        {habits.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🌱</span>
            <p>No habits yet — add your first one!</p>
            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + New Habit
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                today={today}
                onToggle={toggleToday}
                onToggleDay={toggleDay}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        )}

      </div>

      {showForm && (
        <AddHabitForm onAdd={addHabit} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
