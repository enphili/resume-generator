<template>
  <div class="card card-w70">

    <h3 v-if="isEmpty">Добавьте первый блок, чтобы увидеть результат</h3>

    <div v-else>
      <component
        v-for="(bullet, idx) in resume"
        :key="idx"
        :is="'resume-' + bullet.type"
        v-bind="{content: bullet.value}"
        @rem-bull="$emit('del-bull', idx)"
        @send-editable-text="$emit('editable-text', $event, idx)"
      ></component>
    </div>

    <div v-if="readyToSave">
      <hr>
      <primary-button class="primary" @click="$emit('save-to-bd')" :disabled="isSaved">сохранить резюме</primary-button>
    </div>

    <alert-block v-if="showAlertSuccess" :class="[showAlertSuccess ? 'primary' : 'danger']">
      <template v-slot:header>
        {{ showAlertSuccess ? 'Успешно!' : 'Ошибка!' }}
      </template>
      <template v-slot:text>
        {{ showAlertSuccess ? fetchSaveSuccess : fetchSaveFailed }}
      </template>
    </alert-block>

  </div>
</template>

<script>
import ResumeTitle from '@/components/resume-block/ResumeTitle'
import ResumeAvatar from '@/components/resume-block/ResumeAvatar'
import ResumeSubtitle from '@/components/resume-block/ResumeSubtitle'
import ResumeText from '@/components/resume-block/ResumeText'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import AlertBlock from '@/components/alerts/AlertBlock'
import {compare} from '@/utils/supportFunctions'

export default {
  emits: ['save-to-bd', 'del-bull', 'editable-text'],

  inject: ['selectValueArray', 'fetchSaveSuccess', 'fetchSaveFailed'],

  props: {
    resume: {
      type: Array,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false
    },
    showAlertSuccess: {
      type: Boolean,
      default: false
    },
    isSubmitDone: {
      type: Boolean,
      default: false
    }
  },


  computed: {
    isEmpty() {
      return this.resume[1].value.length === 0
    },

    readyToSave() {
      const receivedSelectValueArray = []
      this.resume.forEach(el => receivedSelectValueArray.push(el.type))
      const onlyTypeInSelectArray = this.selectValueArray.map(type => type.value)
      return compare(receivedSelectValueArray, onlyTypeInSelectArray) && this.isSubmitDone
    },

  },

  components: {
    ResumeTitle,
    ResumeAvatar,
    ResumeSubtitle,
    ResumeText,
    PrimaryButton,
    AlertBlock
  }
}
</script>
