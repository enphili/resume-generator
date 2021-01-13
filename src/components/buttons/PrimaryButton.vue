<template>
  <button class="btn primary" :disabled="disabled">
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
