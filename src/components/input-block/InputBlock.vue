<template>
  <form class="card card-w30" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="selectType" @change="value = ''">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="value" @focus="isValid=true"></textarea>
      <small class="small-error" v-if="!isValid">{{ errmsg }}</small>
    </div>

    <primary-button
      :disabled="disabledButton"
    >Добавить</primary-button>

  </form>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  emits: {
    'submit-data'(a, b) {
      return !!(a && b.length >= 4)
    }
  },

  props: {
    errmsg: {
      type: String,
      required: true,
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
    toUpperCaseFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },

    submitForm() {
      if (this.checkTextArea < 4) {
        this.isValid = false
      } else {
        this.isValid = true
        if (this.selectType === 'title' || this.selectType === 'subtitle') {
          this.value = this.toUpperCaseFirstLetter(this.value)
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
