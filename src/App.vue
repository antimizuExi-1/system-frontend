<script setup>
import { ref, onMounted } from 'vue'
import LoginForm from './components/LoginForm.vue'
import { getMeApi } from './api/authApi'

// 是否已登录
const isLogin = ref(false)

// 当前用户信息
const user = ref(null)

// 调用后端 /me
async function fetchMe() {
  try {
    const res = await getMeApi()
    if (res.code === 0) {
      user.value = res.data
      isLogin.value = true
    } else {
      logout()
    }
  } catch (err) {
    // token 失效 / 过期 / 网络异常
    logout()
  }
}

// 退出登录
function logout() {
  localStorage.removeItem('token')
  user.value = null
  isLogin.value = false
}

// 页面加载时，如果有 token，就尝试获取用户信息
onMounted(() => {
  if (localStorage.getItem('token')) {
    fetchMe()
  }
})

// 登录成功回调（来自 LoginForm）
function onLoginSuccess() {
  fetchMe()
}
</script>

<template>
  <div style="padding: 40px;">
    <!-- 未登录 -->
    <LoginForm v-if="!isLogin" @success="onLoginSuccess" />

    <!-- 已登录 -->
    <div v-else>
      <h2>欢迎你，{{ user.username }}</h2>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>
