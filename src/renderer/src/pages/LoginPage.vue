<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NCard, NForm, NFormItem, NInput, NSpace } from 'naive-ui'

const AUTH_TOKEN_KEY = 'auth:token'
const AUTH_NAME_KEY = 'auth:name'

const router = useRouter()
const route = useRoute()

const username = ref(localStorage.getItem(AUTH_NAME_KEY) ?? 'Yang')
const password = ref('')
const loading = ref(false)
const errorText = ref('')

function login(): void {
  errorText.value = ''
  const name = username.value.trim()
  if (!name) {
    errorText.value = '请输入用户名'
    return
  }

  loading.value = true
  window.setTimeout(() => {
    localStorage.setItem(AUTH_TOKEN_KEY, `demo-${Date.now()}`)
    localStorage.setItem(AUTH_NAME_KEY, name)
    loading.value = false

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/overview'
    router.replace(redirect)
  }, 200)
}
</script>

<template>
  <div class="login-page">
    <n-card class="login-card" title="登录" size="large">
      <n-form>
        <n-form-item label="用户名">
          <n-input v-model:value="username" placeholder="请输入用户名" clearable @keyup.enter="login" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="click"
            placeholder="任意填写（演示）"
            @keyup.enter="login"
          />
        </n-form-item>
      </n-form>

      <div v-if="errorText" class="login-error">{{ errorText }}</div>

      <n-space justify="end">
        <n-button :loading="loading" type="primary" @click="login">进入</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped>
.login-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: min(420px, 92vw);
}

.login-error {
  margin: 6px 0 0;
  font-size: 12px;
  color: #d03050;
}
</style>
