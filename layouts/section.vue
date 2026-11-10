<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { chapterColor, useChapters } from '../composables/useChapters'

const props = defineProps<{
  kicker?: string
  color?: 'yellow' | 'green' | 'red' | 'blue'
  frontmatter?: Record<string, unknown>
}>()

const { $page } = useSlideContext()
const { chapters } = useChapters()

const chapter = computed(() => chapters.value.find(c => c.no === $page.value))
const index = computed(() => chapter.value?.index ?? 0)
const color = computed(() => chapter.value?.color ?? chapterColor(index.value))
const kickerText = computed(() => props.kicker ?? `Kapitel ${index.value + 1}`)
</script>

<template>
  <div class="hof-slide hof-prose section" :class="`hof-color-${color}`">
    <p class="hof-kicker">{{ kickerText }}</p>
    <slot />
  </div>
</template>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-auto-rows: min-content;
  column-gap: 48px;
  align-content: center;
}

/* Die Überschrift ist die Farbfläche, wie die quadratischen Fragekacheln der Website. */
.section :deep(h1) {
  grid-column: 1;
  grid-row: 1 / span 20;
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 0;
  padding: 27px 24px;
  background: var(--hof-plane);
  color: var(--hof-on-plane);
  font-size: 32px;
  line-height: 40px;
  hyphens: auto;
  overflow-wrap: anywhere;
}

.section > :not(h1),
.section :deep(> :not(h1)) {
  grid-column: 2;
}

.section :deep(> p:not(.hof-kicker)),
.section :deep(li) {
  font-size: 20px;
  line-height: 30px;
}
</style>
