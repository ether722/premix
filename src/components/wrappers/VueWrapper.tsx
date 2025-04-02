import { useEffect, useRef } from 'react'
import { createApp } from 'vue'

interface VueWrapperProps {
  component: any
}

export const VueWrapper: React.FC<VueWrapperProps> = ({ component: Component }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const app = createApp(Component)
    app.mount(containerRef.current)

    return () => {
      app.unmount()
    }
  }, [Component])

  return <div ref={containerRef} />
} 