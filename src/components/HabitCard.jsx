import { useState } from 'react'
import { COLOR_MAP } from '../data/habits'
import { calcStreak, calcRate } from '../hooks/useHabits'
import { pastDays } from '../data/habits'
import { HabitStats } from './HabitStats'
import styles from './HabitCard.module.css'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function HabitCard({ habit, today, onToggle, onToggleDay, onDelete }) {
  const [showStats, setShowStats] = useState(false)

  const color  = COLOR_MAP[habit.color]
  const done   = !!habit.completions[today]
  const streak = calcStreak(habit.completions)
  const rate   = calcRate(habit.completions)
  const last7  = pastDays(7)

  return (
    <>
      <div
        className={`${styles.card} ${done ? styles.done : ''}`}
        style={{ '--color': color.hex, '--light': color.light }}
      >
        {/* top row — emoji, name, buttons */}
        <div className={styles.top}>
          <div className={styles.left} onClick={() => setShowStats(true)} style={{ cursor: 'pointer' }}>
            <span className={styles.emoji}>{habit.emoji}</span>
            <div className={styles.info}>
              <span className={styles.name}>{habit.name}</span>
              {habit.description && <span className={styles.desc}>{habit.description}</span>}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.check} ${done ? styles.checked : ''}`}
              onClick={() => onToggle(habit.id)}
            >
              {done ? '✓' : ''}
            </button>
            <button className={styles.statsBtn} onClick={() => setShowStats(true)}>📊</button>
            <button className={styles.del} onClick={() => onDelete(habit.id)}>✕</button>
          </div>
        </div>

        {/* which days this habit runs */}
        {habit.scheduledDays && (
          <div className={styles.scheduledDays}>
            {DAYS.map(day => (
              <span
                key={day}
                className={`${styles.dayPill} ${habit.scheduledDays.includes(day) ? styles.dayPillActive : ''}`}
              >
                {day}
              </span>
            ))}
          </div>
        )}

        {/* last 7 days — click any dot to toggle that day */}
        <div className={styles.dots}>
          {last7.map(d => (
            <div
              key={d}
              className={`${styles.dot} ${habit.completions[d] ? styles.dotFilled : ''} ${styles.dotClickable}`}
              title={d}
              onClick={() => onToggleDay(habit.id, d)}
            />
          ))}
        </div>

        {/* streak + completion rate */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal} style={{ color: color.hex }}>{streak}</span>
            <span className={styles.statLabel}>day streak</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal} style={{ color: color.hex }}>{rate}%</span>
            <span className={styles.statLabel}>30-day rate</span>
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${rate}%` }} />
            </div>
          </div>
        </div>
      </div>

      {showStats && <HabitStats habit={habit} onClose={() => setShowStats(false)} />}
    </>
  )
}