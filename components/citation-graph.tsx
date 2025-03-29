"use client"

import { useEffect, useRef } from "react"

export function CitationGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simple force-directed graph simulation
    const nodes = [
      { id: 1, label: "Paper A", x: canvas.width * 0.5, y: canvas.height * 0.3, radius: 30, color: "#2563EB" },
      { id: 2, label: "Paper B", x: canvas.width * 0.3, y: canvas.height * 0.5, radius: 25, color: "#2563EB" },
      { id: 3, label: "Paper C", x: canvas.width * 0.7, y: canvas.height * 0.5, radius: 25, color: "#2563EB" },
      { id: 4, label: "Paper D", x: canvas.width * 0.4, y: canvas.height * 0.7, radius: 20, color: "#2563EB" },
      { id: 5, label: "Paper E", x: canvas.width * 0.6, y: canvas.height * 0.7, radius: 20, color: "#2563EB" },
      { id: 6, label: "Paper F", x: canvas.width * 0.2, y: canvas.height * 0.6, radius: 15, color: "#2563EB" },
      { id: 7, label: "Paper G", x: canvas.width * 0.8, y: canvas.height * 0.6, radius: 15, color: "#2563EB" },
    ]

    const links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 3 },
      { source: 2, target: 4 },
      { source: 1, target: 5 },
      { source: 2, target: 6 },
    ]

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw links
      ctx.strokeStyle = "#CBD5E1"
      ctx.lineWidth = 1

      links.forEach((link) => {
        const source = nodes[link.source]
        const target = nodes[link.target]

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Node circle
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Node label
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, node.x, node.y)
      })

      // Simple animation
      nodes.forEach((node) => {
        node.x += (Math.random() - 0.5) * 0.5
        node.y += (Math.random() - 0.5) * 0.5

        // Keep nodes within bounds
        node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x))
        node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y))
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full bg-white dark:bg-gray-900 rounded-md" />
}

