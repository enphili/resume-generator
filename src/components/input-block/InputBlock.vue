<template>
  <form class="card card-w30" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="selectType" @change="value = ''">
        <option :value="typeArray[1]">Заголовок</option>
        <option :value="typeArray[2]">Подзаголовок</option>
        <option :value="typeArray[0]">Аватар</option>
        <option :value="typeArray[3]">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="value" @focus="isValid=true"></textarea>
      <small class="small-error" v-if="!isValid">{{ invalTaxAr }}</small>
    </div>

    <primary-button
      :disabled="disabledButton"
    >Добавить</primary-button>

  </form>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import {toUpperCaseFirstLetter} from '@/utils/supportFunctions'

export default {
  inject: ['typeArray', 'invalTaxAr'],

  emits: {
    'submit-data'(a, b) {
      return !!(a && b.length >= 4)
    }
  },

  data() {
    return {
      selectType: 'title',
      value: '',
      isValid: true
    }
  },

  methods: {
    submitForm() {
      if (this.checkTextArea < 4) {
        this.isValid = false
      } else {
        this.isValid = true
        if (this.selectType === this.typeArray[1] || this.selectType === this.typeArray[2]) {
          this.value = toUpperCaseFirstLetter(this.value)
        }
        this.$emit('submit-data', this.selectType, this.value)
        this.value = ''
        this.selectType = 'title'
      }
    }
  },

  computed: {
    checkTextArea() {
      return this.value.length
    },

    disabledButton() {
      return this.checkTextArea < 4
    }
  },

  components: {
    PrimaryButton,
  }
}

</script>

<style lang="sass">
.small-error
  color: #c25205
</style>
