import { createSignal, onMount } from 'solid-js'
import { container } from '@/lib/container'
import type { IMessageService } from '@/lib/container'
import styles from './Greeting.module.css'

export function Greeting() {
  const [message, setMessage] = createSignal('')

  onMount(() => {
    const messageService = container.get<IMessageService>('IMessageService')
    setMessage(messageService.getMessage())
  })

  return (
    <div class={styles.solidComponent}>
      <p>{message()}</p>
    </div>
  )
} 