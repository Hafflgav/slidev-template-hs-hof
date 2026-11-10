<script setup lang="ts">
import { computed } from 'vue'
import { configs, useNav } from '@slidev/client'
import { useChapters } from '../composables/useChapters'

const { currentLayout, currentPage, total } = useNav()
const { chapters } = useChapters()

const visible = computed(() => !['cover', 'closing'].includes(currentLayout.value ?? ''))

const course = computed(() => (configs.themeConfig as any)?.course ?? configs.title ?? '')

const chapter = computed(() =>
  chapters.value.find(c => currentPage.value >= c.no && currentPage.value <= c.lastNo)?.title ?? '',
)

const label = computed(() => [course.value, chapter.value].filter(Boolean).join(' · '))
</script>

<template>
  <div v-if="visible" class="slide-footer" aria-hidden="true">
    <span class="slide-footer__label">{{ label }}</span>
    <span class="slide-footer__page">{{ currentPage }} / {{ total }}</span>
  </div>
</template>

<style scoped>
.slide-footer {
  position: absolute;
  right: 56px;
  bottom: 14px;
  left: 56px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  color: var(--hof-text);
  font: 400 12px/17px var(--hof-font-body);
  pointer-events: none;
}

.slide-footer__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slide-footer__page {
  flex: none;
  font-family: var(--hof-font-heading);
}
</style>
