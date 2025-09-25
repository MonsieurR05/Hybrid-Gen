"use client"

import { useRef, useEffect } from "react"

function CPPNHybridGenerator({ params }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)


  useEffect(() => {
    if (params.animate) {
      startAnimation()
    } else {
      stopAnimation()
      generatePattern(0)
    }

    return () => stopAnimation()
  }, [params])

  const startAnimation = () => {
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const time = elapsed * 0.001 * params.animationSpeed

      generatePattern(time)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const generatePattern = (time) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Create image data for pixel manipulation
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    // Generate pattern pixel by pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Cartesian coordinates (normalized to [-1, 1])
        const nx = (x / width) * 2 - 1
        const ny = (y / height) * 2 - 1

        // Convert to polar coordinates
        const r = Math.sqrt(nx * nx + ny * ny)
        const theta = Math.atan2(ny, nx)

        // Apply CPPN-like functions using both coordinate systems
        let value = 0

        switch (params.pattern) {
          case "hybrid1":
            // Combine Cartesian sine waves with polar distance
            value = Math.sin(nx * params.frequency + time) * Math.cos(ny * params.frequency) * Math.sin(r * 5)
            break
          case "hybrid2":
            // Combine polar angle with Cartesian position
            value = Math.sin(theta * params.frequency + r * 10) * Math.cos(nx * ny * 5 + time)
            break
          case "hybrid3":
            // Complex hybrid using both systems
            value =
              Math.sin(r * params.frequency * 5 + time) * Math.cos(theta * 3) * Math.sin(nx * ny * params.frequency)
            break
          default:
            value = Math.sin(nx * params.frequency + time) * Math.cos(ny * params.frequency + time)
        }

        // Map value from [-1, 1] to [0, 255]
        const intensity = Math.floor((value + 1) * 127.5)

        // Set pixel color
        const idx = (y * width + x) * 4

        if (params.colorMode === "grayscale") {
          data[idx] = intensity
          data[idx + 1] = intensity
          data[idx + 2] = intensity
        } else if (params.colorMode === "rainbow") {
          // Use both coordinate systems to determine color
          const hue = ((theta / Math.PI) * 180 + r * 120 + time * 30) % 360
          const [red, green, blue] = hslToRgb(hue / 360, 0.8, intensity / 255)
          data[idx] = red
          data[idx + 1] = green
          data[idx + 2] = blue
        } else {
          // RGB based on different aspects of coordinates
          data[idx] = Math.abs(Math.sin(theta + time)) * 255 // Red from angle
          data[idx + 1] = Math.abs(Math.cos(r * 5 + time)) * 255 // Green from radius
          data[idx + 2] = intensity // Blue from combined function
        }

        data[idx + 3] = 255 // Alpha channel
      }
    }

    // Put image data to canvas
    ctx.putImageData(imageData, 0, 0)
  }

  // Helper function to convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  return (
    <div className="cppn-generator-container">
      <canvas ref={canvasRef} width={400} height={400} className="graphics-canvas" />
      <div className="canvas-info">
        <p>Pattern: {params.pattern}</p>
        <p>Frequency: {params.frequency.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CPPNHybridGenerator
