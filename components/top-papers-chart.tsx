"use client"

import { useEffect, useRef } from "react"

export function TopPapersChart() {
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

    // Sample data
    const papers = [
      { title: "Transformers in Genomics", citations: 142 },
      { title: "Quantum Machine Learning", citations: 87 },
      { title: "Climate Change Impact", citations: 112 },
      { title: "Neural Architecture Search", citations: 76 },
      { title: "Explainable AI in Healthcare", citations: 95 },
    ]

    // Sort papers by citations
    papers.sort((a, b) => b.citations - a.citations)

    // Chart configuration
    const margin = { top: 20, right: 20, bottom: 60, left: 60 }
    const chartWidth = canvas.width - margin.left - margin.right
    const chartHeight = canvas.height - margin.top - margin.bottom
    const barHeight = (chartHeight / papers.length) * 0.7
    const barSpacing = (chartHeight / papers.length) * 0.3

    // Find max value for scaling
    const maxCitations = Math.max(...papers.map((p) => p.citations))

    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.fillStyle = "#1E293B"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Top Papers by Citation Count", canvas.width / 2, margin.top / 2)

    // Draw axes
    ctx.strokeStyle = "#CBD5E1"
    ctx.lineWidth = 1

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(margin.left, margin.top)
    ctx.lineTo(margin.left, margin.top + chartHeight)
    ctx.stroke()

    // X-axis
    ctx.beginPath()
    ctx.moveTo(margin.left, margin.top + chartHeight)
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight)
    ctx.stroke()

    // Draw bars
    papers.forEach((paper, i) => {
      const barWidth = (paper.citations / maxCitations) * chartWidth
      const y = margin.top + i * (barHeight + barSpacing)

      // Bar
      const gradient = ctx.createLinearGradient(margin.left, 0, margin.left + barWidth, 0)
      gradient.addColorStop(0, "#2563EB")
      gradient.addColorStop(1, "#60A5FA")

      ctx.fillStyle = gradient
      ctx.fillRect(margin.left, y, barWidth, barHeight)

      // Paper title
      ctx.fillStyle = "#1E293B"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(paper.title, margin.left - 10, y + barHeight / 2)

      // Citation count
      ctx.fillStyle = "#1E293B"
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(paper.citations.toString(), margin.left + barWidth + 10, y + barHeight / 2)
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[200px] bg-white dark:bg-gray-900 rounded-md" />
}

