<template>
  <div class="alert danger">
    <h2>Ошибка!</h2>
    {{ fcherr }}
  </div>
</template>

<script>
export default {
  inject: ['fcherr']
}
</script>

<style scoped>

</style>
