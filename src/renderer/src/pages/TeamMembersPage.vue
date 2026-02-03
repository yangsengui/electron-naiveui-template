<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { h, ref } from 'vue'
import { NAvatar, NButton, NDataTable, NTag } from 'naive-ui'

type MemberRole = 'Owner' | 'Developer' | 'QA' | 'Guest'
type MemberRow = {
  id: number
  name: string
  role: MemberRole
  color: string
  lastActive: string
}

const members = ref<MemberRow[]>([
  { id: 1, name: 'Yang', role: 'Owner', color: '#4f46e5', lastActive: '1 分钟前' },
  { id: 2, name: 'Alice', role: 'Developer', color: '#0ea5e9', lastActive: '今天 10:18' },
  { id: 3, name: 'Bob', role: 'QA', color: '#22c55e', lastActive: '昨天' },
  { id: 4, name: 'Guest', role: 'Guest', color: '#64748b', lastActive: '—' }
])

function roleTagType(role: MemberRole): 'info' | 'success' | 'warning' | 'default' {
  if (role === 'Owner') return 'success'
  if (role === 'Developer') return 'info'
  if (role === 'QA') return 'warning'
  return 'default'
}

const columns: DataTableColumns<MemberRow> = [
  {
    title: '成员',
    key: 'name',
    minWidth: 200,
    render: (row) =>
      h('div', { style: 'display:flex; align-items:center; gap:10px' }, [
        h(
          NAvatar,
          { size: 'small', style: { backgroundColor: row.color } },
          { default: () => row.name.slice(0, 1) }
        ),
        h('div', null, [
          h('div', { style: 'font-weight:600' }, row.name),
          h('div', { style: 'font-size:12px; opacity:.7' }, `最近活跃：${row.lastActive}`)
        ])
      ])
  },
  {
    title: '角色',
    key: 'role',
    width: 140,
    render: (row) => h(NTag, { size: 'small', type: roleTagType(row.role) }, { default: () => row.role })
  },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    render: (row) =>
      h(
        NButton,
        { size: 'small', tertiary: true, onClick: () => console.log('message', row.id) },
        { default: () => '发消息' }
      )
  }
]
</script>

<template>
  <n-data-table :columns="columns" :data="members" :pagination="{ pageSize: 10 }" :row-key="(row) => row.id" />
</template>
