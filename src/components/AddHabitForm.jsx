import { useState } from 'react'
import { COLORS } from '../data/habits'
import styles from './AddHabitForm.module.css'

const EMOJIS = ['🏃', '📚', '🧘', '💧', '📵', '🥗', '💪', '✍️', '🎯', '🎨', '🎵', '🛌', '🚴', '🧠', '💊']

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const EMPTY = {
  name: '',
  description: '',
  color: 'violet',
  emoji: '🎯',
  scheduledDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
}

export function AddHabitForm({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  function toggleDay(day) {
    setForm(prev => {
      const already = prev.scheduledDays.includes(day)
      if (already && prev.scheduledDays.length === 1) return prev
      return {
        ...prev,
        scheduledDays: already
          ? prev.scheduledDays.filter(d => d !== day)
          : [...prev.scheduledDays, day],
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please enter a habit name.')
    if (form.scheduledDays.length === 0) return setError('Select at least one day.')
    onAdd(form)
    setForm(EMPTY)
    onClose()
  }

  const selectedColor = COLORS.find(c => c.id === form.color)

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
                  onClick={() => set('emoji', e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Habit Name</label>
            <input
              className={styles.input}
              placeholder="e.g. Morning Run"
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description (optional)</label>
            <input
              className={styles.input}
              placeholder="e.g. 30 minutes outside"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Scheduled Days</label>
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
                  onClick={() => set('color', c.id)}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit}>
            Add Habit
          </button>
        </form>
      </div>
    </div>
  )
}