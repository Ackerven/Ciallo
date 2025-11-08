<template>

  <div>
    <p
      v-for="bullet in bullets"
      :key="bullet.id"
      class="bullet-text"
      :style="styleOfBullet(bullet)"
      :ref="el => { if (el) elMap.set(bullet.id, el); else elMap.delete(bullet.id); }"
    >
      {{ bullet.text }}
    </p>
  </div>

</template>

<script setup>
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';
  import { randomMixOklchColor } from '../utils/color';

  const props = defineProps({
    strings: {type: Array, default: () => ["Oops!"]},
    duration: {type: Number, default: 10}
  })

  function randomString() {
    return props.strings[Math.floor(Math.random() * props.strings.length)];
  }

  const bullets = ref([]);
  const animations = new Map();
  const elMap = new Map();

  function createBullet() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const text = randomString();
    const track = Math.random() * 100;
    const duration = props.duration * 1000;
    const delay = Math.random() * (props.duration * 100);
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
    }
  }

  function startBulletAnimation(e, bullet) {
    const animation = e.animate(
      [
        { transform: 'translateX(0vw)'},
        { transform: 'translateX(-150vw)'}
      ],
      {
        duration: bullet.duration,
        delay: bullet.delay,
        iterations: 1,
        easing: 'linear'
      }
    );

    animation.onfinish = () => removeBullet(bullet.id);
    animations.set(bullet.id, animation);
  }

  let timer;
  function startTimer() {
    if (!timer) {
      timer = setInterval(async () => {
        if (bullets.value.length < 91 && Math.random() > 0.2) {
          const bullet = createBullet();
          bullets.value.push(bullet);
          await nextTick();
          const e = elMap.get(bullet.id);
          if (e) {
            startBulletAnimation(e, bullet);
          }
        }
      }, 500);
    }
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function visibilityChangeListener() {
    if (document.visibilityState === 'visible') {
      animations.forEach(animation => animation.play());
      startTimer();
    } else {
      animations.forEach(animation => animation.pause());
      stopTimer();
    }
  }

  onMounted(async () => {
    for(let i = 0; i < 5; i++) {
      bullets.value.push(createBullet());
    }

    await nextTick();
    bullets.value.forEach( b => {
      const e = elMap.get(b.id);
      if (e) {
        startBulletAnimation(e, b);
      }
    });

    startTimer();
    document.addEventListener('visibilitychange', visibilityChangeListener);
  })

  onUnmounted(() => {
    stopTimer();

    animations.forEach(anim => {
      anim.onfinish = null;
      anim.cancel();
    });
    animations.clear();

    bullets.value.splice(0);

    document.removeEventListener('visibilitychange', visibilityChangeListener);
  })

  function removeBullet(id) {
    const index = bullets.value.findIndex(b => b.id === id);
    if (index !== -1) {
      bullets.value.splice(index, 1);
      animations.delete(id);
      elMap.delete(id);
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
  }

</style>