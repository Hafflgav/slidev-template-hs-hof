<template>
  <div class="step-list">
    <slot />
  </div>
</template>

<style scoped>
.step-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: hof-step;
}
</style>
