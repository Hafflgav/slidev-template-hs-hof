<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="step">
    <span class="step__marker hof-plane hof-color-soft" aria-hidden="true" />
    <div class="step__body">
      <strong v-if="label" class="step__label">{{ label }}</strong>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.step {
  display: grid;
  grid-template-columns: 36px 1fr;
  column-gap: 12px;
  align-items: start;
  counter-increment: hof-step;
}

.step__marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font: 400 16px/1 var(--hof-font-heading);
}

.step__marker::before {
  content: counter(hof-step);
}

.step__body {
  font: 400 18px/27px var(--hof-font-body);
}

.step__label {
  display: block;
  font-weight: 700;
}

.step__body :deep(p) {
  margin: 0;
}
</style>
