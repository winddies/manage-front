<template>
  <aside class="navbar">
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {}

</script>

<style lang="less" scoped>
.navbar {
  height: 20px;
  background: @main-navbar-bg-color;
}
</style>
