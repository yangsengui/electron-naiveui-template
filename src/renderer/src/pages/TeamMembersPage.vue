<script setup lang="ts">
import { NAvatar, NCard, NP, NSpace, NTag } from 'naive-ui'

const members = [
  { name: 'Yang', role: 'Owner', color: '#4f46e5' },
  { name: 'Alice', role: 'Developer', color: '#0ea5e9' },
  { name: 'Bob', role: 'QA', color: '#22c55e' }
]
</script>

<template>
  <n-space vertical size="large">
    <n-card title="成员列表" size="small">
      <n-space vertical>
        <div v-for="m in members" :key="m.name" style="display: flex; align-items: center; gap: 12px">
          <n-avatar :style="{ backgroundColor: m.color }" size="small">{{ m.name.slice(0, 1) }}</n-avatar>
          <div style="flex: 1">
            <div style="display: flex; align-items: center; gap: 8px">
              <strong>{{ m.name }}</strong>
              <n-tag size="small" type="info">{{ m.role }}</n-tag>
            </div>
            <n-p depth="3" style="margin: 4px 0 0">最近活动：—</n-p>
          </div>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
