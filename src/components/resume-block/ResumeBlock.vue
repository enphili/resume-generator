<template>
  <div class="card card-w70">

    <resume-title></resume-title>

    <resume-avatar></resume-avatar>

    <resume-bullet></resume-bullet>

    <h3>Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import ResumeBullet from '@/components/resume-block/ResumeBullet'
import ResumeTitle from '@/components/resume-block/ResumeTitle'
import ResumeAvatar from '@/components/resume-block/ResumeAvatar'

export default {

  components: {
    ResumeBullet,
    ResumeTitle,
    ResumeAvatar
  }
}
</script>

<style scoped>

</style>
