<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useChapters } from '../composables/useChapters'

const { go } = useNav()
const { chapters } = useChapters()

// Bis sechs Kapitel als Kacheln wie auf der Startseite, sonst als Liste.
const asTiles = computed(() => chapters.value.length <= 6)
// Die Liste liest sich spaltenweise von oben nach unten.
const rows = computed(() => Math.ceil(chapters.value.length / 2))

function jump(event: MouseEvent, no: number) {
  // Ein fokussierter Button würde sonst die Pfeiltasten abfangen.
  ;(event.currentTarget as HTMLElement).blur()
  go(no)
}
</script>

<template>
  <nav
    class="agenda"
    :class="asTiles ? 'agenda--tiles' : 'agenda--rows'"
    :style="asTiles ? undefined : { gridTemplateRows: `repeat(${rows}, auto)` }"
    aria-label="Agenda"
  >
    <p v-if="!chapters.length" class="agenda__empty">
      Noch keine Kapitel. Ein Kapitel beginnt mit einer Folie im Layout section.
    </p>
    <button
      v-for="chapter in chapters"
      :key="chapter.no"
      type="button"
      class="agenda__item"
      :class="asTiles ? ['hof-plane', `hof-color-${chapter.color}`] : []"
      @click="jump($event, chapter.no)"
    >
      <span class="agenda__no">Kapitel {{ chapter.index + 1 }}</span>
      <span class="agenda__title">{{ chapter.title }}</span>
    </button>
  </nav>
</template>

<style scoped>
.agenda__item {
  display: flex;
  border: 0;
  text-align: left;
  cursor: pointer;
}

.agenda__item:focus-visible {
  outline: 3px solid var(--hof-accent);
  outline-offset: 2px;
}

.agenda__no {
  font: 400 15px/21px var(--hof-font-body);
}

.agenda__title {
  font: 400 20px/28px var(--hof-font-heading);
  hyphens: auto;
}

.agenda__empty {
  grid-column: 1 / -1;
  font: 400 18px/27px var(--hof-font-body);
}

.agenda--tiles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 180px;
}

.agenda--tiles .agenda__item {
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  padding: 24px 20px;
}

.agenda--rows {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}

.agenda--rows .agenda__item {
  align-items: baseline;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid var(--hof-ink-rule);
  background: none;
}

.agenda--rows .agenda__no {
  flex: none;
  width: 72px;
  color: var(--hof-accent);
}

.agenda--rows .agenda__title {
  font-size: 18px;
  line-height: 26px;
}
</style>
