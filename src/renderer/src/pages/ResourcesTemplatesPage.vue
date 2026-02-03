<script setup lang="ts">
import { NCard, NSpace, NTag } from 'naive-ui'

const templates = [
  { name: '周报模板', format: 'Markdown' },
  { name: '会议纪要', format: 'Doc' },
  { name: 'Release Note', format: 'Markdown' }
]
</script>

<template>
  <n-space vertical size="large">
    <n-card title="模板列表" size="small">
      <n-space vertical>
        <div v-for="t in templates" :key="t.name" style="display: flex; align-items: center; gap: 8px">
          <n-tag size="small" type="success">{{ t.format }}</n-tag>
          <strong>{{ t.name }}</strong>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
