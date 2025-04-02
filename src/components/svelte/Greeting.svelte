<script lang="ts">
  import { container } from '@/lib/container'
  import type { IMessageService } from '@/lib/container'

  let message = ''

  $: {
    const messageService = container.get<IMessageService>('IMessageService')
    message = messageService.getMessage()
  }
</script>

<div class="svelte-component">
  <p>{message}</p>
</div>

<style>
  .svelte-component {
    font-family: system-ui, sans-serif;
  }
</style> 