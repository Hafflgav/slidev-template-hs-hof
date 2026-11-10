<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'yellow' | 'green' | 'red' | 'blue'
  side?: 'left' | 'right'
  frontmatter?: Record<string, unknown>
}>(), {
  color: 'blue',
  side: 'left',
})
</script>

<template>
  <div class="hof-slide hof-prose hero" :class="[`hof-color-${color}`, `hero--${side}`]">
    <slot />
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 540px 1fr;
  grid-auto-rows: min-content;
  column-gap: 40px;
  align-content: center;
}

.hero--right {
  grid-template-columns: 1fr 540px;
}

/* Die Frage ist die Farbfläche. Vorbild sind die Fragekacheln unter /studium.html
   und die breiten Farbblöcke der Studiengangsseiten. Block statt Flex, damit
   Hervorhebungen und Links im Fließtext der Frage bleiben. */
.hero :deep(h1) {
  grid-column: 1;
  grid-row: 1 / span 20;
  box-sizing: border-box;
  display: block;
  align-content: end;
  max-width: none;
  height: 320px;
  margin: 0;
  padding: 32px;
  background: var(--hof-plane);
  color: var(--hof-on-plane);
  font-size: 32px;
  line-height: 42px;
  hyphens: auto;
  overflow-wrap: anywhere;
}

.hero--right :deep(h1) {
  grid-column: 2;
}

.hero :deep(> :not(h1)) {
  grid-column: 2;
  font-size: 20px;
  line-height: 30px;
}

.hero--right :deep(> :not(h1)) {
  grid-column: 1;
}
</style>
