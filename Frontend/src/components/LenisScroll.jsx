import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // 1. The "Heavy" Feel
      duration: 3.0, // Increased from 1.2. Higher = smoother/slower stop.
      
      // 2. The Easing (Standard Exponential)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      
      // 3. Responsiveness
      wheelMultiplier: 1.5, // Makes the scroll travel further per wheel tick
      
      // Standard settings
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Keep false to feel native on mobile
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

export default LenisScroll