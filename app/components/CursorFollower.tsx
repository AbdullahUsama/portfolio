import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorFollower() {
  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Mouse position motion values
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth springs for the main cursor (fast response)
  const springConfigMain = { damping: 28, stiffness: 800 }
  const mainX = useSpring(mouseX, springConfigMain)
  const mainY = useSpring(mouseY, springConfigMain)

  // Smooth springs for the secondary cursor (less laggy, more responsive)
  const springConfigSecondary = { damping: 25, stiffness: 500 }
  const secondaryX = useSpring(mouseX, springConfigSecondary)
  const secondaryY = useSpring(mouseY, springConfigSecondary)

  useEffect(() => {
    // Hide default cursor
    const style = document.createElement("style")
    style.innerHTML = `* { cursor: none !important; }`
    document.head.appendChild(style)

    // Mobile check
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
          setShowCursor(false)
        } else {
          setShowCursor(true)
        }
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (
        el &&
        (
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button" ||
          el.getAttribute("tabindex") !== null ||
          el.closest("a") ||
          el.closest("button")
        )
      ) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("resize", checkMobile)
      document.head.removeChild(style)
      document.body.style.cursor = "auto"
    }
  }, [mouseX, mouseY])

  if (!showCursor) return null

  return (
    <>
      {/* Main Cursor: Diamond -> Circle */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
        animate={{
          scale: clicked ? 0.8 : hovering ? 1.05 : 1,
          rotate: hovering ? 0 : 45, // Diamond (45deg) to Square/Circle (0deg)
          borderRadius: hovering ? "50%" : "0%", // Sharp to Round
          width: hovering ? 20 : 16,
          height: hovering ? 20 : 16,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div style={{ width: "100%", height: "100%", background: "white", boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }} />
      </motion.div>

      {/* Secondary Cursor: Rotating Frame */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: secondaryX,
          y: secondaryY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        animate={{
          scale: clicked ? 1.5 : hovering ? 1.3 : 1,
          rotate: hovering ? 180 : 0,
          borderRadius: hovering ? "50%" : "0%", // Square frame to Circle frame
          width: hovering ? 56 : 50,
          height: hovering ? 56 : 50,
          opacity: hovering ? 0.6 : 0.4,
          borderColor: "white",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          rotate: { duration: 2, repeat: Infinity, ease: "linear", repeatType: "loop" }
        }}
      >
        {/* Slowly rotating inner frame */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%", border: "1.5px solid white", boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
        />
      </motion.div>
    </>
  )
}
