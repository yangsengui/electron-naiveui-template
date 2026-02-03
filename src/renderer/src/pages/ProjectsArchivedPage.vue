<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { NDataTable, NTag } from 'naive-ui'

type ArchivedRow = {
  id: number
  name: string
  date: string
  reason: string
}

const archived: ArchivedRow[] = [
  { id: 1, name: '旧版 UI', date: '2025-11-02', reason: '重构到 Naive UI' },
  { id: 2, name: '实验性功能分支', date: '2025-09-18', reason: '方案验证结束' }
]

const columns: DataTableColumns<ArchivedRow> = [
  { title: '项目', key: 'name', minWidth: 220 },
  { title: '归档时间', key: 'date', width: 140 },
  {
    title: '原因',
    key: 'reason',
    minWidth: 180,
    render: (row) => h(NTag, { size: 'small', type: 'default' }, { default: () => row.reason })
  }
]
</script>

<template>
  <n-data-table :columns="columns" :data="archived" :pagination="{ pageSize: 10 }" :row-key="(row) => row.id" />
</template>
