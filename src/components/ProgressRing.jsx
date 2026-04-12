import styles from './ProgressRing.module.css'

export function ProgressRing({ pct, completed, total }) {
  const r   = 54
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className={styles.wrap}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#2a2a3a" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.center}>
        <span className={styles.pct}>{pct}%</span>
        <span className={styles.sub}>{completed}/{total} done</span>
      </div>
    </div>
  )
}
