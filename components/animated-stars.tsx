"use client"

import { useEffect, useRef } from "react"

export default function AnimatedStars() {
  const starsRef1 = useRef<HTMLDivElement>(null)
  const starsRef2 = useRef<HTMLDivElement>(null)
  const starsRef3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createStars = (container: HTMLDivElement, count: number, size: number, speed: number) => {
      container.innerHTML = ""

      for (let i = 0; i < count; i++) {
        const star = document.createElement("div")
        star.className = "star"
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDuration = `${speed + Math.random() * 10}s`
        star.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(star)
      }
    }

    if (starsRef1.current && starsRef2.current && starsRef3.current) {
      createStars(starsRef1.current, 100, 1, 150)
      createStars(starsRef2.current, 50, 2, 100)
      createStars(starsRef3.current, 25, 3, 50)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes moveStars {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-1000px) translateX(-1000px); }
        }
        
        .star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          animation: moveStars linear infinite;
        }
      `}</style>
      <div ref={starsRef1} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
      <div ref={starsRef2} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
      <div ref={starsRef3} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
    </>
  )
}
