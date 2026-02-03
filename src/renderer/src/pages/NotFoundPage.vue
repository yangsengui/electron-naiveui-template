<script setup lang="ts">
import { NButton, NCard, NH2, NP, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <n-space vertical size="large">
    <n-card size="small">
      <n-h2 style="margin: 0">404</n-h2>
      <n-p depth="3" style="margin: 6px 0 0">页面不存在。</n-p>
      <n-space style="margin-top: 12px">
        <n-button type="primary" @click="router.push('/overview')">返回概览</n-button>
      </n-space>
    </n-card>
  </n-space>
</template>

