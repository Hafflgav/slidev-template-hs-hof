<script setup lang="ts">
import { withBase } from '../utils/withBase'

withDefaults(defineProps<{
  kicker?: string
  image: string
  imageAlt?: string
  side?: 'left' | 'right'
  fit?: 'cover' | 'contain'
  source?: string
  frontmatter?: Record<string, unknown>
}>(), {
  side: 'right',
  fit: 'cover',
})
</script>

<template>
  <div class="hof-slide content-image" :class="`content-image--${side}`">
    <div class="content-image__body hof-prose">
      <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
      <slot />
    </div>
    <figure class="content-image__figure">
      <img :src="withBase(image)" :alt="imageAlt ?? ''" :style="{ objectFit: fit }">
      <figcaption v-if="source">Quelle: {{ source }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.content-image {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  column-gap: 40px;
}

.content-image--left {
  grid-template-columns: 380px minmax(0, 1fr);
}

.content-image--left .content-image__body {
  order: 2;
}

.content-image__body :deep(h1) {
  hyphens: auto;
  overflow-wrap: anywhere;
}

/* Rechts oben steht das Logo; Überzeile und Titel halten Abstand. */
.content-image--left .content-image__body :deep(:is(.hof-kicker, h1)) {
  max-width: calc(100% - 116px);
}

/* Das Bild beginnt unter dem Logo in der Ecke. */
.content-image__figure {
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin: 48px 0 0;
}

.content-image__figure img {
  flex: 1;
  width: 100%;
  min-height: 0;
}

.content-image__figure figcaption {
  margin-top: 6px;
  color: var(--hof-text-muted);
  font: 400 13px/18px var(--hof-font-body);
}
</style>
