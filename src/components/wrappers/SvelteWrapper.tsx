import { useEffect, useRef } from 'react'
import type { ComponentType } from 'svelte'

interface SvelteWrapperProps {
  component: ComponentType
  props?: Record<string, any>
}

export const SvelteWrapper: React.FC<SvelteWrapperProps> = ({ component: Component, props = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const instance = new Component({
      target: containerRef.current,
      props
    })

    return () => {
      instance.$destroy()
    }
  }, [Component, props])

  return <div ref={containerRef} />
} 