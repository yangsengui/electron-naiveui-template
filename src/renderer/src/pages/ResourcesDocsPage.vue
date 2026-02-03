<script setup lang="ts">
import { NCard, NSpace, NTag } from 'naive-ui'

const docs = [
  { name: '产品需求说明', type: 'PRD' },
  { name: '开发规范', type: 'DEV' },
  { name: '发布流程', type: 'OPS' }
]
</script>

<template>
  <n-space vertical size="large">
    <n-card title="文档集合" size="small">
      <n-space vertical>
        <div v-for="d in docs" :key="d.name" style="display: flex; align-items: center; gap: 8px">
          <n-tag size="small" type="info">{{ d.type }}</n-tag>
          <strong>{{ d.name }}</strong>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
