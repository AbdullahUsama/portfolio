import { useEffect, useRef, useState } from "react"

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const circleX = useRef(0)
  const circleY = useRef(0)
  const animationFrame = useRef<number>(0)

  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Colors
  const dotColor = "rgba(100, 200, 255, 1)"
  const dotShadow = "0 0 6px rgba(100, 200, 255, 0.8)"
  const circleBorder = "2px solid rgba(100, 200, 255, 0.8)"
  const circleShadow = "0 0 8px rgba(100, 200, 255, 0.6)"

  useEffect(() => {
    // Hide the default cursor
    const style = document.createElement("style")
    style.innerHTML = `* { cursor: none !important; }`
    document.head.appendChild(style)

    // Disable custom cursor on mobile
    const checkMobile = () => {
      if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
        setShowCursor(false)
      } else {
        setShowCursor(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (
        el &&
        (
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button" ||
          el.getAttribute("tabindex") !== null
        )
      ) {
        setHovering(true)
      } else {
        setHovering(false)
      }

      // Move dot with corrected centering
      const dotSize = clicked ? 40 : hovering ? 22 : 14
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - dotSize / 2}px, ${e.clientY - dotSize / 2}px)`
      }
    }

    const handleClick = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 200)
    }

    const animate = () => {
      circleX.current += (mouseX.current - circleX.current) * 0.1
      circleY.current += (mouseY.current - circleY.current) * 0.1

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circleX.current - 20}px, ${circleY.current - 20}px)`
      }

      animationFrame.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleClick)
    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleClick)
      window.removeEventListener("resize", checkMobile)
      cancelAnimationFrame(animationFrame.current)
      document.head.removeChild(style)
      document.body.style.cursor = "auto"
    }
  }, [clicked, hovering])

  if (!showCursor) return null

  const dotSize = clicked ? 40 : hovering ? 22 : 14

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: dotShadow,
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
          transition: "transform 0.06s ease-out, width 0.15s, height 0.15s",
        }}
      />

      {/* Smooth following hollow circle */}
      <div
        ref={circleRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: circleBorder,
          boxShadow: circleShadow,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
    </>
  )
}
