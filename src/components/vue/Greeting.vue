<template>
  <div class="vue-component">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { container } from '@/lib/container'
import type { IMessageService } from '@/lib/container'

const message = ref('')

onMounted(() => {
  const messageService = container.get<IMessageService>('IMessageService')
  message.value = messageService.getMessage()
})
</script>

<style scoped>
.vue-component {
  font-family: system-ui, sans-serif;
}
</style> 