import React, { useRef, useEffect } from 'react'

interface CanvasProps {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => void
  width?: number
  height?: number
}

export default function Canvas({ draw, width = window.innerWidth, height = window.innerHeight }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return

    let frameCount = 0
    let animationFrameId: number

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, width, height])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}
