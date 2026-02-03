<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCheckbox, NDivider, NTable, NTag } from 'naive-ui'

const roles = [
  { name: 'Owner', desc: '项目负责人，拥有所有权限', level: 'high', permissions: ['read', 'write', 'admin'] },
  { name: 'Developer', desc: '开发与迭代功能', level: 'medium', permissions: ['read', 'write'] },
  { name: 'QA', desc: '测试与发布验收', level: 'medium', permissions: ['read', 'test'] },
  { name: 'Guest', desc: '只读访问', level: 'low', permissions: ['read'] }
]

function roleTagType(level: string): 'error' | 'warning' | 'default' {
  if (level === 'high') return 'error'
  if (level === 'medium') return 'warning'
  return 'default'
}

const showDesc = ref(true)
const permissions = computed(() => Array.from(new Set(roles.flatMap((r) => r.permissions))))
</script>

<template>
  <div>
    <n-checkbox v-model:checked="showDesc">显示说明</n-checkbox>
    <n-divider />
    <n-table :single-line="false">
      <thead>
        <tr>
          <th style="width: 160px">角色</th>
          <th style="width: 120px">等级</th>
          <th v-if="showDesc">说明</th>
          <th>权限</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in roles" :key="r.name">
          <td style="font-weight: 600">{{ r.name }}</td>
          <td>
            <n-tag size="small" :type="roleTagType(r.level)">{{ r.level }}</n-tag>
          </td>
          <td v-if="showDesc" style="opacity: 0.85">{{ r.desc }}</td>
          <td>
            <n-tag v-for="p in permissions" :key="p" size="small" :type="r.permissions.includes(p) ? 'success' : 'default'">
              {{ p }}
            </n-tag>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
