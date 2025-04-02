'use client'

import { useEffect, useState } from 'react'
import { container } from '@/lib/container'
import type { IMessageService } from '@/lib/container'

// 导入各框架组件
import VueGreeting from '@/components/vue/Greeting.vue'
import SvelteGreeting from '@/components/svelte/Greeting.svelte'
import { VueWrapper } from '@/components/wrappers/VueWrapper'
import { SvelteWrapper } from '@/components/wrappers/SvelteWrapper'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const messageService = container.get<IMessageService>('IMessageService')
    setMessage(messageService.getMessage())
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">多框架组件演示</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">React 组件</h2>
          <div className="p-4 border rounded">{message}</div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Vue 组件</h2>
          <div className="p-4 border rounded">
            <VueWrapper component={VueGreeting} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Svelte 组件</h2>
          <div className="p-4 border rounded">
            <SvelteWrapper component={SvelteGreeting} />
          </div>
        </section>
      </div>
    </main>
  )
} 