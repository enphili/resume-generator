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

  ></comments-block>
</template>

<script>
import InputBlock from '@/components/input-block/InputBlock'
import CommentsBlock from '@/components/comments-block/CommentsBlock'
import ResumeBlock from '@/components/resume-block/ResumeBlock'

export default {
  data() {
    return {
      errorMsg: {
        inValidTextArea: 'Длина сообщения должна быть не менее 4 символов'
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
