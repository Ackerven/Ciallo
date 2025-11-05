<template>
  <div class="app">

    <div class="slogan-layer">
      <Slogan :text="CIALLO_WITH_KAOMOJI" :duration="1" />
    </div>

  </div>
</template>

<script setup>

  import Slogan from './components/Slogan.vue';

  const CIALLO_WITH_KAOMOJI = 'Ciallo ~ (∠・ω< )⌒★'

</script>

<style scoped>

.app {
  position: relative;
  width: 100dvw;
  height: 100dvh;
  /* Mobile compatibility enhancement */
  min-height: 100vh;
  overflow: hidden;
  background: white;
}

.slogan-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

</style>
