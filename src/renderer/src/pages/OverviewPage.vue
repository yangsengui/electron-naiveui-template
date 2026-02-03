<script setup lang="ts">
import { NCard, NH2, NP, NSpace, NTag } from 'naive-ui'
import Versions from '@renderer/components/Versions.vue'
</script>

<template>
  <n-space vertical size="large">
    <div>
      <n-h2 style="margin: 0">概览</n-h2>
      <n-p depth="3" style="margin: 6px 0 0">
        这是一个基于 Electron + Vue 3 + Naive UI 的桌面应用示例。下面的内容只是占位，用来验证路由是否生效。
      </n-p>
    </div>

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

