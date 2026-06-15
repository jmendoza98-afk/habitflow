import { useState } from 'react'
import { COLOR_MAP } from '../data/habits'
import { calcStreak, calcRate } from '../hooks/useHabits'
import { pastDays } from '../data/habits'
import { HabitStats } from './HabitStats'
import styles from './HabitCard.module.css'

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function HabitCard({ habit, today, onToggle, onDelete }) {
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
        <div className={styles.top}>
          <div className={styles.left} onClick={() => setShowStats(true)} style={{ cursor: 'pointer' }}>
            <span className={styles.emoji}>{habit.emoji}</span>
            <div className={styles.info}>
              <span className={styles.name}>{habit.name}</span>
              {habit.description && (
                <span className={styles.desc}>{habit.description}</span>
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.check} ${done ? styles.checked : ''}`}
              onClick={() => onToggle(habit.id)}
              title={done ? 'Mark incomplete' : 'Mark complete'}
            >
              {done ? '✓' : ''}
            </button>
            <button
              className={styles.statsBtn}
              onClick={() => setShowStats(true)}
              title="View stats"
            >
              📊
            </button>
            <button className={styles.del} onClick={() => onDelete(habit.id)} title="Delete">✕</button>
          </div>
        </div>

        {/* Scheduled days pills */}
        {habit.scheduledDays && (
          <div className={styles.scheduledDays}>
            {ALL_DAYS.map(day => (
              <span
                key={day}
                className={`${styles.dayPill} ${habit.scheduledDays.includes(day) ? styles.dayPillActive : ''}`}
              >
                {day}
              </span>
            ))}
          </div>
        )}

        {/* Last 7 days dots */}
        <div className={styles.dots}>
          {last7.map(d => (
            <div
              key={d}
              className={`${styles.dot} ${habit.completions[d] ? styles.dotFilled : ''}`}
              title={d}
            />
          ))}
        </div>

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

      {showStats && (
        <HabitStats habit={habit} onClose={() => setShowStats(false)} />
      )}
    </>
  )
}