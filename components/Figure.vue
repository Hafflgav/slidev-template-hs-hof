<script setup lang="ts">
import { withBase } from '../utils/withBase'

withDefaults(defineProps<{
  src: string
  alt?: string
  caption?: string
  source?: string
  /** Höchste Bildhöhe; darüber wird das Bild verkleinert statt unter die Fußzeile zu laufen. */
  height?: string
}>(), {
  height: '300px',
})
</script>

<template>
  <figure class="hof-figure">
    <img :src="withBase(src)" :alt="alt ?? ''" :style="{ maxHeight: height }">
    <figcaption v-if="caption || source">
      <span v-if="caption">{{ caption }}</span>
      <span v-if="source" class="hof-figure__source">Quelle: {{ source }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.hof-figure {
  margin: 0;
}

.hof-figure img {
  display: block;
  width: 100%;
  object-fit: contain;
  object-position: left center;
}

.hof-figure figcaption {
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  font: 400 15px/21px var(--hof-font-body);
}

.hof-figure__source {
  color: var(--hof-text-muted);
  font-size: 13px;
  line-height: 18px;
}
</style>
