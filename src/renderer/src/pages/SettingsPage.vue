<script setup lang="ts">
import { NCard, NP, NSpace, NSwitch, NTag } from 'naive-ui'
import { ref } from 'vue'

const autoUpdate = ref(true)
const analytics = ref(false)
</script>

<template>
  <n-space vertical size="large">
    <n-card title="偏好设置" size="small">
      <n-space vertical>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
          <div>
            <strong>自动更新</strong>
            <n-p depth="3" style="margin: 4px 0 0">启动时检查更新（示例开关）。</n-p>
          </div>
          <n-switch v-model:value="autoUpdate" />
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
          <div>
            <strong>使用数据</strong>
            <n-p depth="3" style="margin: 4px 0 0">匿名统计（示例开关）。</n-p>
          </div>
          <n-switch v-model:value="analytics" />
        </div>
      </n-space>
    </n-card>

    <n-card size="small">
      <n-space align="center">
        <n-tag type="info" size="small">autoUpdate: {{ autoUpdate }}</n-tag>
        <n-tag type="info" size="small">analytics: {{ analytics }}</n-tag>
      </n-space>
    </n-card>
  </n-space>
</template>
