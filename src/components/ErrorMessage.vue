<script>
export default {
  props: {
    errorVisible: Boolean,
  },
}
</script>

<template>
  <span v-show="errorVisible" class="text-center text-red-500">Обязательное поле</span>
</template>