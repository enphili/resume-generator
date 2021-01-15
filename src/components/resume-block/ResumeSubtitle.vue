<template>
  <div class="bullet-wrap">
    <resume-editor
      @del-bullet="$emit('rem-bull')"
      @edit-bullet="editBullet"
    ></resume-editor>
    <h2
      :contenteditable="contentEditable"
      :class="{ editable : contentEditable }"
      ref="editableText"
      @blur="endEdit"
    >{{ $attrs.content }}</h2>
  </div>

</template>

<script>
import ResumeEditor from '@/components/resume-block/ResumeEditor'

export default {
  emits: {
    'rem-bull': null,
    'edt-bull':null,
    'send-editable-text'(text) {
      return text && text.length > 0 && typeof text === 'string'
    }
  },

  data() {
    return {
      contentEditable: false
    }
  },

  methods: {
    editBullet() {
      this.contentEditable = true
      this.$nextTick(function() {
        this.$refs.editableText.focus()
      })
    },

    endEdit() {
      this.contentEditable = false
      const text = this.$refs.editableText.textContent
      this.$emit('send-editable-text', text)
    }
  },

  components: {ResumeEditor}
}
</script>

<style lang="sass">
.bullet-wrap
  position: relative
.editable
  border: 2px solid #42b983
  border-radius: 5px
  &:focus
    outline: none

</style>
