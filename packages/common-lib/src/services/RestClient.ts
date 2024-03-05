import axios from 'axios'

export async function get(url: string, headers: any = {}) {
  return await axios.get(url, {
    headers
  })
}

export async function post(url: string, body: any, headers: any = {}) {
  return await axios.post(url, body, {
    headers
  })
}

export async function update(url: string, body: any, headers: any = {}) {
  return await axios.put(url, body, {
    headers
  })
}

export async function distory(url: string, body: any, headers: any = {}) {
  return await axios.delete(url, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' },
    data: body
  })
}
