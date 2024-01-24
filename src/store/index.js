import { Mask } from 'maska'
import axios from 'axios'
import { createStore } from 'vuex'

const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

export const store = createStore({
  state: {
    name: '',
    nameError: false,
    email: '',
    emailError: false,
    phone: '',
    phoneError: false,
    cities: [
      { id: 1, name: 'Москва' },
      { id: 2, name: 'Санкт-Петербург' },
      { id: 3, name: 'Казань' }
    ],
    selectedCity: undefined,
    popupVisibility: false,
    response: ''
  },
  mutations: {
    showPopup(state, cityId) {
      state.selectedCity = state.cities.find((c) => c.id === cityId)
      state.popupVisibility = true
    },
    hidePopup(state) {
      state.popupVisibility = false
    },
    setName(state, newName) {
      state.name = newName
      if (!newName) state.nameError = true
      else state.nameError = false
    },
    setEmail(state, newEmail) {
      if (!emailRegex.test(newEmail)) {
        state.emailError = true
      } else {
        state.emailError = false
      }
      state.email = newEmail
    },
    setPhone(state, newPhone) {
      state.phone = newPhone
      if (state.phone.length < 18) state.phoneError = true
      else state.phoneError = false
    },
    setCity(state, newCityId) {
      state.selectedCity = state.cities.find((c) => c.id === newCityId)
    },
    resetData(state) {
      state.name = ''
      state.email = ''
      state.phone = ''
    },
    setResponse(state, response) {
      state.response = response;
    }
  },
  actions: {
    async send(context) {
      const { name, email, phone } = context.state
      if (!name) {
        context.state.nameError = true
        return
      }
      if (!emailRegex.test(email)) {
        context.state.emailError = true
        return
      }
      if (phone.length < 18) {
        context.state.phoneError = true
        return
      }
      const mask = new Mask({ mask: '+7 (###) ###-##-##' })
      try {
        context.commit('setResponse', await axios.post(
          'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
          {
            name,
            phone: `+7${mask.unmasked(phone)}`,
            email,
            city_id: context.state.selectedCity.id
          }
        ))
      } catch (error) {
        context.commit('setResponse', error.response);
      }
    }
  }
})
