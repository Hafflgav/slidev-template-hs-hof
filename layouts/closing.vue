<script setup lang="ts">
withDefaults(defineProps<{
  kicker?: string
  contactLabel?: string
  frontmatter?: Record<string, unknown>
}>(), {
  contactLabel: 'Kontakt',
})
</script>

<template>
  <div class="hof-slide closing">
    <!-- Dasselbe Motiv wie auf der Titelfolie, mit der Kontaktfläche an Stelle
         des Fotos. Vorbild für die gelbe Fläche ist die Kontaktkarte auf der
         Fakultätsseite Informatik. -->
    <div class="closing__motif">
      <div class="closing__panel hof-plane hof-color-yellow hof-prose">
        <p class="hof-kicker">{{ contactLabel }}</p>
        <slot name="contact" />
      </div>
      <div class="closing__bar hof-plane hof-color-green" aria-hidden="true" />
      <div class="closing__square hof-plane hof-color-red hof-multiply" aria-hidden="true" />
    </div>

    <HofLogo class="closing__logo" />
    <div class="closing__text hof-prose">
      <p v-if="kicker" class="hof-kicker">{{ kicker }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Logo oben, Text unten: ein langer Titel kann so nicht in das Logo laufen. */
.closing {
  display: grid;
  grid-template-columns: 365px;
  grid-template-rows: auto 1fr auto;
}

.closing__logo {
  width: 170px;
}

.closing__text {
  grid-row: 3;
}

.closing__text :deep(h1) {
  max-width: none;
  margin-bottom: 12px;
  font-size: 40px;
  line-height: 52px;
  hyphens: auto;
  overflow-wrap: anywhere;
}

.closing__text :deep(p:last-child) {
  margin-bottom: 0;
}

/* Balken und Quadrat hängen am unteren Rand der Kontaktfläche und wandern mit,
   wenn sie wächst. Der Text beginnt rechts davon. */
.closing__motif {
  position: absolute;
  top: 100px;
  right: 0;
  width: 535px;
}

.closing__panel {
  box-sizing: border-box;
  width: 480px;
  min-height: 300px;
  margin-left: auto;
  padding: 32px 28px 32px 125px;
  overflow-wrap: anywhere;
}

.closing__panel :deep(p:not(.hof-kicker)) {
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 27px;
}

.closing__panel :deep(a[href]) {
  font-weight: inherit;
}

.closing__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 109px;
  height: 272px;
}

.closing__square {
  position: absolute;
  bottom: -54px;
  left: 55px;
  width: 109px;
  height: 109px;
}
</style>
