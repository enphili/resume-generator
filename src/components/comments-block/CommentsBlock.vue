<template>
  <div class="container">
    <p>
      <primary-button class="primary" @click="$emit('load-comments')">Загрузить комментарии</primary-button>
    </p>

    <alert-block v-if="isErrAlert" class="danger">
      <template v-slot:header>
        Ошибка!
      </template>
      <template v-slot:text>
        {{ fetchLoadFailed }}
      </template>
    </alert-block>

    <div v-if="isCommentsDone" class="card">
      <h2>Комментарии</h2>
      <ul class="list">

        <single-comment
          v-for="comment in allComments"
          :key="comment.id"
          :singleComment="comment"
        ></single-comment>

      </ul>
    </div>

    <loader-in-comment v-if="isLoader"></loader-in-comment>

  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton"
import LoaderInComment from '@/components/loders/LoaderInComment'
import SingleComment from '@/components/comments-block/SingleComment'
import AlertBlock from '@/components/alerts/AlertBlock'

export default {
  inject: ['fetchLoadFailed'],

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
    },
    isCommentsDone: {
      type: Boolean,
      default: false,
    }
  },


  components: {
    PrimaryButton,
    LoaderInComment,
    SingleComment,
    AlertBlock
  }
}
</script>

<style scoped>

</style>
