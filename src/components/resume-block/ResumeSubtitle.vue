<template>
  <div class="bullet-wrap">
    <resume-editor
      @del-bullet="$emit('rem-bull')"
      @edit-bullet="editBullet"
    ></resume-editor>
    <h2
      :contenteditable="isEditable"
      :class="{ editable : isEditable }"
      ref="editableSubTitle"
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
      isEditable: false
    }
  },

  methods: {
    editBullet() {
      this.isEditable = true
      this.$nextTick(function() {
        this.$refs.editableSubTitle.focus()
      })
    },

    endEdit() {
      this.isEditable = false
      const text = this.$refs.editableSubTitle.textContent
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
