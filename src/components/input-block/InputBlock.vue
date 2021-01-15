<template>
  <div class="card card-w30">
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model="selectType" @change="changeValue">
          <option :value="typeArray[1]">Заголовок</option>
          <option :value="typeArray[2]">Подзаголовок</option>
          <option :value="typeArray[0]">Аватар</option>
          <option :value="typeArray[3]">Текст</option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model.trim="value" @focus="focusTextArea"></textarea>
        <small class="small-error" v-if="!isValid">{{ invalTaxAr }}</small>
      </div>

      <div class="buttons-wrap">
        <primary-button :disabled="disabledButton" class="primary">Добавить</primary-button>
        <a href="#" class="new-resume" @click.prevent="$emit('clear-resume')">new резюме</a>
      </div>

    </form>

    <load-resume
      @load-resume="$emit('load-li-resume')"
      @show-selected-resume="$emit('insert-resume', $event)"
      :showResumeLi="showResumeLi"
      :showResumeLoader="showResumeLoader"
      :allResumeFromBD="resumeArray"
    ></load-resume>

  </div>

</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import LoadResume from '@/components/input-block/LoadResume'
import {toUpperCaseFirstLetter} from '@/utils/supportFunctions'

export default {
  inject: ['typeArray', 'invalTaxAr'],

  emits: {
    'submit-data'(a, b) {
      return !!(a && b.length >= 4)
    },
    'load-li-resume': null,
    'insert-resume': null,
    'clear-resume': null,
    'focus-textarea': null,
    'change-select-value': null
  },

  props: {
    showResumeLi: {
      type: Boolean,
      default: false
    },
    showResumeLoader: {
      type: Boolean,
      default: false
    },
    resumeArray: {
      type: Object
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
      if (this.disabledButton) {
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
    },

    focusTextArea() {
      this.isValid = true
      this.$emit('focus-textarea')
    },

    changeValue() {
      this.value = ''
      this.$emit('change-select-value')
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
    LoadResume
  }
}

</script>

<style lang="sass">
.small-error
  color: #c25205
.buttons-wrap
  display: flex
  justify-content: space-between
  align-items: center
.new-resume
  display: block
  padding: 0.5rem 1rem
  width: fit-content
  border-radius: 99px
  letter-spacing: 0.05em
  color: #2547f8
  white-space: nowrap
  font: 400 13.3333px Arial
  text-transform: uppercase
  font-weight: 700
  border: 1px solid #2547f8
  cursor: pointer
</style>
