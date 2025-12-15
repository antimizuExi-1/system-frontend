<script setup>
import { ref } from 'vue'

// 表单数据
const username = ref('')
const password = ref('')
const captcha = ref('')

// 验证码 svg
const captchaSvg = ref('')

// 获取验证码
async function loadCaptcha() {
  const res = await fetch('http://localhost:3000/api/auth/captcha', {
    credentials: 'include' // ⭐ 非常重要：带 cookie（session）
  })
  captchaSvg.value = await res.text()
}

// 登录
async function login() {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // ⭐ 必须
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      captcha: captcha.value
    })
  })

  const data = await res.json()
  if (data.code === 0) {
    alert('登录成功')
    console.log('token:', data.data.token)
    localStorage.setItem('token', data.data.token)
  } else {
    alert(data.message)
    loadCaptcha() // 失败就刷新验证码
  }
}

// 页面加载时先获取验证码
loadCaptcha()
</script>

<template>
  <div style="padding: 40px; max-width: 300px">
    <h2>登录</h2>

    <div>
      <input
        v-model="username"
        placeholder="用户名"
      />
    </div>

    <div>
      <input
        type="password"
        v-model="password"
        placeholder="密码"
      />
    </div>

    <div>
      <input
        v-model="captcha"
        placeholder="验证码"
        style="width: 120px"
      />
      <span
        v-html="captchaSvg"
        style="cursor: pointer"
        @click="loadCaptcha"
      ></span>
    </div>

    <button @click="login">登录</button>
  </div>
</template>
