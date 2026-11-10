<script setup lang="ts">
defineProps<{ kicker?: string, frontmatter?: Record<string, unknown> }>()
</script>

<template>
  <div class="hof-slide hof-prose">
    <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
    <slot />
  </div>
</template>
