<script setup lang="ts">
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { h, ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NLayoutFooter, NMenu, NIcon } from 'naive-ui'
import { BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon } from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '概览',
    key: 'overview',
    icon: renderIcon(BookIcon)
  },
  {
    label: '项目',
    key: 'projects',
    icon: renderIcon(BookIcon),
    children: [
      { label: '进行中', key: 'projects-active' },
      { label: '归档', key: 'projects-archived' }
    ]
  },
  {
    label: '团队',
    key: 'team',
    icon: renderIcon(PersonIcon),
    children: [
      { label: '成员', key: 'team-members' },
      { label: '角色', key: 'team-roles' }
    ]
  },
  {
    label: '资源',
    key: 'resources',
    icon: renderIcon(WineIcon),
    children: [
      { label: '文档', key: 'resources-docs' },
      { label: '模板', key: 'resources-templates' }
    ]
  },
  {
    label: '设置',
    key: 'settings',
    icon: renderIcon(BookIcon)
  }
]

const activeKey = ref<string | null>('overview')
</script>

<template>
  <n-layout has-sider class="app-layout">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      class="app-sider"
    >
      <div class="app-brand">NaiveUI</div>
      <n-menu v-model:value="activeKey" :options="menuOptions" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="app-header">控制台</n-layout-header>
      <n-layout-content class="app-content">
        <div class="content-card">这里是主内容区域</div>
      </n-layout-content>
      <n-layout-footer bordered class="app-footer">© 2026 Electron + Naive UI</n-layout-footer>
    </n-layout>
  </n-layout>
</template>
