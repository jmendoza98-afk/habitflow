import { useState } from 'react'

const USERS_KEY   = 'habitflow_users'
const SESSION_KEY = 'habitflow_session'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY) || null
  } catch {
    return null
  }
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(() => loadSession())
  const [error, setError] = useState('')

  function signup(username, password) {
    const users = loadUsers()
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return false
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters.')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    if (users[username]) {
      setError('Username already taken.')
      return false
    }
    users[username] = { username, password }
    saveUsers(users)
    localStorage.setItem(SESSION_KEY, username)
    setCurrentUser(username)
    setError('')
    return true
  }

  function login(username, password) {
    const users = loadUsers()
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return false
    }
    if (!users[username]) {
      setError('No account found with that username.')
      return false
    }
    if (users[username].password !== password) {
      setError('Incorrect password.')
      return false
    }
    localStorage.setItem(SESSION_KEY, username)
    setCurrentUser(username)
    setError('')
    return true
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return { currentUser, error, setError, signup, login, logout }
}