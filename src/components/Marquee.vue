<template>

  <div>
    <p
      v-for="bullet in bullets"
      :key="bullet.id"
      class="bullet-text"
      :style="styleOfBullet(bullet)"
      @animationend="removeBullet(bullet.id)"
    >
      {{ bullet.text }}
    </p>
  </div>

</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { randomMixOklchColor } from '../utils/color';

  const props = defineProps({
    strings: {type: Array, default: () => ["Oops!"]},
    duration: {type: Number, default: 10}
  })

  function randomString() {
    return props.strings[Math.floor(Math.random() * props.strings.length)];
  }

  const bullets = ref([]);

  function createBullet() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const text = randomString();
    const track = Math.random() * 100;
    const duration = props.duration;
    const delay = Math.random() * (props.duration / 10);
    const color = randomMixOklchColor();
    const size = 14 + Math.random() * 52;
    const opacity = 0.7 + Math.random() * 0.3;

    return { id, text, track, duration, delay, color, size, opacity }
  }

  function styleOfBullet(bullet) {
    return {
      top: `${bullet.track}%`,
      color: bullet.color,
      fontSize: `${bullet.size}px`,
      opacity: bullet.opacity,
      animationDuration: `${bullet.duration}s`,
      animationDelay: `${bullet.delay}s`
    }
  }

  let timer;
  onMounted(() => {
    for(let i = 0; i < 5; i++) {
      let bullet = createBullet();
      bullets.value.push(bullet);
    }

    timer = setInterval(() => {
    if (bullets.value.length < 100 && Math.random() > 0.2) {
      bullets.value.push(createBullet());
    }
  }, 500);
  })

  onUnmounted(() => {
    bullets.value.splice(0);
    clearInterval(timer);
  })

  function removeBullet(id) {
    const index = bullets.value.findIndex(b => b.id === id);
    if (index !== -1) {
      bullets.value.splice(index, 1);
    }
  }

</script>

<style scoped>

  .bullet-text {
    position: absolute;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    touch-action: none;
    left: 100vw;
    will-change: transform;
    animation-name: scrollBullet;
    animation-timing-function: linear;
  }

  @keyframes scrollBullet {
    0% {
      transform: translateX(0vw);
    }
    100% {
      transform: translateX(-150vw);
    }
  }

</style>