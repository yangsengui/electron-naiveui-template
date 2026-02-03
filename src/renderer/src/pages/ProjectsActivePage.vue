<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { computed, h, ref } from 'vue'
import { NButton, NDataTable, NInput, NProgress, NSelect, NSpace, NTag } from 'naive-ui'

type ProjectStatus = '进行中' | '阻塞' | '待评审'

type ProjectRow = {
  id: number
  name: string
  owner: string
  status: ProjectStatus
  progress: number
  updatedAt: string
}

const keyword = ref('')
const statusFilter = ref<ProjectStatus | '全部'>('全部')

const allRows = ref<ProjectRow[]>([
  { id: 1, name: '桌面端壳工程', owner: 'Yang', status: '进行中', progress: 72, updatedAt: '2026-02-03' },
  { id: 2, name: '路由与布局', owner: 'Team A', status: '进行中', progress: 43, updatedAt: '2026-02-02' },
  { id: 3, name: '打包发布流程', owner: 'Ops', status: '待评审', progress: 90, updatedAt: '2026-02-01' },
  { id: 4, name: '权限与登录', owner: 'Alice', status: '阻塞', progress: 18, updatedAt: '2026-01-30' }
])

const filteredRows = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  return allRows.value.filter((row) => {
    const matchKeyword = !q || row.name.toLowerCase().includes(q) || row.owner.toLowerCase().includes(q)
    const matchStatus = statusFilter.value === '全部' || row.status === statusFilter.value
    return matchKeyword && matchStatus
  })
})

function statusTagType(status: ProjectStatus): 'success' | 'warning' | 'error' {
  if (status === '进行中') return 'success'
  if (status === '待评审') return 'warning'
  return 'error'
}

const statusOptions = [
  { label: '全部', value: '全部' },
  { label: '进行中', value: '进行中' },
  { label: '待评审', value: '待评审' },
  { label: '阻塞', value: '阻塞' }
]

const columns: DataTableColumns<ProjectRow> = [
  {
    title: '项目',
    key: 'name',
    minWidth: 200,
    render: (row) => h('div', { style: 'font-weight: 600' }, row.name)
  },
  { title: '负责人', key: 'owner', width: 120 },
  {
    title: '状态',
    key: 'status',
    width: 120,
    render: (row) => h(NTag, { size: 'small', type: statusTagType(row.status) }, { default: () => row.status })
  },
  {
    title: '进度',
    key: 'progress',
    minWidth: 160,
    render: (row) =>
      h(NProgress, {
        type: 'line',
        percentage: row.progress,
        height: 10,
        showIndicator: false,
        processing: row.status === '进行中'
      })
  },
  { title: '更新', key: 'updatedAt', width: 120 },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    render: (row) =>
      h(
        NButton,
        { size: 'small', tertiary: true, type: 'primary', onClick: () => console.log('open', row.id) },
        { default: () => '打开' }
      )
  }
]
</script>

<template>
  <n-space vertical size="large">
    <n-space justify="space-between" align="center">
      <n-space align="center">
        <n-input v-model:value="keyword" placeholder="搜索项目/负责人" style="width: 220px" clearable />
        <n-select v-model:value="statusFilter" :options="statusOptions" style="width: 140px" />
      </n-space>
      <n-space>
        <n-button tertiary type="primary" @click="console.log('create')">新建项目</n-button>
        <n-button tertiary @click="console.log('refresh')">刷新</n-button>
      </n-space>
    </n-space>

    <n-data-table
      :columns="columns"
      :data="filteredRows"
      :pagination="{ pageSize: 8 }"
      :row-key="(row) => row.id"
    />
  </n-space>
</template>
