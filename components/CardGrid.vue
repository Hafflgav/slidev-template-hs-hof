<script setup lang="ts">
withDefaults(defineProps<{
  cols?: number | string
  flush?: boolean
}>(), {
  cols: 3,
  flush: false,
})
</script>

<template>
  <div class="card-grid" :class="{ 'card-grid--flush': flush }" :style="{ '--cols': String(cols) }">
    <slot />
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  gap: 20px;
}

/* Bündige Farbkacheln wie auf der Startseite der Website. */
.card-grid--flush {
  gap: 0;
}
</style>
