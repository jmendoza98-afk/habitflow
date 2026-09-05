import { useState } from 'react'
import { COLORS } from '../data/habits'
import styles from './AddHabitForm.module.css'

const EMOJIS = ['🏃', '📚', '🧘', '💧', '📵', '🥗', '💪', '✍️', '🎯', '🎨', '🎵', '🛌', '🚴', '🧠', '💊']
const DAYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const empty = {
  name: '',
  description: '',
  color: 'violet',
  emoji: '🎯',
  scheduledDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
}

export function AddHabitForm({ onAdd, onClose }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const selectedColor = COLORS.find(c => c.id === form.color)

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  function toggleDay(day) {
    setForm(prev => {
      const has = prev.scheduledDays.includes(day)
      // don't let them deselect the last day
      if (has && prev.scheduledDays.length === 1) return prev
      return {
        ...prev,
        scheduledDays: has
          ? prev.scheduledDays.filter(d => d !== day)
          : [...prev.scheduledDays, day],
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Give your habit a name.')
    if (!form.scheduledDays.length) return setError('Pick at least one day.')
    onAdd(form)
    setForm(empty)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} style={{ '--color': selectedColor?.hex }}>

        <div className={styles.header}>
          <h2 className={styles.title}>New Habit</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.field}>
            <label className={styles.label}>Icon</label>
            <div className={styles.emojis}>
              {EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  className={`${styles.emojiBtn} ${form.emoji === e ? styles.emojiActive : ''}`}
                  onClick={() => update('emoji', e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              placeholder="e.g. Morning Run"
              value={form.name}
              onChange={e => update('name', e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description (optional)</label>
            <input
              className={styles.input}
              placeholder="e.g. 30 minutes outside"
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Days</label>
            <div className={styles.days}>
              {DAYS.map(day => (
                <button
                  key={day}
                  type="button"
                  className={`${styles.dayBtn} ${form.scheduledDays.includes(day) ? styles.dayActive : ''}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Color</label>
            <div className={styles.colors}>
              {COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.colorBtn} ${form.color === c.id ? styles.colorActive : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => update('color', c.id)}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit}>Add Habit</button>

        </form>
      </div>
    </div>
  )
}