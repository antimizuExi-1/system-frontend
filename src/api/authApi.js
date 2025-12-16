import { request } from '../utils/request'

/**
 * 登录
 */
export function loginApi({ username, password, captcha }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: {
      username,
      password,
      captcha
    }
  })
}

/**
 * 获取当前登录用户信息
 */
export function getMeApi() {
  return request('/api/auth/me')
}

/**
 * 注册
 */
export function registerApi({ username, password, captcha }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: {
      username,
      password,
      captcha
    }
  })
}
