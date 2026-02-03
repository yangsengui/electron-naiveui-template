import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const AUTH_TOKEN_KEY = 'auth:token'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/overview' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@renderer/pages/LoginPage.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@renderer/pages/OverviewPage.vue'),
    meta: { title: '概览' }
  },
  { path: '/projects', redirect: '/projects/active' },
  {
    path: '/projects/active',
    name: 'projects-active',
    component: () => import('@renderer/pages/ProjectsActivePage.vue'),
    meta: { title: '项目 / 进行中' }
  },
  {
    path: '/projects/archived',
    name: 'projects-archived',
    component: () => import('@renderer/pages/ProjectsArchivedPage.vue'),
    meta: { title: '项目 / 归档' }
  },
  { path: '/team', redirect: '/team/members' },
  {
    path: '/team/members',
    name: 'team-members',
    component: () => import('@renderer/pages/TeamMembersPage.vue'),
    meta: { title: '团队 / 成员' }
  },
  {
    path: '/team/roles',
    name: 'team-roles',
    component: () => import('@renderer/pages/TeamRolesPage.vue'),
    meta: { title: '团队 / 角色' }
  },
  { path: '/resources', redirect: '/resources/docs' },
  {
    path: '/resources/docs',
    name: 'resources-docs',
    component: () => import('@renderer/pages/ResourcesDocsPage.vue'),
    meta: { title: '资源 / 文档' }
  },
  {
    path: '/resources/templates',
    name: 'resources-templates',
    component: () => import('@renderer/pages/ResourcesTemplatesPage.vue'),
    meta: { title: '资源 / 模板' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@renderer/pages/SettingsPage.vue'),
    meta: { title: '设置' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@renderer/pages/NotFoundPage.vue'),
    meta: { title: '页面不存在' }
  }
]

export const router = createRouter({
  // In Electron (file://), hash history is the most robust.
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const authed = !!localStorage.getItem(AUTH_TOKEN_KEY)

  if (to.path === '/login') {
    if (authed) return { path: '/overview' }
    return true
  }

  if (!authed) return { path: '/login', query: { redirect: to.fullPath } }
  return true
})
