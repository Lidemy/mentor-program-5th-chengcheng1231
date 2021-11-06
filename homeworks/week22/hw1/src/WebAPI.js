import { getAuthToken } from "./utils"
export const BASE_URL = 'https://student-json-api.lidemy.me'

export const GetPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) => 
    res.json()
  )
}

export const GetLimitPosts = (page, limit) => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`)
}

export const GetSinglePost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => 
    res.json()
  )
}

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json())
}

export const getMe = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
}

export const register = ( nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  }).then(res => res.json())
}

export const publish = (title, body) => {
  console.log(title, body)
  const token = getAuthToken()
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json())
}