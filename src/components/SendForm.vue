<script>
import { mapState } from 'vuex';
import { store } from '@/store';
import ThePopup from './ThePopup.vue'
import ErrorMessage from './ErrorMessage.vue'
import TheSelect from './TheSelect.vue'
export default {
  components: {
    ThePopup,
    ErrorMessage,
    TheSelect
  },
  computed: {
    ...mapState([
      'nameError', 
      'emailError', 
      'phoneError', 
      'name', 
      'email', 
      'phone', 
      'cities',
      'selectedCity',
      'response'
    ]),
  },
  methods: {
    onNameChange(e) {
      store.commit('setName', e.target.value)
    },
    onEmailChange(e) {
      store.commit('setEmail', e.target.value)
    },
    onPhoneChange(e) {
      store.commit('setPhone', e.target.value)
    },
    onSelectedChange(id) {
      store.commit('setCity', id);
    },
    onSend() {
      store.dispatch('send');
    }
  }
};
</script>

<template>
  <ThePopup>
    <template v-if="!response">
      <div class="flex flex-col">
        <label for="name">Имя</label>
        <input
          type="text"
          id="name"
          class="border-blue-800 border-2 rounded p-1 h-9"
          @input="onNameChange"
          :value="name"
        />
        <ErrorMessage :errorVisible="nameError" />
      </div>
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="border-blue-800 border-2 rounded p-1 h-9"
          @input="onEmailChange"
          :value="email"
        />
        <ErrorMessage :errorVisible="emailError" />
      </div>
      <div class="flex flex-col">
        <label for="phone">Телефон</label>
        <input
          type="tel"
          v-maska
          data-maska="+7 (###) ###-##-##"
          @input="onPhoneChange"
          :value="phone"
          class="border-blue-800 border-2 rounded p-1 h-9"
        />
        <ErrorMessage :errorVisible="phoneError" />
      </div>
      <TheSelect :list="cities" :selected="selectedCity?.name || '----'" @select="onSelectedChange"></TheSelect>
      <button @click="onSend">Отправить</button>
    </template>
    <div v-else v-html="response.data"></div>
  </ThePopup>
</template>