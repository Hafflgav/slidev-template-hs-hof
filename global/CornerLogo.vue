<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import HofLogo from '../components/HofLogo.vue'

const { currentLayout } = useNav()
// Titel und Abschluss zeigen das Logo groß im eigenen Layout.
const visible = computed(() => !['cover', 'closing'].includes(currentLayout.value ?? ''))
</script>

<template>
  <div v-if="visible" class="corner-logo" aria-hidden="true">
    <HofLogo />
  </div>
</template>

<style scoped>
/* Bündig mit dem rechten Inhaltsrand; Schutzraum etwa eine Emblembreite
   (Annahme, siehe docs/quellen.md). */
.corner-logo {
  position: absolute;
  top: 22px;
  right: 56px;
  width: 92px;
  pointer-events: none;
}

.corner-logo :deep(img) {
  display: block;
  width: 100%;
}
</style>
