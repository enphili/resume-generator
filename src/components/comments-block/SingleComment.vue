<template>
  <li class="list-item">
    <div>
      <p><strong>{{ singlcoment.email }}</strong></p>
      <small>{{ singlcoment.body }}</small>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    singlcoment: {
      type: Object
    }
  }
}
</script>
