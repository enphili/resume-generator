<template>
  <div class="bullet-wrap">
    <resume-editor
      @del-bullet="$emit('rem-bull')"
    ></resume-editor>
    <h2>{{ $attrs.content }}</h2>
  </div>

</template>

<script>
import ResumeEditor from '@/components/resume-block/ResumeEditor'

export default {
  emits: ['rem-bull'],
  components: {ResumeEditor}
}
</script>

<style lang="sass">
.bullet-wrap
  position: relative

</style>
