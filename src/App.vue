<template>
  <div class="container column">
    <input-block
      @submit-data="submitData"
      :errmsg="errorMsg.inValidTextArea"
    ></input-block>


    <resume-block

    ></resume-block>
  </div>


  <comments-block

  ></comments-block>
</template>

<script>
import InputBlock from '@/components/input-block/InputBlock'
import CommentsBlock from '@/components/comments-block/CommentsBlock'
import ResumeBlock from '@/components/resume-block/ResumeBlock'

export default {
  data() {
    return {
      formData: {},

      errorMsg: {
        inValidTextArea: 'Длина сообщения должна быть не менее 4 символов'
      }
    }
  },

  methods: {
    submitData(data) {
      this.formData = data
      console.log(this.formData)
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
  justify-content: center
.avatar img
  width: 150px
  height: auto
  border-radius: 50%
</style>
