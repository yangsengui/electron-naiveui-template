<script setup lang="ts">
import { NCard, NP, NSpace, NTag } from 'naive-ui'

const roles = [
  { name: 'Owner', desc: '项目负责人，拥有所有权限', level: 'high' },
  { name: 'Developer', desc: '开发与迭代功能', level: 'medium' },
  { name: 'QA', desc: '测试与发布验收', level: 'medium' },
  { name: 'Guest', desc: '只读访问', level: 'low' }
]

function roleTagType(level: string) {
  if (level === 'high') return 'error'
  if (level === 'medium') return 'warning'
  return 'default'
}
</script>

<template>
  <n-space vertical size="large">
    <n-card title="角色列表" size="small">
      <n-space vertical>
        <div v-for="r in roles" :key="r.name">
          <div style="display: flex; align-items: center; gap: 8px">
            <strong>{{ r.name }}</strong>
            <n-tag size="small" :type="roleTagType(r.level)">{{ r.level }}</n-tag>
          </div>
          <n-p depth="3" style="margin: 4px 0 0">{{ r.desc }}</n-p>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
