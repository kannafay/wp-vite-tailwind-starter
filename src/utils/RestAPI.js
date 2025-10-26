/**
 * WordPress REST API 封装
 * 
 * 支持 GET、POST、PATCH、PUT、DELETE 方法
 * 
 * 用法：
 * import { RestAPI } from './RestAPI.js'
 * RestAPI.get('freshia/v1/test')
 * RestAPI.post('freshia/v1/save', { name: 'Kanna' })
 */

import axios from 'axios'

// 私有变量
const base = window.wp?.rest_url || '/wp-json/'
const nonce = window.wp?.nonce || ''

// 私有请求方法
async function request(endpoint, { method = 'GET', body = null, params = {}, headers = {} } = {}) {
    const url = endpoint.startsWith('http')
        ? endpoint
        : `${base}${endpoint.replace(/^\/+/, '')}`

    const finalHeaders = { ...headers }
    if (nonce) {
        finalHeaders['X-WP-Nonce'] = nonce
    }

    // 对象转 JSON
    let data = body
    if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {
        finalHeaders['Content-Type'] = 'application/json'
        data = JSON.stringify(body)
    }

    try {
        const res = await axios({
            url,
            method,
            headers: finalHeaders,
            data: method !== 'GET' ? data : undefined,
            params: method === 'GET' ? params : undefined,
            withCredentials: true,
        })
        return res.data
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data?.message || `HTTP Error ${err.response.status}`)
        } else {
            throw err
        }
    }
}

// 导出的对象
const RestAPI = {
    get(endpoint, params = {}) {
        return request(endpoint, { method: 'GET', params })
    },
    post(endpoint, body) {
        return request(endpoint, { method: 'POST', body })
    },
    patch(endpoint, body) {
        return request(endpoint, { method: 'PATCH', body })
    },
    put(endpoint, body) {
        return request(endpoint, { method: 'PUT', body })
    },
    delete(endpoint, body) {
        return request(endpoint, { method: 'DELETE', body })
    },
}

export default RestAPI