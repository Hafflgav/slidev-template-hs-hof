<script setup lang="ts">
defineProps<{ kicker?: string, frontmatter?: Record<string, unknown> }>()
</script>

<template>
  <div class="hof-slide hof-prose compare">
    <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
    <slot />
    <div class="compare__panels">
      <section class="compare__panel hof-plane hof-color-soft"><slot name="left" /></section>
      <section class="compare__panel hof-plane hof-color-soft"><slot name="right" /></section>
    </div>
  </div>
</template>

<style scoped>
.compare__panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.compare__panel {
  padding: 27px 20px;
}

.compare__panel :deep(h3) {
  margin-top: 0;
  font-size: 20px;
  line-height: 28px;
}

.compare__panel :deep(:last-child) {
  margin-bottom: 0;
}
</style>
