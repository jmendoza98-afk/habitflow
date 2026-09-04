import { COLOR_MAP, pastDays } from '../data/habits'
import { calcStreak, calcRate } from '../hooks/useHabits'
import styles from './HabitStats.module.css'

// builds the 90-day grid data
function getHeatmap(completions) {
  return pastDays(90).map(date => ({
    date,
    done: !!completions[date],
    day: new Date(date + 'T00:00:00').getDate(),
  }))
}

// chunk flat array into rows of 7
function toWeeks(days) {
  const weeks = []
  let week = []
  days.forEach((d, i) => {
    week.push(d)
    if (week.length === 7 || i === days.length - 1) {
      weeks.push(week)
      week = []
    }
  })
  return weeks
}

function getBestStreak(heatmap) {
  let best = 0
  let cur  = 0
  heatmap.forEach(d => {
    cur  = d.done ? cur + 1 : 0
    best = Math.max(best, cur)
  })
  return best
}

export function HabitStats({ habit, onClose }) {
  const color   = COLOR_MAP[habit.color]
  const streak  = calcStreak(habit.completions)
  const rate    = calcRate(habit.completions)
  const heatmap = getHeatmap(habit.completions)
  const weeks   = toWeeks(heatmap)
  const best    = getBestStreak(heatmap)
  const total   = heatmap.filter(d => d.done).length

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

        {/* 4 stat pills */}
        <div className={styles.stats}>
          {[
            { label: 'Current Streak', val: streak },
            { label: 'Best Streak',    val: best   },
            { label: '30-Day Rate',    val: `${rate}%` },
            { label: 'Total Days',     val: total  },
          ].map(s => (
            <div key={s.label} className={styles.stat} style={{ background: `${color.hex}18`, borderColor: `${color.hex}33` }}>
              <span className={styles.statVal} style={{ color: color.hex }}>{s.val}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* 90 day heatmap */}
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
                    title={`${day.date} — ${day.done ? '✓' : '✗'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.heatmapLegend}>
            <span>Less</span>
            <div className={styles.legendDots}>
              {['06', '44', '88', 'ff'].map(op => (
                <div key={op} className={styles.legendDot} style={{ background: op === '06' ? 'rgba(255,255,255,0.06)' : `${color.hex}${op}` }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* scheduled days */}
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