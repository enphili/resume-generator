<template>
  <button class="btn" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>

export default {
  props: {
    disabled: {
      type: Boolean
    }
  }

}
</script>
