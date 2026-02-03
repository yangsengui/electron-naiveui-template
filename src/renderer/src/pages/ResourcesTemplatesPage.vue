<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NList, NListItem, NSpace, NTabPane, NTabs, NTag, NThing } from 'naive-ui'

type TemplateFormat = 'Markdown' | 'Doc' | 'Sheet'
type TemplateItem = { name: string; format: TemplateFormat; desc: string; updatedAt: string }

const activeTab = ref<TemplateFormat | '全部'>('全部')
const templates: TemplateItem[] = [
  { name: '周报模板', format: 'Markdown', desc: '支持任务/风险/产出结构化填写。', updatedAt: '2026-02-02' },
  { name: '会议纪要', format: 'Doc', desc: '议题、结论、待办一页搞定。', updatedAt: '2026-01-29' },
  { name: 'Release Note', format: 'Markdown', desc: '版本变更说明与回滚信息。', updatedAt: '2026-01-18' },
  { name: '项目排期', format: 'Sheet', desc: '里程碑与负责人分配（示例）。', updatedAt: '2026-01-10' }
]

const visible = computed(() =>
  activeTab.value === '全部' ? templates : templates.filter((t) => t.format === activeTab.value)
)
</script>

<template>
  <n-tabs v-model:value="activeTab" type="line" animated>
    <n-tab-pane name="全部" tab="全部" />
    <n-tab-pane name="Markdown" tab="Markdown" />
    <n-tab-pane name="Doc" tab="Doc" />
    <n-tab-pane name="Sheet" tab="Sheet" />
  </n-tabs>

  <n-list hoverable clickable style="margin-top: 12px">
    <n-list-item v-for="t in visible" :key="t.name">
      <n-thing :title="t.name" :description="t.desc">
        <template #header-extra>
          <n-tag size="small" type="success">{{ t.format }}</n-tag>
        </template>
        <template #footer>
          <n-space justify="space-between" align="center">
            <span style="opacity: 0.7">更新：{{ t.updatedAt }}</span>
            <n-button size="small" tertiary type="primary" @click.stop="console.log('use-template', t.name)">
              使用模板
            </n-button>
          </n-space>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>
