<template>
  <aside :class="[collapsed ? 'sidebar-collapsed' : '', 'sidebar']">
    <div class="navbar-brand">
      <div class="logo-info">
        <img src="~assets/image/logo.png" class="logo" />
        <span>make life happy</span>
      </div>
      <i @click="handleSidebarChange" :class="[collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'fold-control']" />
    </div>
    <div class="user-info"> <!--TODO: 这里的用户信息后期应该通过接口拿，包括图片和信息 -->
      <a class="user-box">
        <img class="user-img" src="~assets/image/user.jpeg" height="50" width="50" />
      </a>
      <div class="user-detail">
        <h4>huang-huang</h4>
        <span>winddies</span>
      </div>
    </div>
    <div class="navbar-menu">
      <ul>
        <li
          v-for="item in sidebarMenuItems"
          v-bind:key="item.key"
          :class="[item.path === activePath ? 'active-menu' : '']"
        >
          <nuxt-link :to="item.path" class="options">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { sidebarMenuItems } from '../../constants/sidebar'
import 'vue-router'

@Component
export default class Sidebar extends Vue {
  @Prop(Boolean) collapsed!: boolean
  sidebarMenuItems = sidebarMenuItems

  get activePath() {
    return this.$route.path
  }

  @Emit('onCollapsed')
  handleSidebarChange() {}
}
</script>

<style lang="less" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  overflow: hidden;
  transition: all 0.5s;
  height: 100%;
  background: @main-sidebar-bg-color;
}

.sidebar-collapsed {
  width: 56px;
  transition: all 0.5s;

  .navbar-menu {
    span {
      display: none;
    }
  }

  .navbar-brand {
    .logo-info {
      display: none;
    }
    i.fold-control {
      right: 20px;
    }
  }

  .user-info {
    padding: 0 11px;
    .user-img {
      width: 34px;
      height: 34px;
    }
    .user-detail {
      display: none;
    }
  }
}

.navbar-menu {
  ul {
    padding-left: 0;
    list-style: none;
  }
  ul li {
    color: @icon-color;
    &.active-menu .options {
      color: @active-icon-color;
      i {
        transform: rotate(0deg);
      }
    }

    .options {
      display: block;
      cursor: pointer;
      color: @icon-color;
      text-decoration: none;
      padding: 15px 20px;
      i {
        transform: rotate(20deg);
      }
      span {
        margin-left: 12px;
        font-size: 18px;
      }
      &:hover {
        color: @active-icon-color;
        i {
          transform: rotate(0);
          color: @active-icon-color;
        }
      }
    }
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  height: 50px;
  .hr();

  i.fold-control {
    cursor: pointer;
    color: @icon-color;
    font-size: 18px;
    position: absolute;
    right: 10px;
    top: 16px;
  }

  .logo-info {
    margin-left: 20px;
    display: flex;
    align-items: center;
    color: @icon-color;
    span {
      margin-left: 10px;
    }
  }

  .logo {
    margin: 0 auto;
  }
}

.user-info {
  .hr();
  display: flex;
  align-items: center;
  padding-left: 20px;

  .user-box {
    padding: 10px 0;
  }

  .user-detail {
    color: @icon-color;
    h4 {
      margin-bottom: 5px;
    }
    span {
      margin-top: 10px;
    }
  }

  .user-img {
    border-radius: 5px;
    border: 2px solid #fff;
    box-shadow: 0px 5px 5px 0px rgba(41,42,51,0.2);
    margin-right: 20px;
  }
}
</style>
