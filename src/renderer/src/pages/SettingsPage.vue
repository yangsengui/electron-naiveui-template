<script setup lang="ts">
import { ref } from 'vue'
import { NAlert, NButton, NForm, NFormItem, NInputNumber, NSelect, NSpace, NSwitch } from 'naive-ui'

const formValue = ref({
  autoUpdate: true,
  analytics: false,
  updateChannel: 'stable',
  downloadLimit: 50
})

const channelOptions = [
  { label: '稳定版（stable）', value: 'stable' },
  { label: '测试版（beta）', value: 'beta' },
  { label: '开发版（dev）', value: 'dev' }
]

function saveSettings(): void {
  console.log('save settings', formValue.value)
}
</script>

<template>
  <n-space vertical size="large">
    <n-alert type="info" title="提示" :bordered="false">
      这里是演示设置页：用 Naive UI 表单展示配置项，保存逻辑仅打印到控制台。
    </n-alert>

    <n-form :model="formValue" label-placement="left" label-width="120">
      <n-form-item label="自动更新">
        <n-switch v-model:value="formValue.autoUpdate" />
      </n-form-item>
      <n-form-item label="匿名统计">
        <n-switch v-model:value="formValue.analytics" />
      </n-form-item>
      <n-form-item label="更新通道">
        <n-select v-model:value="formValue.updateChannel" :options="channelOptions" style="width: 240px" />
      </n-form-item>
      <n-form-item label="下载限速 (MB/s)">
        <n-input-number v-model:value="formValue.downloadLimit" :min="1" :max="200" style="width: 240px" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="saveSettings">保存</n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>
