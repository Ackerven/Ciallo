<template>
  <div class="jumper">
    <span
      v-for="(c, i) in slogan"
      :key="i"
      class="jumper-char"
      :style="{ animationDelay: `${(duration * i) / slogan.length}s`}"
    >
      {{ c }}
    </span>
  </div>
</template>

<script setup>

  import { computed } from 'vue';

  const props = defineProps({
    text: {type: String, default: 'N/A'},
    duration: {type: Number, default: 1}
  })

  const slogan = computed(() => [...props.text])

</script>

<style scoped>

.jumper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(36px, 8vw, 90px);
  white-space: nowrap;
  color: #000;
  user-select: none;
}

.jumper-char {
  display: inline-block;
  animation: bounce 0.3s ease infinite alternate;
  will-change: transform;
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -0.5em, 0)
  }
}

</style>