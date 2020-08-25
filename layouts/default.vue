<template>
  <div class="main">
    <navbar />
    <sidebar :collapsed="collapsed" @onCollapsed="onCollapsed" />
    <section class="content" :class="[collapsed ? 'content-expand' : '', '']">
      <nuxt />
    </section>
    <right-sidebar />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RightSidebar from '../components/layouts/RightSidebar.vue'
import Navbar from '../components/layouts/Navbar.vue'
import Sidebar from '../components/layouts/Sidebar.vue'
import { ThemeType } from '../constants/theme'
// import Sidebar from '～components/layouts/Sidebar.vue'

@Component({
  components: {
    Navbar,
    Sidebar,
    RightSidebar
  }
})
export default class defaultLayouts extends Vue {
  collapsed: boolean = false

  onCollapsed() {
    this.collapsed = !this.collapsed
  }

  mounted(){
    this.$store.commit('theme/switchTheme', ThemeType.Sunny)
  }
}

</script>

<style lang="less">
html {
  font-family: "Comfortaa", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.content {
  position: absolute;
  top: 20px;
  left: 260px;
  right: 50px;
  bottom: 0px;
  padding: 10px;
  transition: all, 0.5s;
  border: 6px solid #fff;
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 16px rgba(41,42,51,0.06), 0 6px 20px rgba(41,42,51,0.02);
  background: var(--main-content-bg-color);
}

.content-expand {
  left: 56px;
}

</style>
