<template>
  <button v-tooltip.top-center="'will be prop'">hi</button>
</template>
<script>
  export default {
    name: 'credits-modal',
    data () {
      return {

      }
    }
  }
</script>
<style lang="less" scoped>
.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    display: none;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>

