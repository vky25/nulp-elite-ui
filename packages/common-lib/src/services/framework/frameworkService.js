import React, { useState, useEffect } from 'react'
import _ from 'lodash' // Import lodash library if not already imported
import { get } from '../RestClient'

// Define API functions
export const getChannel = async (url, header) => {
  const result = await get(url, {
    header
  })
  if (result) {
    return result
  } else {
    return []
  }
}

export const getFrameworkCategories = async (url, header) => {
  const response = await get(url, {
    header
  })
  if (response) {
    return response
  } else {
    return []
  }
}

export const getCourseFramework = async (url, header) => {
  const result = await get(url, {
    header
  })
  if (result) {
    return result
  } else {
    return []
  }
}

export const getSelectedFrameworkCategories = async (url, header) => {
  const result = await get(url, {
    header
  })
  if (result) {
    return result
  } else {
    return []
  }
}
