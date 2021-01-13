<template>
  <div class="container column">
    <input-block
      @submit-data="submitData"
    ></input-block>


    <resume-block
      @save-to-bd="saveResume"
      :resume="resumeBullets"
      :isSaved="isSaved"
      :showAlertSuccess="showAlert"
    ></resume-block>
  </div>


  <comments-block
    @load-comments="loadComments"
    :isLoader="isLoader"
    :isErrAlert="errAlert"
    :allComments="comments"
  ></comments-block>
</template>

<script>
import InputBlock from '@/components/input-block/InputBlock'
import CommentsBlock from '@/components/comments-block/CommentsBlock'
import ResumeBlock from '@/components/resume-block/ResumeBlock'


export default {
  provide() {
    return {
      fcherr: this.arrayMsg.fetchFailed,
      typeArray: this.typeArray,
      dataSuccessSave: this.arrayMsg.successMsg,
      errorMsg: this.arrayMsg.errorMsg,
      invalTaxAr: this.arrayMsg.inValidTextArea
    }
  },

  data() {
    return {
      typeArray: ['avatar', 'title', 'subtitle', 'text'],
      arrayMsg: {
        inValidTextArea: 'Длина сообщения должна быть не менее 4 символов',
        fetchFailed: 'Не удалось загрузить данные с сервера. Попробуйте позже!',
        successMsg: 'Данные успешно сохранены в базе данных!',
        errorMsg: 'Не удалось сохранить данные! Попробуйте позже.'
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
      isSaved: false,
      showAlert: false,
      savedResumeArray: [],
    }
  },

  methods: {
    submitData(selectType, val) {
      if (selectType === 'title') {
        this.resumeBullets[1].type = selectType
        this.resumeBullets[1].value = val
      }
      if (selectType === 'avatar') {
        this.resumeBullets[0].type = selectType
        this.resumeBullets[0].value = val
      }
      if (selectType !== 'title' && selectType !== 'avatar') {
        this.resumeBullets.push({
          type: selectType,
          value: val
        })
      }
      this.isSaved = false
    },

    async loadComments() {
      try {
        this.isLoader = true
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42')
        this.comments = await response.json()
        this.errAlert = false
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

    }
  },

  components: {
    InputBlock,
    CommentsBlock,
    ResumeBlock
  }
}
</script>

<style lang="sass">
.avatar
  display: flex
  justify-content: flex-start
.avatar img
  width: 150px
  height: auto
  border-radius: 50%
</style>
