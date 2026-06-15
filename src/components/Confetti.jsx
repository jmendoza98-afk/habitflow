import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const firedRef = useRef(false)

  function fire() {
    if (firedRef.current) return
    firedRef.current = true

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#8B5CF6', '#14B8A6', '#F43F5E', '#F59E0B', '#3B82F6', '#22C55E'],
    })

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#8B5CF6', '#14B8A6', '#F43F5E'],
      })
    }, 200)

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#F59E0B', '#3B82F6', '#22C55E'],
      })
    }, 400)

    setTimeout(() => { firedRef.current = false }, 3000)
  }

  return { fire }
}