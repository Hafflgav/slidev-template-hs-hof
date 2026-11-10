<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  kicker?: string
  leftIsGood?: boolean
  leftLabel?: string
  rightLabel?: string
  goodLabel?: string
  badLabel?: string
  frontmatter?: Record<string, unknown>
}>(), {
  leftIsGood: false,
  leftLabel: 'Variante A',
  rightLabel: 'Variante B',
  goodLabel: 'Empfohlen',
  badLabel: 'Vermeiden',
})

const verdict = (good: boolean) => ({
  label: good ? props.goodLabel : props.badLabel,
  color: good ? 'hof-color-green' : 'hof-color-red',
})

const left = computed(() => verdict(props.leftIsGood))
const right = computed(() => verdict(!props.leftIsGood))
</script>

<template>
  <div class="hof-slide hof-prose goodbad">
    <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
    <slot />
    <div class="goodbad__panels">
      <section class="goodbad__panel hof-plane hof-color-soft">
        <header class="goodbad__head">
          <span>{{ leftLabel }}</span>
          <v-click at="1"><span class="goodbad__verdict hof-plane" :class="left.color">{{ left.label }}</span></v-click>
        </header>
        <slot name="left" />
      </section>
      <section class="goodbad__panel hof-plane hof-color-soft">
        <header class="goodbad__head">
          <span>{{ rightLabel }}</span>
          <v-click at="1"><span class="goodbad__verdict hof-plane" :class="right.color">{{ right.label }}</span></v-click>
        </header>
        <slot name="right" />
      </section>
    </div>
    <v-click at="1">
      <div v-if="$slots.legend" class="goodbad__legend"><slot name="legend" /></div>
    </v-click>
  </div>
</template>

<style scoped>
.goodbad__panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.goodbad__panel {
  padding: 20px;
}

.goodbad__panel :deep(p:last-child),
.goodbad__panel :deep(ul:last-child) {
  margin-bottom: 0;
}

.goodbad__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  margin-bottom: 12px;
  font: 400 20px/28px var(--hof-font-heading);
}

.goodbad__verdict {
  display: inline-block;
  padding: 2px 12px;
  font: 400 15px/24px var(--hof-font-heading);
}

.goodbad__legend {
  margin-top: 16px;
}

.goodbad__legend :deep(p) {
  margin-bottom: 0;
}
</style>
