<script setup lang="ts">
import { withBase } from '../utils/withBase'

defineProps<{ image?: string, imageAlt?: string }>()
</script>

<template>
  <!-- Überlappende Flächen wie im Kopfbereich der Website. Ohne Foto steht eine
       blaue Fläche an seiner Stelle (Anpassung, siehe docs/quellen.md). -->
  <div class="motif">
    <img v-if="image" class="motif__image" :src="withBase(image)" :alt="imageAlt ?? ''">
    <div v-else class="motif__image hof-plane hof-color-blue" aria-hidden="true" />
    <div class="motif__bar hof-plane hof-color-green" aria-hidden="true" />
    <div class="motif__square hof-plane hof-color-red hof-multiply" aria-hidden="true" />
  </div>
</template>

<style scoped>
.motif {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.motif__image {
  position: absolute;
  top: 64px;
  right: 0;
  width: 330px;
  height: 327px;
  object-fit: cover;
}

.motif__bar {
  position: absolute;
  top: 119px;
  left: 595px;
  width: 109px;
  height: 272px;
}

.motif__square {
  position: absolute;
  top: 337px;
  left: 650px;
  width: 109px;
  height: 109px;
}
</style>
