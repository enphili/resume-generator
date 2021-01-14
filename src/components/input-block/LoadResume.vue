<template>
  <div class="load-resume">

    <primary-button
      @click="$emit('load-resume')"
    >загрузить резюме</primary-button>

    <loader-in-input-block
      v-if="showResumeLoader"
    ></loader-in-input-block>

    <ul
      class="load-resume__ul" :class="{activate: showResumeLi}">
      <li
        v-for="(resume, idx) in allResumeFromBD"
        :key="idx"
      >
        <a href="#" @click.prevent="$emit('show-selected-resume', idx)">{{ resume[1].title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import LoaderInInputBlock from '@/components/input-block/LoaderInInputBlock'
export default {
  emits: {
    'load-resume': null,
    'show-selected-resume'(key) {
      if (key && typeof key === 'string') return true
    }
  },

  props: ['showResumeLi', 'showResumeLoader', 'allResumeFromBD'],

  components: {
    PrimaryButton,
    LoaderInInputBlock
  }
}
</script>

<style lang="sass">
.load-resume
  margin-top: 15px
  &__ul
    margin-top: 5px
    height: 0
    width: 0
    opacity: 0
    list-style: none
    padding-left: 0px
    border: 2px solid #ccc
    overflow: hidden
    transition: height 0.3s, opacity 0.3s
  &__ul li
    cursor: pointer
    margin-left: 10px
  &__ul li:hover
    background: #95e3c0
  &__ul a
    display: block
    color: #222222
  &__ul.activate
    height: auto
    width: auto
    opacity: 1
</style>
