<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container text-uppercase">
        <div class="modal-header mb-20">
          <div v-if="form.id">add flight</div>
          <div v-else>change flight</div>
          <div class="cursor-pointer hover" @click="close">
            <svg-icon name="close" />
          </div>
        </div>
        <div class="flex-column flex-1">
          <div class="flex mb-20">
              <div class="modal-slot__label">direction</div>
              <div class="modal-slot__box">
                  <div class="modal-slot__radio" :class="{ 'active': form.direction === 'departure' }">
                    <input
                      v-model="form.direction"
                      value="departure"
                      id="departure"
                      type="radio"
                    />
                    <label for="departure">departure</label>
                  </div>
                  <div class="modal-slot__radio" :class="{ 'active': form.direction === 'arrival' }">
                    <input
                      v-model="form.direction"
                      value="arrival"
                      id="arrival"
                      type="radio"
                    />
                    <label for="arrival">arrival</label>
                  </div>
              </div>
          </div>
          <div class="flex mb-20">
              <div class="modal-slot__label">№ flight</div>
              <div class="modal-slot__box" :class="{ 'error': errors.includes('number') }">
                  <input
                    v-model.trim="form.list.number"
                    required
                    class="modal-slot__input"
                    type="text"
                  />
              </div>
          </div>
          <div class="flex mb-20">
              <div v-if="form.direction === 'departure'" class="modal-slot__label">city of arrival</div>
              <div v-else class="modal-slot__label">city of departure</div>
              <div class="modal-slot__box" :class="{ 'error': errors.includes('city') }">
                  <input v-model="form.list.city"
                    required
                    class="modal-slot__input"
                    type="text"
                  />
              </div>
          </div>
          <div class="flex mb-20">
              <div class="modal-slot__label">{{ form.direction }} date</div>
              <div class="modal-slot__box" :class="{ 'error': errors.includes('date') }">
                  <Datepicker
                    v-model="form.list.date"
                    required
                    format="dd.MM.yyyy HH:mm"
                    class="modal-slot__datepicker"
                    :clearable="false"
                    text-input
                  />
              </div>
          </div>
          <div class="flex mb-20">
              <div class="modal-slot__label">flight status</div>
              <div class="modal-slot__box" :class="{ 'error': errors.includes('city') }">
                  <select class="modal-slot__input select" v-model="form.list.status" required>
                    <option v-for="(item, index) in statusList" :key="index" class="text-uppercase">
                      {{ item }}
                    </option>
                  </select>
              </div>
          </div>
        </div>
        <div class="modal-bottom">
          <button class="text-uppercase hover" @click="toSave">
            save
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/ui/svgIcon.vue'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const store = useStore()
const statusList = ['landed', 'active', 'scheduled', 'delayed', 'cancelled']
const form = computed(() => store.state.formFlight)
const errors = ref([])

const validate = () => {
  errors.value = []
  for (const el in form.value.list) {
    if (!form.value.list[el]) errors.value.push(el)
  }
  return !errors.value.length
}

const toSave = (e) => {
  if (validate()) {
    const endpoint = form.value.id ? 'updateFlight' : 'addFlight'
    store.dispatch(endpoint).then(({ status }) => {
      if (status === 200) {
        close()
        store.dispatch('loadFlights', form.value.direction)
      }
    })
  }
}

const close = () => {
  errors.value = []
  emit('close')
}
</script>

<style lang="scss">
@import "@/assets/sass/modal.scss";
</style>
