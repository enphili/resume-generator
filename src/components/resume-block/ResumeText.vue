<template>
  <div class="bullet-wrap">
    <resume-editor
      @del-bullet="$emit('rem-bull')"
      @edit-bullet="editBullet"
    ></resume-editor>
    <p
      :contenteditable="isEditable"
      :class="{ editable : isEditable }"
      ref="editableText"
      @blur="endEdit"
    >{{ $attrs.content }}</p>
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
        this.$refs.editableText.focus()
      })
    },

    endEdit() {
      this.isEditable = false
      const text = this.$refs.editableText.textContent
      this.$emit('send-editable-text', text)
    }
  },

  components: {ResumeEditor}
}
</script>
