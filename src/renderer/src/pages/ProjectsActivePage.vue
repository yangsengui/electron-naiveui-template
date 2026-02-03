<script setup lang="ts">
import { NButton, NCard, NH2, NP, NSpace, NTag } from 'naive-ui'

const items = [
  { name: '桌面端壳工程', owner: 'Yang', status: '进行中' },
  { name: '路由与布局', owner: 'Team A', status: '进行中' },
  { name: '打包发布流程', owner: 'Ops', status: '进行中' }
]
</script>

<template>
  <n-space vertical size="large">
    <div>
      <n-h2 style="margin: 0">项目 · 进行中</n-h2>
      <n-p depth="3" style="margin: 6px 0 0">一些模拟数据，用于展示不同页面的内容。</n-p>
    </div>

    <n-card size="small">
      <n-space justify="space-between" align="center">
        <div>
          <n-tag type="success">Active</n-tag>
        </div>
        <n-space>
          <n-button tertiary type="primary">新建项目</n-button>
          <n-button tertiary>刷新</n-button>
        </n-space>
      </n-space>
    </n-card>

    <n-card title="列表" size="small">
      <n-space vertical>
        <div v-for="it in items" :key="it.name">
          <strong>{{ it.name }}</strong>
          <n-p depth="3" style="margin: 4px 0 0">负责人：{{ it.owner }} · 状态：{{ it.status }}</n-p>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>

