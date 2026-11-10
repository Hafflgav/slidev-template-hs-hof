<script setup lang="ts">
withDefaults(defineProps<{
  kicker?: string
  icon?: string
  color?: 'yellow' | 'green' | 'red' | 'blue'
  frontmatter?: Record<string, unknown>
}>(), {
  icon: 'i-lucide-messages-square',
  color: 'yellow',
})
</script>

<template>
  <div class="hof-slide interactive">
    <div class="interactive__band hof-plane hof-color-soft hof-prose">
      <div class="interactive__icon hof-plane" :class="`hof-color-${color}`">
        <div :class="icon" aria-hidden="true" />
      </div>
      <div class="interactive__body">
        <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Das Band beginnt unter dem Logo, damit das Logo auf Weiß steht. */
.interactive__band {
  position: absolute;
  top: 88px;
  right: 0;
  bottom: 48px;
  left: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 112px 1fr;
  column-gap: 32px;
  align-content: center;
  padding: 24px 56px;
}

.interactive__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  font-size: 56px;
}

.interactive__body :deep(h1) {
  max-width: none;
  font-size: 32px;
  line-height: 42px;
}

.interactive__body :deep(p:not(.hof-kicker)),
.interactive__body :deep(li) {
  font-size: 20px;
  line-height: 30px;
}
</style>
