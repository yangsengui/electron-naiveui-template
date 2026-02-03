<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput, NIcon } from 'naive-ui'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
import electronLogo from '../assets/electron.svg'

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
  }, 800)
}
</script>

<template>
  <div class="login-wrapper">
    <!-- Draggable Region -->
    <div class="drag-region"></div>

    <div class="login-left">
      <div class="brand-content">
        <img :src="electronLogo" alt="Logo" class="logo" />
        <h1 class="brand-title">Electron Naive</h1>
        <p class="brand-desc">
          High performance, intuitive, and modern dashboard solution.
        </p>
      </div>
      <div class="decoration-circle"></div>
      <div class="decoration-circle-small"></div>
    </div>

    <div class="login-right">
      <div class="login-form-container">
        <div class="header-text">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <n-form size="large" class="login-form">
          <n-form-item :show-label="false">
            <n-input
              v-model:value="username"
              placeholder="Username"
              clearable
              @keyup.enter="login"
            >
              <template #prefix>
                <n-icon :component="PersonOutline" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item :show-label="false">
            <n-input
              v-model:value="password"
              type="password"
              show-password-on="click"
              placeholder="Password"
              @keyup.enter="login"
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" />
              </template>
            </n-input>
          </n-form-item>
        </n-form>

        <div v-if="errorText" class="login-error">{{ errorText }}</div>

        <n-button
          class="login-button"
          :loading="loading"
          type="primary"
          size="large"
          block
          @click="login"
        >
          Sign In
        </n-button>

        <div class="footer-links">
          <span>Don't have an account?</span>
          <span class="link">Create account</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
}

:global(.is-dark) .login-wrapper {
  background-color: #101014;
}

.drag-region {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  -webkit-app-region: drag;
  z-index: 9999;
  pointer-events: none;
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #18a058 0%, #10b981 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
  /* Prevent dragging from the branding area if desired, or allow it. 
     Usually large areas shouldn't be draggable if they have interactive content, 
     but here it's just branding. */
}

.brand-content {
  z-index: 2;
  text-align: center;
  padding: 0 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.brand-title {
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.brand-desc {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
}

.decoration-circle {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
}

.decoration-circle-small {
  position: absolute;
  bottom: -5%;
  right: -5%;
  width: 30vw;
  height: 30vw;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
}

.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #ffffff;
}

:global(.is-dark) .login-right {
  background-color: #101014;
}

.login-form-container {
  width: 100%;
  max-width: 380px;
  padding: 40px;
  z-index: 10;
}

.header-text {
  margin-bottom: 40px;
}

.header-text h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--n-text-color);
}

.header-text p {
  color: var(--n-text-color-3);
  font-size: 14px;
}

.login-form {
  margin-bottom: 24px;
}

.login-error {
  margin-bottom: 16px;
  color: #d03050;
  font-size: 13px;
  text-align: center;
}

.login-button {
  font-weight: 600;
  height: 44px;
  font-size: 16px;
}

.footer-links {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: var(--n-text-color-3);
}

.link {
  color: #18a058;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-left {
    display: none;
  }
}
</style>
