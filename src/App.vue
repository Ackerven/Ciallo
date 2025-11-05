<template>
  <div class="app">

    <div class="slogan-layer" @click="playMegeruAudio">
      <Slogan :text="CIALLO_WITH_KAOMOJI" :duration="1" />
    </div>

  </div>
</template>

<script setup>

  import Slogan from './components/Slogan.vue';
  import megeruAudio from './assets/meguru.aac';

  const CIALLO_WITH_KAOMOJI = 'Ciallo ~ (∠・ω< )⌒★';

  function playMegeruAudio() {
    const sound = new Audio(megeruAudio);
    sound.play().catch(err => console.warn('Megeru audio play failed', err))
  }

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
