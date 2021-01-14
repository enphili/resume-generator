<template>
  <div class="bullet-wrap">
    <resume-editor></resume-editor>
    <p>{{ $attrs.content }}</p>
  </div>
</template>

<script>
import ResumeEditor from '@/components/resume-block/ResumeEditor'
export default {
  components: {ResumeEditor}
}
</script>
