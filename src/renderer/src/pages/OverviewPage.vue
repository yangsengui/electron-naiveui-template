<script setup lang="ts">
import { NCard, NSpace, NTag } from 'naive-ui'
import Versions from '@renderer/components/Versions.vue'
</script>

<template>
  <n-space vertical size="large">
    <n-card title="运行环境" size="small">
      <versions />
    </n-card>

    <n-card title="状态" size="small">
      <n-space>
        <n-tag type="success">Renderer Ready</n-tag>
        <n-tag type="info">Router Enabled</n-tag>
        <n-tag type="warning">Mock Data</n-tag>
      </n-space>
    </n-card>
  </n-space>
</template>
