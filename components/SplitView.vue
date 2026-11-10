<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Spaltenverhältnis Visual/Text, zum Beispiel "1.5/1" */
  ratio?: string
  reverse?: boolean
}>(), {
  ratio: '1/1',
  reverse: false,
})

const columns = computed(() => {
  const [visual = '1', body = '1'] = props.ratio.split('/').map(part => part.trim())
  return props.reverse ? `${body}fr ${visual}fr` : `${visual}fr ${body}fr`
})
</script>

<template>
  <div class="split-view" :class="{ 'split-view--reverse': reverse }" :style="{ gridTemplateColumns: columns }">
    <div class="split-view__visual"><slot name="visual" /></div>
    <div class="split-view__body"><slot /></div>
  </div>
</template>

<style scoped>
.split-view {
  display: grid;
  align-items: center;
  gap: 40px;
}

.split-view__visual,
.split-view__body {
  min-width: 0;
}

.split-view--reverse .split-view__visual {
  order: 2;
}
</style>
