<template>
  <div class="app">

    <div class="slogan-layer" @click="playMegeruAudio">
      <Slogan :text="CIALLO_WITH_KAOMOJI" :duration="1" />
    </div>

    <Marquee :strings="[CIALLO_WITH_KAOMOJI]" :duration="16" />

    <div class="footer">
      <Footer
        :year="2025"
        :name="'Ackerven'" :link="'https://ackerven.com'"
        :repo="'https://github.com/ackerven/Ciallo'"
      />
    </div>

  </div>
</template>

<script setup>

  import Slogan from './components/Slogan.vue';
  import megeruAudio from './assets/meguru.aac';
  import Marquee from './components/Marquee.vue';
  import Footer from './components/Footer.vue';

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

.footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 90%;
  z-index: 10;
}

</style>
