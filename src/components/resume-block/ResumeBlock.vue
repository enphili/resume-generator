<template>
  <div class="card card-w70">

    <h3 v-if="isEmpty">Добавьте первый блок, чтобы увидеть результат</h3>
    <div v-else>


      <component
        v-for="(bullet, idx) in resume"
        :key="idx"
        :is="'resume-' + bullet.type"
        :value="bullet.value"
      ></component>

    </div>
  </div>
</template>

<script>
import ResumeTitle from '@/components/resume-block/ResumeTitle'
import ResumeAvatar from '@/components/resume-block/ResumeAvatar'
import ResumeSubtitle from "@/components/resume-block/ResumeSubtitle";
import ResumeText from "@/components/resume-block/ResumeText";

export default {
  props: {
    resume: {
      type: Array,
      required: true,
    }
  },

  computed: {
    isEmpty() {
      return this.resume[1].value.length === 0
    },
  },

  components: {
    ResumeTitle,
    ResumeAvatar,
    ResumeSubtitle,
    ResumeText
  }
}
</script>
