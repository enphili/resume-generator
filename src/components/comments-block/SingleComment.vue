<template>
  <li class="list-item">
    <div>
      <p><strong>{{ singleComment.email }}</strong></p>
      <small>{{ singleComment.body }}</small>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    singleComment: {
      type: Object
    }
  }
}
</script>
