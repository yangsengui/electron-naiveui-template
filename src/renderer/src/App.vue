<script setup lang="ts">
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import {
  NButton,
  NConfigProvider,
  NGlobalStyle,
  NTooltip,
  darkTheme,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NIcon
} from 'naive-ui'
import {
  BookOutline as BookIcon,
  MoonOutline as MoonIcon,
  PersonOutline as PersonIcon,
  SunnyOutline as SunIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import logoUrl from '@renderer/assets/electron.svg'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const STORAGE_KEY = 'theme:dark'
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
  <n-config-provider :theme="naiveTheme" class="app-root">
    <n-global-style />
    <n-layout has-sider class="app-layout">
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
        <n-menu
          v-model:value="activeKey"
          :options="menuOptions"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
        />
      </n-layout-sider>
      <n-layout>
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
        <n-layout-content class="app-content">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style>
.app-root {
  height: 100%;
}

.app-titlebar {
  height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  -webkit-app-region: drag;
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
</style>
