<script setup lang="ts">
defineProps<{ kicker?: string, frontmatter?: Record<string, unknown> }>()
</script>

<template>
  <div class="hof-slide hof-prose subsection">
    <div class="subsection__band hof-plane hof-color-soft">
      <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.subsection {
  display: flex;
  align-items: center;
  padding-right: 0;
  padding-left: 0;
}

.subsection__band {
  box-sizing: border-box;
  width: 100%;
  padding: 48px 56px;
}

/* Kleiner als der Kapiteltitel, damit die Gliederung lesbar bleibt. */
.subsection__band :deep(h1) {
  margin-bottom: 0;
  font-size: 28px;
  line-height: 36px;
}

.subsection__band :deep(p:last-child) {
  margin-bottom: 0;
}

.subsection__band :deep(h1 + p) {
  margin-top: 12px;
  font-size: 20px;
  line-height: 30px;
}
</style>
