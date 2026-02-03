<script setup lang="ts">
import { computed } from 'vue'
import {
  NDescriptions,
  NDescriptionsItem,
  NDivider,
  NGrid,
  NGridItem,
  NNumberAnimation,
  NSpace,
  NStatistic,
  NTimeline,
  NTimelineItem
} from 'naive-ui'

const versions = computed(() => window.electron.process.versions)
const platform = computed(() => window.electron.process.platform)

const stats = [
  { label: '进行中项目', value: 3 },
  { label: '团队成员', value: 12 },
  { label: '待处理事项', value: 7 },
  { label: '近 7 天活跃', value: 26 }
]

const recent = [
  { type: 'success' as const, title: '构建成功', content: '已生成生产包（示例）' },
  { type: 'info' as const, title: '成员加入', content: 'Alice 加入了项目组（示例）' },
  { type: 'warning' as const, title: '待评审', content: 'Release Note 需要评审（示例）' }
]
</script>

<template>
  <n-space vertical size="large">
    <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 m:4">
      <n-grid-item v-for="it in stats" :key="it.label">
        <n-statistic :label="it.label">
          <n-number-animation :from="0" :to="it.value" :duration="600" />
        </n-statistic>
      </n-grid-item>
    </n-grid>

    <n-divider />

    <n-descriptions title="运行环境" bordered size="small" :column="3" label-placement="left">
      <n-descriptions-item label="Electron">{{ versions.electron }}</n-descriptions-item>
      <n-descriptions-item label="Chromium">{{ versions.chrome }}</n-descriptions-item>
      <n-descriptions-item label="Node">{{ versions.node }}</n-descriptions-item>
      <n-descriptions-item label="V8">{{ versions.v8 }}</n-descriptions-item>
      <n-descriptions-item label="Platform">{{ platform }}</n-descriptions-item>
      <n-descriptions-item label="OpenSSL">{{ versions.openssl ?? '—' }}</n-descriptions-item>
    </n-descriptions>

    <n-divider />

    <n-timeline>
      <n-timeline-item v-for="it in recent" :key="it.title" :type="it.type" :title="it.title">
        {{ it.content }}
      </n-timeline-item>
    </n-timeline>
  </n-space>
</template>
