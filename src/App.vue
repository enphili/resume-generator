<template>
  <div class="container column">
    <input-block
      @submit-data="submitData"
      @load-li-resume="loadResume"
      @insert-resume="showSelectedResume"
      @clear-resume="clearResume"
      :showResumeLi="showResumeLi"
      :showResumeLoader="showResumeLoader"
      :resumeArray="loadedResume"
    ></input-block>

    <resume-block
      @save-to-bd="saveResume"
      :resume="resumeBullets"
      :isSaved="isSaved"
      :showAlertSuccess="showAlert"
      :isSubmitDone="isSubmitDone"
    ></resume-block>
  </div>


  <comments-block
    @load-comments="loadComments"
    :isLoader="isLoader"
    :isErrAlert="errAlert"
    :allComments="comments"
    :isCommentsDone="isCommentsDone"
  ></comments-block>
</template>

<script>
{
//FIXME: Вопросы!
//  1) Не совсем понятно про v-bind без атрибута (v-bind:attribute="data" vs v-bind="data") - d чем разница
//  если просто v-bind то в дочернем компоненте получаю объект со всеми атрибутами родителя?
//  если так как получить доступ до передаваемых данных?
//  2) Про $attrs тоже не совсем понятно.. this.$attrs - это объект со всеми атрибутами родителя?
//  v-bind="$attrs" - передача дочке объекта со всеми атрибутами родителя? чем отличается от v-bind="data"?
//  3) В документации сказано что provide/inject не реактивны, но это можно обойти используя computed свойство.
//  пытался сделать у меня не получалось, пришлось частично использовать props. Как их сделать реактивными?
//  4) вопрос не совсем по теме: на сколько безопасно обращаться к базе в js по прямым ссылкам
//  как мы делаем на курсе. В своих проектах делал всегда обращение в fetch к какому ни будь saveData.php,
//  а там уже обрабатывал прямые ссылки к базе
//  5) Вопрос про передачу аргумента в $emits через 2,3,.... компонентов. Сейчас сделал:
//  @click="$emits('ttt-eee', data)" -> @ttt-eee="$emits('rrr-yyy', $event)" -> @ttt-eee="$emits(MethodInMainComponent)"
//  т.е. в каждом промежуточном компоненте передавать $event? это правильное решение?
//  Мне бы было проще по старинке через еще один экземпляр vue (eventBus) - но не проходили не курсе - не стал так делать
}
import InputBlock from '@/components/input-block/InputBlock'
import CommentsBlock from '@/components/comments-block/CommentsBlock'
import ResumeBlock from '@/components/resume-block/ResumeBlock'


export default {
  provide() {
    return {
      fcherr: this.arrayMsg.fetchFailed,
      typeArray: this.typeArray,
      dataSuccessSave: this.arrayMsg.successMsg,
      errorMsg: this.arrayMsg.errorMsg,
      invalTaxAr: this.arrayMsg.inValidTextArea
    }
  },

  data() {
    return {
      typeArray: ['avatar', 'title', 'subtitle', 'text'],
      arrayMsg: {
        inValidTextArea: 'Длина сообщения должна быть не менее 4 символов',
        fetchFailed: 'Не удалось загрузить данные с сервера. Попробуйте позже!',
        successMsg: 'Данные успешно сохранены в базе данных!',
        errorMsg: 'Не удалось сохранить данные! Попробуйте позже.'
      },
      resumeBullets: [
        {
          type: '',
          value: ''
        },
        {
          type: '',
          value: ''
        }
      ],
      comments: [],
      isLoader: false,
      errAlert: false,
      isCommentsDone: false,
      isSaved: false,
      showAlert: false,
      savedResumeArray: [],
      showResumeLi: false,
      showResumeLoader: false,
      loadedResume: {},
      isSubmitDone: false
    }
  },

  methods: {
    submitData(selectType, val) {
      if (selectType === this.typeArray[1]) {
        this.resumeBullets[1].type = selectType
        this.resumeBullets[1].value = val
      }
      if (selectType === this.typeArray[0]) {
        this.resumeBullets[0].type = selectType
        this.resumeBullets[0].value = val
      }
      if (selectType !== this.typeArray[1] && selectType !== this.typeArray[0]) {
        this.resumeBullets.push({
          type: selectType,
          value: val
        })
      }
      this.isSaved = false
      this.isSubmitDone = true
    },

    async loadComments() {
      this.isLoader = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42')
        this.comments = await response.json()
        this.errAlert = false
        this.isCommentsDone = true
      } catch (e) {
        this.errAlert = true
      }
      this.isLoader = false
    },

    async saveResume() {
      this.resumeBullets.forEach(el => this.savedResumeArray.push({[el.type]: el.value}))
      try {
        await fetch('https://learnvuecurse-default-rtdb.europe-west1.firebasedatabase.app/resume.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.savedResumeArray)
        })
        this.isSaved = true
        this.showAlert = this.isSaved
        setTimeout(() => {
          this.showAlert = false
        }, 2000)
      } catch (e) {
        console.log(e.message)
      }
      this.savedResumeArray = []
    },

    async loadResume() {
      this.savedResumeArray = []
      this.showResumeLoader = true
      try {
        const response = await fetch('https://learnvuecurse-default-rtdb.europe-west1.firebasedatabase.app/resume.json')
        this.loadedResume = await response.json()
      } catch (e) {
        console.log(e.message)
      }
      this.showResumeLoader = false
      this.showResumeLi = true
    },

    showSelectedResume(key) {
      this.showResumeLi = false
      this.isSubmitDone = false
      this.resumeBullets = []
      this.loadedResume[key].forEach(el => {
        this.resumeBullets.push({
          type: Object.keys(el)[0],
          value: Object.values(el)[0]
        })
      })
    },

    clearResume() {
      this.resumeBullets = [{type: '', value: ''}, {type: '', value: ''}]
      this.savedResumeArray = []
    }
  },

  components: {
    InputBlock,
    CommentsBlock,
    ResumeBlock
  }
}
</script>



<style lang="sass">
.avatar
  display: flex
  justify-content: flex-start
.avatar img
  width: 150px
  height: auto
  border-radius: 50%
</style>
