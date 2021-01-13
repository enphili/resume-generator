<template>
  <div class="container column">
    <input-block
      @submit-data="submitData"
      :errmsg="errorMsg.inValidTextArea"
    ></input-block>


    <resume-block
      :resume="resumeBullets"
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
      fcherr: this.errorMsg.fetchFailed,
    }
  },

  data() {
    return {
      errorMsg: {
        inValidTextArea: 'Длина сообщения должна быть не менее 4 символов',
        fetchFailed: 'Не удалось загрузить данные с сервера. Попробуйте позже!'
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
      errAlert: false
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

      console.log(this.resumeBullets)
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
