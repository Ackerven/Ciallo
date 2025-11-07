<template>
  <p class="footer-text">
    Copyright &copy; {{ copyrightYear }}
    <a target="_blank" rel="noopener noreferrer" :href="props.link">{{ props.name }}</a>.
    All rights reserved.
    <a target="_blank" rel="noopener noreferrer" :href="props.repo">View on GitHub</a>
  </p>
</template>

<script setup>

  import {computed} from 'vue';

  const props = defineProps({
    year: {type: Number, default: 2025},
    name: {type: String, default: "John"},
    link: {type: String, default: "http://example.com"},
    repo: {type: String, default: "https://github.com/"}
  })

  const defaultYear = props.year;
  const currentYear = new Date().getFullYear();

  const copyrightYear = computed(() => {
    if (currentYear < defaultYear) {
      return `${currentYear}-${defaultYear}`;
    } else if (currentYear === defaultYear) {
      return `${defaultYear}`;
    } else {
      return `${defaultYear}-${currentYear}`;
    }
  })

</script>

<style scoped>

.footer-text {
  margin: 0.5em;
  font-size: 0.75em;
}

</style>