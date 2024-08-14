<template>
  <div class="navbar">
    <hamburger />
    <breadcrumb class="flex1" />
    <div class="right-menu">
      <guide />
      <header-search />
      <full-screen />
      <theme-select />
      <lang-select />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            class="avatar"
            shape="square"
            :size="40"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-icon class="icon" :size="20"><Setting /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item @click="logoutAct">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Guide from '@/components/Guide/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import FullScreen from '@/components/FullScreen/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { logout } = appStore.useUserStore
const logoutAct = () => {
  logout()
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 100%;
}
.flex1 {
  flex: 1;
}
.right-menu {
  display: flex;
  align-items: center;
}
</style>
