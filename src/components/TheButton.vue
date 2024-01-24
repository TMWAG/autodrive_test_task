<script>
export default {
  emits: ['click']
}
</script>

<template>
  <button
    @click="$emit('click')"
    class="border-blue-800 border-2 bg-white hover:bg-sky-300 rounded py-1 px-2 hover:border-blue-600 transition-colors"
  >
    <slot />
  </button>
</template>
