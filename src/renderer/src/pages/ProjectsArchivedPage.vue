<script setup lang="ts">
import { NCard, NP, NSpace, NTag } from 'naive-ui'

const archived = [
  { name: '旧版 UI', date: '2025-11-02' },
  { name: '实验性功能分支', date: '2025-09-18' }
]
</script>

<template>
  <n-space vertical size="large">
    <n-card size="small">
      <n-space align="center">
        <n-tag type="default">Archived</n-tag>
        <n-p depth="3" style="margin: 0">共 {{ archived.length }} 个</n-p>
      </n-space>
    </n-card>

    <n-card title="归档列表" size="small">
      <n-space vertical>
        <div v-for="it in archived" :key="it.name">
          <strong>{{ it.name }}</strong>
          <n-p depth="3" style="margin: 4px 0 0">归档时间：{{ it.date }}</n-p>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
