<template>
  <div class="container">
    <p>

      <primary-button>Загрузить комментарии</primary-button>

    </p>
    <div class="card">
      <h2>Комментарии</h2>
      <ul class="list">

        <single-comment></single-comment>

      </ul>
    </div>

    <loader-in-comment></loader-in-comment>

  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton"
import LoaderInComment from '@/components/comments-block/LoaderInComment'
import SingleComment from '@/components/comments-block/SingleComment'

export default {

  components: {
    PrimaryButton,
    LoaderInComment,
    SingleComment
  }
}
</script>

<style scoped>

</style>
