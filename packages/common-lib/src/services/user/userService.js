import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { get, post } from '../RestClient'

export const getOrganizationDetails = async (url, data = {}, headers = {}) => {
  const result = await post(url, data, {
    headers
  })
  if (result) {
    return result
  } else {
    return []
  }
}

export const acceptTermsAndConditions = async (
  url,
  data = {},
  headers = {}
) => {
  const result = await post(url, data, { headers })
  if (result) {
    return result
  } else {
    return []
  }
}

export const endSession = async (url) => {
  const response = await get(url)
  return response.data
}

export const getUserByKey = async (key) => {
  const response = await axios.get(url + '/' + key)
  return response.data
}

export const registerUser = async (url, data) => {
  const response = await axios.post(url, data)
  const userId = response.data.result.userId
  return userId
}

export const userMigrate = async (url, data) => {
  const response = await post(url, data)
  return response.data
}

export const getUserData = async (url, headers) => {
  try {
    const response = await get(url, headers)
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export const getFeedData = async (url) => {
  try {
    const response = await get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching feed data:', error)
    throw error
  }
}

export const getIsUserExistsUserByKey = async (url) => {
  try {
    const response = await get(url)
    return response.data
  } catch (error) {
    console.error('Error checking if user exists by key:', error)
    throw error
  }
}

export const updateGuestUser = async (url, data) => {
  try {
    const response = await post(url, data)
    return response.data
  } catch (error) {
    console.error('Error updating guest user:', error)
    throw error
  }
}

export const createGuestUser = async (url, data) => {
  try {
    const response = await post(url, data)
    return response.data
  } catch (error) {
    console.error('Error creating guest user:', error)
    throw error
  }
}

export const updateAnonymousUserDetails = async (url, data) => {
  try {
    const response = await post(url, data)
    return response.data
  } catch (error) {
    console.error('Error updating anonymous user details:', error)
    throw error
  }
}

export const createAnonymousUser = async (url, data) => {
  try {
    const response = await post(url, data)
    return response.data
  } catch (error) {
    console.error('Error creating anonymous user:', error)
    throw error
  }
}

export const getGuestUser = async (url) => {
  try {
    const response = await get(url)
    return response.data
  } catch (error) {
    console.error('Error getting guest user:', error)
    throw error
  }
}

export const getAnonymousUserPreference = async (url) => {
  try {
    const response = await get(url)
    return response.data
  } catch (error) {
    console.error('Error getting anonymous user preference:', error)
    throw error
  }
}
