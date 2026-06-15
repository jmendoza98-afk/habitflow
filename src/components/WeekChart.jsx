import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { weekData } from '../hooks/useHabits'
import styles from './WeekChart.module.css'

const GRADIENT_COLORS = ['#8B5CF6', '#6366F1', '#3B82F6', '#14B8A6', '#22C55E', '#F59E0B', '#F97316']

export function WeekChart({ habits }) {
  const data = weekData(habits)

  return (
    <div className={styles.wrap}>
      <span className={styles.title}>This Week</span>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data} barSize={28}>
          <XAxis
            dataKey="label"
            tick={{ fill: '#a0a0c0', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide domain={[0, Math.max(...data.map(d => d.total), 1)]} />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            contentStyle={{
              background: '#1e1e2a',
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
            }}
            itemStyle={{ color: '#ffffff' }}
            labelStyle={{ color: '#a78bfa', fontWeight: 700 }}
            formatter={(val, _, props) => [`${val} / ${props.payload.total} habits`]}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.total === 0 ? '#2a2a3a' : GRADIENT_COLORS[i % GRADIENT_COLORS.length]}
                fillOpacity={entry.total === 0 ? 0.3 : 0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
