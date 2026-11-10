<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  color?: 'soft' | 'yellow' | 'green' | 'red' | 'blue'
  icon?: string
}>(), {
  color: 'soft',
})
</script>

<template>
  <article class="hof-card hof-plane hof-prose" :class="`hof-color-${color}`">
    <div v-if="icon" class="hof-card__icon" :class="icon" aria-hidden="true" />
    <h3 v-if="title" class="hof-card__title">{{ title }}</h3>
    <div class="hof-card__body"><slot /></div>
  </article>
</template>

<style scoped>
.hof-card {
  box-sizing: border-box;
  padding: 27px 20px;
  hyphens: auto;
}

.hof-card__icon {
  margin-bottom: 12px;
  font-size: 28px;
}

.hof-card__title {
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 28px;
}

.hof-card__body :deep(p),
.hof-card__body :deep(li) {
  font-size: 18px;
  line-height: 27px;
}

.hof-card__body :deep(:last-child) {
  margin-bottom: 0;
}
</style>
