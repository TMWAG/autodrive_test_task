<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    popupVisibility() {
      return this.$store.state.popupVisibility
    }
  },
  methods: {
    ...mapMutations(['showPopup', 'hidePopup', 'resetData']),
    closePopup() {
      this.resetData();
      this.hidePopup();
    },
  },
}
</script>

<template>
  <div
    @click.self="closePopup"
    v-show="popupVisibility"
    class="bg-red-500 bg-opacity-50 w-screen h-screen z-10 absolute top-0"
  >
    <div
      class="relative top-1/2 left-1/2 bg-white w-fit -translate-x-1/2 -translate-y-1/2 border-blue-950 border-2 rounded p-4 flex flex-col"
    >
      <slot />
    </div>
  </div>
</template>
