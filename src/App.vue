<template>
  <div class="container column">
    <resume-builder
      @submit-data="submitData"
      @load-li-resume="loadResume"
      @insert-resume="showSelectedResume"
      @clear-resume="clearResume"
      @focus-textarea="cleanResumeLi"
      @change-select-value="cleanResumeLi"
      :showResumeLi="showResumeLi"
      :showResumeLoader="showResumeLoader"
      :resumeArray="loadedResume"
    ></resume-builder>

    <resume-block
      @save-to-bd="saveResume"
      @del-bull="deleteResumeBullet"
      @editable-text="updateBulletText"
      :resume="resumeBullets"
      :isSaved="isSaved"
      :showAlertSuccess="showAlert"
      :isSubmitDone="isSubmitDone"
    ></resume-block>
  </div>


  <comments-block
    @load-comments="loadComments"
    :isLoader="isLoader"
    :isErrAlert="errAlert"
    :allComments="comments"
    :isCommentsDone="isCommentsDone"
  ></comments-block>
</template>

<script>

import ResumeBuilder from '@/components/resume-builder/ResumeBuilder'
import CommentsBlock from '@/components/comments-block/CommentsBlock'
import ResumeBlock from '@/components/resume-block/ResumeBlock'

export default {
  provide() {
    return {
      fetchLoadFailed: this.arrayMsg.fetchLoadFailed,
      selectValueArray: this.selectValueArray,
      fetchSaveSuccess: this.arrayMsg.fetchSaveSuccess,
      fetchSaveFailed: this.arrayMsg.fetchSaveFailed,
      invalidTextLengthTextArea: this.arrayMsg.invalidTextLengthTextArea
    }
  },

  data() {
    return {
      selectValueArray: [
        {value: 'title', text: 'Заголовок'},
        {value: 'avatar', text: 'Аватар'},
        {value: 'subtitle', text: 'Подзаголовок'},
        {value: 'text', text: 'Текст'}
      ],
      arrayMsg: {
        invalidTextLengthTextArea: 'Длина сообщения должна быть не менее 4 символов',
        fetchLoadFailed: 'Не удалось загрузить данные с сервера. Попробуйте позже!',
        fetchSaveSuccess: 'Данные успешно сохранены в базе данных!',
        fetchSaveFailed: 'Не удалось сохранить данные! Попробуйте позже.'
      },
      resumeBullets: [
        {
          type: '',
          value: ''
        },
        {
          type: '',
          value: ''
        }
      ],
      comments: [],
      isLoader: false,
      errAlert: false,
      isCommentsDone: false,
      isSaved: false,
      showAlert: false,
      savedResumeArray: [],
      showResumeLi: false,
      showResumeLoader: false,
      loadedResume: {},
      isSubmitDone: false
    }
  },

  methods: {
    submitData(selectType, val) {
      if (selectType === this.selectValueArray[0].value) {
        this.resumeBullets[1].type = selectType
        this.resumeBullets[1].value = val
      }
      if (selectType === this.selectValueArray[1].value) {
        this.resumeBullets[0].type = selectType
        this.resumeBullets[0].value = val
      }
      if (selectType !== this.selectValueArray[1].value && selectType !== this.selectValueArray[0].value) {
        this.resumeBullets.push({
          type: selectType,
          value: val
        })
      }
      this.isSaved = false
      this.isSubmitDone = true
    },

    async loadComments() {
      this.isLoader = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42')
        this.comments = await response.json()
        this.errAlert = false
        this.isCommentsDone = true
      } catch (e) {
        this.errAlert = true
      }
      this.isLoader = false
    },

    async saveResume() {
      this.resumeBullets.forEach(el => this.savedResumeArray.push({[el.type]: el.value}))
      try {
        await fetch('https://learnvuecurse-default-rtdb.europe-west1.firebasedatabase.app/resume.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.savedResumeArray)
        })
        this.isSaved = true
        this.showAlert = this.isSaved
        setTimeout(() => {
          this.showAlert = false
        }, 2000)
      } catch (e) {
        console.log(e.message)
      }
      this.savedResumeArray = []
    },

    async loadResume() {
      this.savedResumeArray = []
      this.showResumeLoader = true
      try {
        const response = await fetch('https://learnvuecurse-default-rtdb.europe-west1.firebasedatabase.app/resume.json')
        this.loadedResume = await response.json()
      } catch (e) {
        console.log(e.message)
      }
      this.showResumeLoader = false
      this.showResumeLi = true
    },

    showSelectedResume(key) {
      this.showResumeLi = false
      this.isSubmitDone = false
      this.resumeBullets = []
      this.loadedResume[key].forEach(el => {
        this.resumeBullets.push({
          type: Object.keys(el)[0],
          value: Object.values(el)[0]
        })
      })
      this.comments = []
      this.isCommentsDone = false
    },

    clearResume() {
      this.resumeBullets = [{type: '', value: ''}, {type: '', value: ''}]
      this.savedResumeArray = []
      this.comments = []
      this.loadedResume = {}
      this.showResumeLi = false
      this.isCommentsDone = false
    },

    deleteResumeBullet(idx) {
      this.resumeBullets.splice(idx, 1)
      this.isSaved = false
      this.isSubmitDone = true
    },

    cleanResumeLi() {
      this.loadedResume = {}
      this.showResumeLi = false
    },

    updateBulletText(newText, idx) {
      if (this.resumeBullets[idx].value !== newText) {
        this.resumeBullets[idx].value = newText
        this.isSaved = false
        this.isSubmitDone = true
      }
    }
  },

  components: {
    ResumeBuilder,
    CommentsBlock,
    ResumeBlock
  }
}
</script>



<style lang="sass">
.avatar
  display: flex
  justify-content: flex-start
  width: 150px
  height: 150px
.avatar img
  width: 100%
  height: auto
  object-fit: cover
  border-radius: 50%
</style>
