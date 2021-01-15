<template>
  <div class="bullet-wrap">
    <resume-editor
      @del-bullet="$emit('rem-bull')"
    ></resume-editor>
    <p>{{ $attrs.content }}</p>
  </div>
</template>

<script>
import ResumeEditor from '@/components/resume-block/ResumeEditor'

export default {
  emits: ['rem-bull'],
  components: {ResumeEditor}
}
</script>
