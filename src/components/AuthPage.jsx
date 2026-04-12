import { useState } from 'react'
import styles from './AuthPage.module.css'

export function AuthPage({ onLogin, onSignup, error, setError }) {
  const [mode, setMode]         = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'login') {
      onLogin(username, password)
    } else {
      onSignup(username, password)
    }
  }

  function switchMode(m) {
    setMode(m)
    setUsername('')
    setPassword('')
    setError('')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logo}>
          habit<span>flow</span>
        </div>
        <p className={styles.tagline}>Build better habits, one day at a time.</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
            onClick={() => switchMode('login')}
          >
            Log In
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.active : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              placeholder="Enter your username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit}>
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <p className={styles.switch}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            className={styles.switchBtn}
            onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

      </div>
    </div>
  )
}