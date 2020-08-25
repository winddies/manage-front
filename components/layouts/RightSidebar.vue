<template>
  <aside class="right-sidebar">
    <div>
      <ul>
        <li>
          <i :class="[themeIcon, themeStyle]" @click="setTheme" />
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapMutations, mapState } from 'vuex'
import {
  State,
  Mutation,
  namespace
} from 'vuex-class'
import { ThemeType } from '../../constants/theme'

const themeSpace = namespace('theme')

@Component
export default class RightSidebar extends Vue {
  @State(state => state.theme.theme) theme
  @themeSpace.Mutation('switchTheme') switchTheme

  get themeIcon() {
    return this.theme === ThemeType.Sunny ? 'el-icon-sunny' : 'el-icon-moon-night'
  }

  get themeStyle() {
    return this.theme === ThemeType.Sunny ? 'sunny' : 'moon'
  }

  setTheme() {
    const theme = this.theme === ThemeType.Sunny ? ThemeType.Moon : ThemeType.Sunny
    this.switchTheme(theme)
  }
}
</script>

<style lang="less" scoped>
.right-sidebar {
  position: fixed;
  top: 20px;
  right: 0;
  bottom: 0;
  width: 50px;
  overflow: hidden;
  background: @main-sidebar-bg-color;
  ul {
    li {
      cursor: pointer;
      text-align: center;
      i {
        font-size: 22px;
        &.sunny {
          color: @red;
        }
        &.moon {
          color: @yellow;
        }
      }
    }
  }
}
</style>
