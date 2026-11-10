<script setup lang="ts">
defineProps<{
  kicker?: string
  meta?: string
  image?: string
  imageAlt?: string
  frontmatter?: Record<string, unknown>
}>()
</script>

<template>
  <div class="hof-slide cover">
    <HofMotif :image="image" :image-alt="imageAlt" />
    <HofLogo class="cover__logo" />
    <div class="cover__text hof-prose">
      <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
      <slot />
      <p v-if="meta" class="cover__meta">{{ meta }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Logo oben, Text unten: ein langer Titel kann so nicht in das Logo laufen. */
.cover {
  display: grid;
  grid-template-columns: 500px;
  grid-template-rows: auto 1fr auto;
}

.cover__logo {
  position: relative;
  width: 170px;
}

.cover__text {
  position: relative;
  grid-row: 3;
}

.cover__text :deep(h1) {
  max-width: none;
  margin-bottom: 12px;
  font-size: 40px;
  line-height: 52px;
  hyphens: auto;
  overflow-wrap: anywhere;
}

.cover__meta {
  margin: 12px 0 0;
  font: 400 16px/24px var(--hof-font-body);
}
</style>
