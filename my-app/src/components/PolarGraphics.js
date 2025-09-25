"use client"

import { useRef, useEffect} from "react"

function PolarGraphics({ params }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)


  // Effect to handle drawing and animation
  useEffect(() => {
    if (params.animate) {
      startAnimation()
    } else {
      stopAnimation()
      drawGraphics(0)
    }

    return () => stopAnimation()
  }, [params])

  const startAnimation = () => {
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const time = elapsed * 0.001 * params.animationSpeed

    
      drawGraphics(time)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const drawGraphics = (time) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height)

    // Set line style based on color choice
    ctx.strokeStyle = params.color
    ctx.lineWidth = params.lineWidth || 2
    ctx.beginPath()

    // Draw the polar graphics based on selected formula
    switch (params.formula) {
      case "rose":
        drawRose(ctx, centerX, centerY, params, time)
        break
      case "spiral":
        drawSpiral(ctx, centerX, centerY, params, time)
        break
      case "cardioid":
        drawCardioid(ctx, centerX, centerY, params, time)
        break
      default:
        drawRose(ctx, centerX, centerY, params, time)
    }

    ctx.stroke()
  }

  // Basic Rose Curve: r = a * cos(k * θ)
  const drawRose = (ctx, centerX, centerY, params, time) => {
    const rotation = params.rotation + (params.animate ? time : 0)

    for (let i = 0; i <= 360; i++) {
      const theta = (i * Math.PI) / 180

      // Simple rose formula
      const r = params.radius * Math.cos(params.frequency * theta)

      // Apply rotation correctly
      const rotatedTheta = theta + rotation
      const x = centerX + r * Math.cos(rotatedTheta)
      const y = centerY + r * Math.sin(rotatedTheta)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
  }

  // Simple Spiral: r = a * θ
  const drawSpiral = (ctx, centerX, centerY, params, time) => {
    const rotation = params.rotation + (params.animate ? time : 0)

    for (let i = 0; i <= 720; i++) {
      const theta = (i * Math.PI) / 180

      // Simple spiral formula
      const r = params.radius * (theta / 10) * params.frequency

      // Apply rotation correctly
      const rotatedTheta = theta + rotation
      const x = centerX + r * Math.cos(rotatedTheta)
      const y = centerY + r * Math.sin(rotatedTheta)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
  }

  // Cardioid: r = a * (1 + cos(θ))
  const drawCardioid = (ctx, centerX, centerY, params, time) => {
    const rotation = params.rotation + (params.animate ? time : 0)

    for (let i = 0; i <= 360; i++) {
      const theta = (i * Math.PI) / 180

      // Cardioid formula
      const r = params.radius * 0.5 * (1 + Math.cos(theta)) * params.frequency

      // Apply rotation correctly
      const rotatedTheta = theta + rotation
      const x = centerX + r * Math.cos(rotatedTheta)
      const y = centerY + r * Math.sin(rotatedTheta)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
  }

  return (
    <div className="polar-graphics-container">
      <canvas ref={canvasRef} width={500} height={500} className="graphics-canvas" />
      <div className="canvas-info">
        <p>Formula: {params.formula}</p>
        <p>Frequency: {params.frequency}</p>
      </div>
    </div>
  )
}

export default PolarGraphics
