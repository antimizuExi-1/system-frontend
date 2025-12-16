<script setup>
import { ref, onMounted } from 'vue'
import { API_BASE_URL } from '../config'
import { request } from '../utils/request'

// 接收父组件的 v-model
const modelValue = defineModel()

const captchaSvg = ref('')

// 获取验证码  验证码是特殊接口（返回 SVG），不强行塞进 request 是对的。
async function loadCaptcha() {
  // 注意：验证码是 text，不是 json
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/captcha`, {
    credentials: 'include'
  })
  captchaSvg.value = await res.text()
}

// 暴露给父组件，用于登录失败时刷新
defineExpose({
  loadCaptcha
})

onMounted(() => {
  loadCaptcha()
})
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center;">
    <input
      v-model="modelValue"
      placeholder="验证码"
      style="width: 100px;"
    />
    <span
      v-html="captchaSvg"
      style="cursor: pointer;"
      @click="loadCaptcha"
    ></span>
  </div>
</template>
