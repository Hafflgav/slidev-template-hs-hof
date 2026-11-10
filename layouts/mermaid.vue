<script setup lang="ts">
defineProps<{ kicker?: string, frontmatter?: Record<string, unknown> }>()
</script>

<template>
  <div class="hof-slide hof-prose mermaid-slide">
    <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
    <slot />
    <div v-if="$slots.caption" class="mermaid-slide__caption"><slot name="caption" /></div>
  </div>
</template>

<style scoped>
.mermaid-slide {
  display: flex;
  flex-direction: column;
}

/* Slidev rendert den Mermaid-Block in ein Element mit der Klasse "mermaid". */
.mermaid-slide :deep(.mermaid) {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.mermaid-slide__caption {
  margin-top: 8px;
}

.mermaid-slide__caption :deep(p) {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
}
</style>
