import axios from "axios";

export async function get(url: string, headers: any = {}) {
  return await axios.get(url, {
    headers,
    withCredentials: true, // Include cookies in requests
  });
}

export async function post(url: string, body: any, headers: any = {}) {
  return await axios.post(url, body, {
    headers,
    withCredentials: true, // Include cookies in requests
  });
}

export async function update(url: string, body: any, headers: any = {}) {
  return await axios.put(url, body, {
    headers,
    withCredentials: true, // Include cookies in requests
  });
}

export async function patch(url: string, body: any, headers: any = {}) {
  return await axios.patch(url, body, {
    headers,
    withCredentials: true,
  });
}

export async function distory(url: string, body: any, headers: any = {}) {
  return await axios.delete(url, {
    headers,
    withCredentials: true, // Include cookies in requests
    data: body,
  });
}

