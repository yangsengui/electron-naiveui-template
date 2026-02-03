<script setup lang="ts">
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { computed, h, ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu, NIcon } from 'naive-ui'
import { BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon } from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import logoUrl from '@renderer/assets/electron.svg'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
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
</script>

<template>
  <n-layout has-sider class="app-layout">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="180"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      class="app-sider"
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
      <n-layout-header bordered class="app-header">{{ pageTitle }}</n-layout-header>
      <n-layout-content class="app-content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
