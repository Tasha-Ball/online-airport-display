<template>
  <div>
    <div id="overlays" class="overlays">
      <svg-icons />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import SvgIcons from '@/components/ui/svgIcons'
</script>

<style lang="scss">
@import "assets/sass/font.scss";
@import "assets/sass/ui.scss";
@import "assets/sass/main.scss";
</style>
