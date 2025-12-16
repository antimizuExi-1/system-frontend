import { API_BASE_URL } from '../config'

/**
 * 统一请求方法
 * @param {string} url 接口路径，如 /api/auth/login
 * @param {object} options fetch 配置
 */
export async function request(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body
  } = options

  // 1️⃣ 处理请求体
  let fetchBody
  const fetchHeaders = { ...headers }

  if (body !== undefined) {
    fetchHeaders['Content-Type'] = 'application/json'
    fetchBody = JSON.stringify(body)
  }

  // 2️⃣ 自动带 token（如果有）
  const token = localStorage.getItem('token')
  if (token) {
    fetchHeaders['Authorization'] = `Bearer ${token}`
  }

  // 3️⃣ 发起请求
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: fetchHeaders,
    body: fetchBody,
    credentials: 'include' // ⭐ cookie / session 必须
  })

  // 4️⃣ 尝试解析 JSON
  let data
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  // 5️⃣ 统一处理 HTTP 层错误
  if (!response.ok) {
    const message = data?.message || '请求失败'
    throw new Error(message)
  }

  return data
}
