<template>
  <div class="container">
    <p>
      <primary-button @click="$emit('load-comments')">Загрузить комментарии</primary-button>
    </p>

    <error-alert v-if="isErrAlert"></error-alert>

    <div v-else class="card">
      <h2>Комментарии</h2>
      <ul class="list">

        <single-comment
          v-for="(comment, idx) in allComments"
          :key="comment.id"
          :singlcoment="allComments[idx]"
        ></single-comment>

      </ul>
    </div>

    <loader-in-comment v-if="isLoader"></loader-in-comment>

  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton"
import LoaderInComment from '@/components/comments-block/LoaderInComment'
import SingleComment from '@/components/comments-block/SingleComment'
import ErrorAlert from '@/components/comments-block/ErrorAlert'

export default {
  emits: {
    'load-comments': null
  },

  props: {
    isLoader: {
      type: Boolean,
      default: false,
      required: true
    },
    isErrAlert: {
      type: Boolean,
      default: false,
    },
    allComments: {
      type: Array
    }
  },


  components: {
    PrimaryButton,
    LoaderInComment,
    SingleComment,
    ErrorAlert
  }
}
</script>

<style scoped>

</style>
