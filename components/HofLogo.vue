<script setup lang="ts">
import { logoIsPlaceholder, logoSrc } from '../composables/useLogo'
</script>

<template>
  <img
    class="hof-logo"
    :src="logoSrc"
    :alt="logoIsPlaceholder ? 'Platzhalter für das Logo der Hochschule Hof' : 'Hochschule Hof, University of Applied Sciences'"
  >
</template>
