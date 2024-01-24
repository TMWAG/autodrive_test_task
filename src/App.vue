<script>
import TheButton from './components/TheButton.vue'
import { store } from './store'
import SendForm from './components/SendForm.vue'
export default {
  components: {
    TheButton,
    SendForm
},
  computed: {},
  methods: {
    showPopup(id) {
      store.commit('showPopup', id);
    }
  }
}
</script>

<template>
  <TheButton @click="showPopup(1)">Заказать в Москву</TheButton>
  <TheButton @click="showPopup(2)">Заказать в Санкт-Петербурге</TheButton>
  <SendForm/>
</template>
