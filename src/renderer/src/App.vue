<script setup lang="ts">
import type { Component } from 'vue'
import type { DropdownOption, MenuOption } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import {
  NAvatar,
  NButton,
  NConfigProvider,
  NDropdown,
  NGlobalStyle,
  NTooltip,
  NText,
  darkTheme,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NIcon
} from 'naive-ui'
import {
  BookOutline as BookIcon,
  ChevronDownOutline as ChevronDownIcon,
  LogOutOutline as LogOutIcon,
  MoonOutline as MoonIcon,
  PersonOutline as PersonIcon,
  SettingsOutline as SettingsIcon,
  PersonCircleOutline as ProfileIcon,
  SunnyOutline as SunIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import logoUrl from '@renderer/assets/electron.svg'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const STORAGE_KEY = 'theme:dark'
const AUTH_TOKEN_KEY = 'auth:token'
const AUTH_NAME_KEY = 'auth:name'
const APP_BG_LIGHT = '#f6f7fb'
const APP_BG_DARK = '#101014'
const TITLEBAR_BG_LIGHT = '#ffffff'
const TITLEBAR_BG_DARK = '#18181c'
const TITLEBAR_SYMBOL_LIGHT = '#1f2328'
const TITLEBAR_SYMBOL_DARK = '#ffffff'

const isDark = ref<boolean>(
  localStorage.getItem(STORAGE_KEY) !== null
    ? localStorage.getItem(STORAGE_KEY) === '1'
    : (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false)
)
const naiveTheme = computed(() => (isDark.value ? darkTheme : null))
const appBackground = computed(() => (isDark.value ? APP_BG_DARK : APP_BG_LIGHT))
const titleBarOverlay = computed(() => ({
  color: isDark.value ? TITLEBAR_BG_DARK : TITLEBAR_BG_LIGHT,
  symbolColor: isDark.value ? TITLEBAR_SYMBOL_DARK : TITLEBAR_SYMBOL_LIGHT
}))

function syncNativeTitleBar(): void {
  window.electron?.ipcRenderer.send('theme:changed', { dark: isDark.value, titleBarOverlay: titleBarOverlay.value })
}

function toggleTheme(): void {
  isDark.value = !isDark.value
}

const menuOptions: MenuOption[] = [
  {
    label: '概览',
    key: '/overview',
    icon: renderIcon(BookIcon)
  },
  {
    label: '项目',
    key: '/projects',
    icon: renderIcon(BookIcon),
    children: [
      { label: '进行中', key: '/projects/active' },
      { label: '归档', key: '/projects/archived' }
    ]
  },
  {
    label: '团队',
    key: '/team',
    icon: renderIcon(PersonIcon),
    children: [
      { label: '成员', key: '/team/members' },
      { label: '角色', key: '/team/roles' }
    ]
  },
  {
    label: '资源',
    key: '/resources',
    icon: renderIcon(WineIcon),
    children: [
      { label: '文档', key: '/resources/docs' },
      { label: '模板', key: '/resources/templates' }
    ]
  },
  {
    label: '设置',
    key: '/settings',
    icon: renderIcon(BookIcon)
  }
]

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const isAuthRoute = computed(() => route.path === '/login')
const userName = ref(localStorage.getItem(AUTH_NAME_KEY) ?? '管理员')

watch(
  () => route.path,
  () => {
    const name = localStorage.getItem(AUTH_NAME_KEY)
    if (name) userName.value = name
  }
)

const userDropdownOptions: DropdownOption[] = [
  { label: '个人资料', key: 'profile', icon: renderIcon(ProfileIcon) },
  { label: '设置', key: 'settings', icon: renderIcon(SettingsIcon) },
  { label: '退出登录', key: 'logout', icon: renderIcon(LogOutIcon) }
]

function handleUserSelect(key: string): void {
  if (key === 'settings') {
    router.push('/settings')
    return
  }
  if (key === 'logout') {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_NAME_KEY)
    router.replace('/login')
    return
  }
  if (key === 'profile') {
    console.log('profile clicked')
  }
}

const activeKey = computed<string | null>({
  get: () => route.path,
  set: (key) => {
    if (!key || key === route.path) return
    router.push(key)
  }
})

const pageTitle = computed(() => (route.meta.title as string) || '控制台')

watch(isDark, (value) => {
  localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  document.body.style.background = appBackground.value
  syncNativeTitleBar()
})

onMounted(() => {
  document.body.style.transition = 'background-color 180ms ease'
  document.body.style.background = appBackground.value
  syncNativeTitleBar()
})
</script>

<template>
  <n-config-provider :theme="naiveTheme" :class="['app-root', { 'is-dark': isDark }]">
    <n-global-style />
    <div v-if="isAuthRoute" class="app-layout">
      <router-view />
    </div>
    <n-layout v-else :has-sider="true" class="app-layout">
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="180"
        :collapsed="collapsed"
        class="app-sider"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="app-brand" :class="{ collapsed }">
          <img class="app-logo" :src="logoUrl" alt="logo" />
          <span v-if="!collapsed">控制台</span>
        </div>
        <div class="app-sider-menu">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
          />
        </div>
        <div class="app-sider-footer">
          <n-dropdown :options="userDropdownOptions" placement="top-start" trigger="click" @select="handleUserSelect">
            <div class="app-user" :class="{ collapsed }">
              <n-avatar round size="small">{{ userName.slice(0, 1) }}</n-avatar>
              <n-text v-if="!collapsed" class="app-user-name">{{ userName }}</n-text>
              <n-icon v-if="!collapsed" class="app-user-caret" :component="ChevronDownIcon" />
            </div>
          </n-dropdown>
        </div>
      </n-layout-sider>
      <n-layout class="app-main">
        <n-layout-header
          bordered
          class="app-header app-titlebar"
          :style="{ backgroundColor: titleBarOverlay.color, color: titleBarOverlay.symbolColor }"
        >
          <div class="app-titlebar-title">{{ pageTitle }}</div>
          <div class="app-titlebar-actions">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <n-button quaternary circle class="app-titlebar-btn" @click="toggleTheme">
                  <template #icon>
                    <n-icon :component="isDark ? SunIcon : MoonIcon" />
                  </template>
                </n-button>
              </template>
              {{ isDark ? '切换到亮色' : '切换到暗色' }}
            </n-tooltip>
          </div>
        </n-layout-header>
        <div class="app-content app-main-content">
          <router-view />
        </div>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style>
.app-root {
  height: 100%;
}

.app-sider .n-layout-sider-scroll-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-sider-menu {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.app-sider-footer {
  padding: 10px 10px 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.is-dark .app-sider-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.app-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.app-user:hover {
  background: rgba(0, 0, 0, 0.06);
}

.is-dark .app-user:hover {
  background: rgba(255, 255, 255, 0.08);
}

.app-user-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-user-caret {
  opacity: 0.7;
}

.app-user.collapsed {
  justify-content: center;
  padding: 8px 0;
}

.app-titlebar {
  height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  -webkit-app-region: drag;
  position: sticky;
  top: 0;
  z-index: 20;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.app-titlebar-title {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-titlebar-actions {
  margin-left: auto;
  padding-right: 140px;
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}

.app-titlebar-btn {
  -webkit-app-region: no-drag;
}

.app-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.app-main-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
</style>
