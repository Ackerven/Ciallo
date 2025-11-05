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

</style>