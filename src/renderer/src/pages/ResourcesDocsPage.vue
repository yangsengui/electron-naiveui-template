<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import { computed, ref } from 'vue'
import { NDescriptions, NDescriptionsItem, NGrid, NGridItem, NInput, NTree } from 'naive-ui'

const pattern = ref('')
const selectedKey = ref<string | null>(null)

const treeData: TreeOption[] = [
  {
    label: '产品',
    key: 'product',
    children: [
      { label: '产品需求说明（PRD）', key: 'doc:prd' },
      { label: '交互规范', key: 'doc:ux' }
    ]
  },
  {
    label: '研发',
    key: 'dev',
    children: [
      { label: '开发规范（DEV）', key: 'doc:dev' },
      { label: '代码评审清单', key: 'doc:review' }
    ]
  },
  {
    label: '运维',
    key: 'ops',
    children: [
      { label: '发布流程（OPS）', key: 'doc:ops' },
      { label: '应急预案', key: 'doc:incident' }
    ]
  }
]

const docMap = new Map<string, { title: string; type: string; owner: string; updatedAt: string }>([
  ['doc:prd', { title: '产品需求说明', type: 'PRD', owner: 'PM', updatedAt: '2026-02-01' }],
  ['doc:ux', { title: '交互规范', type: 'UX', owner: 'Design', updatedAt: '2026-01-28' }],
  ['doc:dev', { title: '开发规范', type: 'DEV', owner: 'Tech Lead', updatedAt: '2026-02-03' }],
  ['doc:review', { title: '代码评审清单', type: 'DEV', owner: 'Team', updatedAt: '2026-01-20' }],
  ['doc:ops', { title: '发布流程', type: 'OPS', owner: 'Ops', updatedAt: '2026-01-15' }],
  ['doc:incident', { title: '应急预案', type: 'OPS', owner: 'Ops', updatedAt: '2026-01-10' }]
])

const activeDoc = computed(() => (selectedKey.value ? docMap.get(selectedKey.value) : undefined))

function handleSelectKeys(keys: Array<string | number>): void {
  selectedKey.value = (keys[0] as string) ?? null
}
</script>

<template>
  <n-grid cols="1 m:2" :x-gap="16" :y-gap="16">
    <n-grid-item>
      <n-input v-model:value="pattern" clearable placeholder="搜索文档（示例）" />
      <div style="margin-top: 12px">
        <n-tree
          :data="treeData"
          block-line
          :pattern="pattern"
          :default-expand-all="true"
          :selected-keys="selectedKey ? [selectedKey] : []"
          @update:selected-keys="handleSelectKeys"
        />
      </div>
    </n-grid-item>
    <n-grid-item>
      <n-descriptions title="文档信息" bordered size="small" :column="1" label-placement="left">
        <n-descriptions-item label="标题">{{ activeDoc?.title ?? '请选择左侧文档' }}</n-descriptions-item>
        <n-descriptions-item label="类型">{{ activeDoc?.type ?? '—' }}</n-descriptions-item>
        <n-descriptions-item label="负责人">{{ activeDoc?.owner ?? '—' }}</n-descriptions-item>
        <n-descriptions-item label="更新时间">{{ activeDoc?.updatedAt ?? '—' }}</n-descriptions-item>
      </n-descriptions>
    </n-grid-item>
  </n-grid>
</template>
