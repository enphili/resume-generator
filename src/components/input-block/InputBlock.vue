<template>
  <form class="card card-w30" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="formData.selectType">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="formData.value" @focus="isValid=true"></textarea>
      <small class="small-error" v-if="!isValid">{{ errmsg }}</small>
    </div>

    <primary-button>Добавить</primary-button>

  </form>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  emits: {
    'submit-data': formData => {
      if (formData.selectType && formData.value.length < 4 ) {
        return false
      } else {
        return true
      }
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
      formData: {
        selectType: 'title',
        value: ''
      },
      isValid: true
    }
  },

  methods: {
    submitForm() {
      if (this.checkTextArea < 4) {
        this.isValid = false
      } else {
        this.isValid = true
        this.$emit('submit-data', this.formData)
      }
    }
  },

  computed: {
    checkTextArea() {
      return this.formData.value.length
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
