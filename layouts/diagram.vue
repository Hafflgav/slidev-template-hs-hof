<script setup lang="ts">
import { withBase } from '../utils/withBase'

defineProps<{
  kicker?: string
  diagram: string
  diagramAlt?: string
  source?: string
  frontmatter?: Record<string, unknown>
}>()
</script>

<template>
  <div class="hof-slide hof-prose diagram">
    <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
    <slot />
    <img class="diagram__image" :src="withBase(diagram)" :alt="diagramAlt ?? ''">
    <div v-if="$slots.caption || source" class="diagram__caption">
      <slot name="caption" />
      <p v-if="source" class="diagram__source">Quelle: {{ source }}</p>
    </div>
  </div>
</template>

<style scoped>
.diagram {
  display: flex;
  flex-direction: column;
}

.diagram__image {
  flex: 1;
  width: 100%;
  min-height: 0;
  object-fit: contain;
}

.diagram__caption {
  margin-top: 8px;
}

.diagram__caption :deep(p) {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
}

.diagram__caption .diagram__source {
  color: var(--hof-text-muted);
  font-size: 13px;
  line-height: 18px;
}
</style>
