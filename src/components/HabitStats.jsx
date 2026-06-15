import { COLOR_MAP, pastDays } from '../data/habits'
import { calcStreak, calcRate } from '../hooks/useHabits'
import styles from './HabitStats.module.css'

function getHeatmapData(completions) {
  const days = pastDays(90)
  return days.map(date => ({
    date,
    done: !!completions[date],
    month: new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }),
    day: new Date(date + 'T00:00:00').getDate(),
  }))
}

export function HabitStats({ habit, onClose }) {
  const color   = COLOR_MAP[habit.color]
  const streak  = calcStreak(habit.completions)
  const rate    = calcRate(habit.completions)
  const heatmap = getHeatmapData(habit.completions)

  // Group by weeks for the calendar grid
  const weeks = []
  let week = []
  heatmap.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === heatmap.length - 1) {
      weeks.push(week)
      week = []
    }
  })

  // Best streak
  let bestStreak = 0
  let current = 0
  heatmap.forEach(d => {
    if (d.done) {
      current++
      bestStreak = Math.max(bestStreak, current)
    } else {
      current = 0
    }
  })

  const totalDone = heatmap.filter(d => d.done).length

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} style={{ '--color': color.hex }}>

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.emoji}>{habit.emoji}</span>
            <div>
              <h2 className={styles.name}>{habit.name}</h2>
              {habit.description && <p className={styles.desc}>{habit.description}</p>}
            </div>
          </div>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {/* Stat pills */}
        <div className={styles.stats}>
          <div className={styles.stat} style={{ background: `${color.hex}18`, borderColor: `${color.hex}33` }}>
            <span className={styles.statVal} style={{ color: color.hex }}>{streak}</span>
            <span className={styles.statLabel}>Current Streak</span>
          </div>
          <div className={styles.stat} style={{ background: `${color.hex}18`, borderColor: `${color.hex}33` }}>
            <span className={styles.statVal} style={{ color: color.hex }}>{bestStreak}</span>
            <span className={styles.statLabel}>Best Streak</span>
          </div>
          <div className={styles.stat} style={{ background: `${color.hex}18`, borderColor: `${color.hex}33` }}>
            <span className={styles.statVal} style={{ color: color.hex }}>{rate}%</span>
            <span className={styles.statLabel}>30-Day Rate</span>
          </div>
          <div className={styles.stat} style={{ background: `${color.hex}18`, borderColor: `${color.hex}33` }}>
            <span className={styles.statVal} style={{ color: color.hex }}>{totalDone}</span>
            <span className={styles.statLabel}>Total Days</span>
          </div>
        </div>

        {/* Heatmap */}
        <div className={styles.heatmapSection}>
          <span className={styles.heatmapTitle}>Last 90 Days</span>
          <div className={styles.heatmap}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.week}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`${styles.cell} ${day.done ? styles.cellDone : ''}`}
                    style={day.done ? { background: color.hex } : {}}
                    title={`${day.date} — ${day.done ? '✓ Done' : '✗ Missed'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.heatmapLegend}>
            <span>Less</span>
            <div className={styles.legendDots}>
              <div className={styles.legendDot} style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className={styles.legendDot} style={{ background: `${color.hex}44` }} />
              <div className={styles.legendDot} style={{ background: `${color.hex}88` }} />
              <div className={styles.legendDot} style={{ background: color.hex }} />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Scheduled days */}
        {habit.scheduledDays && (
          <div className={styles.scheduledSection}>
            <span className={styles.heatmapTitle}>Scheduled Days</span>
            <div className={styles.scheduledDays}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                <span
                  key={day}
                  className={`${styles.dayPill} ${habit.scheduledDays.includes(day) ? styles.dayActive : ''}`}
                  style={habit.scheduledDays.includes(day) ? { background: `${color.hex}22`, color: color.hex, borderColor: `${color.hex}55` } : {}}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}