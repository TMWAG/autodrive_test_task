<script>
export default {
  data() {
    return {
      open: false
    }
  },
  props: {
    list: Array,
    selected: String
  },
  emits: ['select'],
  methods: {
    select(id) {
      this.$emit('select', id)
      this.open = false
    }
  }
}
</script>

<template>
  <div>
    <label>Город</label>
    <div class="relative" @blur="open = false">
      <div @click="open = !open" @focus="open = true" class="border-2 border-blue-800 h-9 rounded flex p-1 items-center">
        {{ selected }}
      </div>
      <div class="absolute top-0 bg-slate-300 w-full border-2 border-blue-800 rounded" :class="!open ? 'hidden' : ''">
        <div
          v-for="option of list"
          :key="`select-list-item-${option}`"
          @click.self="select(option.id)"
          class="h-9 flex items-center hover:bg-white"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>
