"use client"

import { useEffect } from "react"

type BinaryCursorOptions = {
  dotColor?: string
  trailColor?: string
  glowColor?: string
  fontSize?: number
  spawnRate?: number
  gravity?: number
  fadeSpeed?: number
  dotRadius?: number
  ringRadius?: number
  canvasId?: string
  disableOnTouch?: boolean
}

type Particle = {
  x: number
  y: number
  char: "0" | "1"
  life: number
  vy: number
  vx: number
  size: number
}

function initBinaryCursor(options: BinaryCursorOptions = {}) {
  const cfg = {
    dotColor: options.dotColor || "#6366f1",
    trailColor: options.trailColor || "#6366f1",
    glowColor: options.glowColor || "#6366f1",
    fontSize: options.fontSize || 18,
    spawnRate: options.spawnRate || 0.5,
    gravity: options.gravity || 0.9,
    fadeSpeed: options.fadeSpeed || 0.028,
    dotRadius: options.dotRadius || 9,
    ringRadius: options.ringRadius || 26,
    canvasId: options.canvasId || "cursor-canvas",
    disableOnTouch: options.disableOnTouch !== false,
  }

  if (cfg.disableOnTouch && window.matchMedia("(hover: none)").matches) return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  let canvas = document.getElementById(cfg.canvasId) as HTMLCanvasElement | null
  if (!canvas) {
    canvas = document.createElement("canvas")
    canvas.id = cfg.canvasId
    document.body.appendChild(canvas)
  }

  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "999999",
  })

  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  document.body.classList.add("binary-cursor-enabled")

  const resize = () => {
    canvas!.width = window.innerWidth
    canvas!.height = window.innerHeight
  }

  resize()
  window.addEventListener("resize", resize)

  let mx = -999
  let my = -999
  let visible = false
  let ringPulse = 0
  let isLightMode = false
  const particles: Particle[] = []
  let frameId = 0

  const updateTheme = () => {
    isLightMode = document.documentElement.getAttribute("data-theme") === "light"
  }

  const spawnParticle = (burst = false) => {
    const spread = burst ? 18 : 8
    particles.push({
      x: mx + (Math.random() - 0.5) * spread,
      y: my + (Math.random() - 0.5) * spread,
      char: Math.random() < 0.5 ? "0" : "1",
      life: 1,
      vy: cfg.gravity * (Math.random() * 0.8 + 0.5) * (burst ? 1.8 : 1),
      vx: (Math.random() - 0.5) * (burst ? 1.5 : 0.4),
      size: cfg.fontSize + Math.floor(Math.random() * 4),
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    mx = e.clientX
    my = e.clientY
    visible = true

    if (Math.random() < cfg.spawnRate) {
      spawnParticle()
    }
  }

  const handleMouseLeave = () => {
    visible = false
  }

  const handleMouseEnter = () => {
    visible = true
  }

  const handleClick = () => {
    for (let i = 0; i < 10; i++) spawnParticle(true)
  }

  const draw = () => {
    frameId = requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas!.width, canvas!.height)

    if (!visible || mx < 0) return

    updateTheme()
    const dotColor = isLightMode ? "#000000" : cfg.dotColor
    const trailColor = isLightMode ? "#000000" : cfg.trailColor
    const glowColor = isLightMode ? "#000000" : cfg.glowColor

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= cfg.fadeSpeed

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      ctx.globalAlpha = p.life * 0.9
      ctx.font = `${p.size}px 'Courier New', monospace`
      ctx.fillStyle = trailColor
      ctx.shadowColor = glowColor
      ctx.shadowBlur = 6 * p.life
      ctx.fillText(p.char, p.x, p.y)
    }

    ctx.globalAlpha = 1
    ctx.shadowBlur = 0

    ringPulse += 0.08
    const ringAlpha = 0.25 + Math.sin(ringPulse) * 0.12

    ctx.beginPath()
    ctx.arc(mx, my, cfg.ringRadius, 0, Math.PI * 2)
    ctx.strokeStyle = glowColor
    ctx.globalAlpha = ringAlpha
    ctx.lineWidth = 1
    ctx.shadowColor = glowColor
    ctx.shadowBlur = 8
    ctx.stroke()

    ctx.globalAlpha = 1
    ctx.shadowBlur = 12
    ctx.shadowColor = glowColor
    ctx.beginPath()
    ctx.arc(mx, my, cfg.dotRadius, 0, Math.PI * 2)
    ctx.fillStyle = dotColor
    ctx.fill()

    ctx.globalAlpha = 1
    ctx.shadowBlur = 0
  }

  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseleave", handleMouseLeave)
  document.addEventListener("mouseenter", handleMouseEnter)
  document.addEventListener("click", handleClick)
  draw()

  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener("resize", resize)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseleave", handleMouseLeave)
    document.removeEventListener("mouseenter", handleMouseEnter)
    document.removeEventListener("click", handleClick)
    document.body.classList.remove("binary-cursor-enabled")
    canvas?.remove()
  }
}

export default function CursorFollower() {
  useEffect(() => {
    const cleanup = initBinaryCursor()
    return cleanup
  }, [])

  return null
}