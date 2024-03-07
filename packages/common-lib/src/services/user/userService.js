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
    console.log('response', response)
    return {
      response: {
        maskedPhone: null,
        tcStatus: null,
        channel: 'niua',
        profileUserTypes: [],
        updatedDate: '2024-01-31 11:09:12:336+0000',
        managedBy: null,
        flagsValue: 4,
        id: '20431439-c03e-4e3d-af30-e0fe38768cde',
        recoveryEmail: '',
        identifier: '20431439-c03e-4e3d-af30-e0fe38768cde',
        updatedBy: '20431439-c03e-4e3d-af30-e0fe38768cde',
        externalIds: [],
        roleList: [
          {
            name: 'Book Creator',
            id: 'BOOK_CREATOR'
          },
          {
            name: 'Membership Management',
            id: 'MEMBERSHIP_MANAGEMENT'
          },
          {
            name: 'Content Curation',
            id: 'CONTENT_CURATION'
          },
          {
            name: 'Book Reviewer',
            id: 'BOOK_REVIEWER'
          },
          {
            name: 'Content Creator',
            id: 'CONTENT_CREATOR'
          },
          {
            name: 'Org Management',
            id: 'ORG_MANAGEMENT'
          },
          {
            name: 'Course Admin',
            id: 'COURSE_ADMIN'
          },
          {
            name: 'Org Moderator',
            id: 'ORG_MODERATOR'
          },
          {
            name: 'Public',
            id: 'PUBLIC'
          },
          {
            name: 'Admin',
            id: 'ADMIN'
          },
          {
            name: 'Course Mentor',
            id: 'COURSE_MENTOR'
          },
          {
            name: 'Content Reviewer',
            id: 'CONTENT_REVIEWER'
          },
          {
            name: 'Report Admin',
            id: 'REPORT_ADMIN'
          },
          {
            name: 'Org Admin',
            id: 'ORG_ADMIN'
          },
          {
            name: 'Flag Reviewer',
            id: 'FLAG_REVIEWER'
          },
          {
            name: 'Report Viewer',
            id: 'REPORT_VIEWER'
          },
          {
            name: 'Program Manager',
            id: 'PROGRAM_MANAGER'
          },
          {
            name: 'Program Designer',
            id: 'PROGRAM_DESIGNER'
          },
          {
            name: 'System Administration',
            id: 'SYSTEM_ADMINISTRATION'
          }
        ],
        rootOrgId: '0130701891041689600',
        prevUsedEmail: '',
        firstName: 'NIUA Org',
        profileLocation: [],
        tncAcceptedOn: 1686828872216,
        allTncAccepted: {},
        profileDetails: null,
        phone: '',
        dob: null,
        status: 1,
        lastName: ' Admin',
        tncLatestVersion: 'v12',
        aadhaarno: null,
        roles: [
          {
            role: 'ORG_ADMIN',
            createdDate: '2023-06-15 11:33:39:034+0000',
            updatedBy: null,
            createdBy: null,
            scope: [
              {
                organisationId: '0130701891041689600'
              }
            ],
            updatedDate: null
          }
        ],
        prevUsedPhone: '',
        stateValidated: true,
        isDeleted: false,
        organisations: [
          {
            organisationId: '0130701891041689600',
            approvedBy: null,
            channel: 'niua',
            updatedDate: null,
            approvaldate: null,
            isSystemUpload: false,
            isDeleted: false,
            id: '0138185058661007361142',
            isApproved: null,
            orgjoindate: '2023-06-15 11:33:39:038+0000',
            isSelfDeclaration: false,
            updatedBy: null,
            orgName: 'NIUA',
            addedByName: null,
            addedBy: null,
            associationType: 1,
            locationIds: null,
            orgLocation: [],
            externalId: null,
            userId: '20431439-c03e-4e3d-af30-e0fe38768cde',
            isSchool: false,
            hashTagId: '0130701891041689600',
            isSSO: true,
            isRejected: null,
            position: null,
            orgLeftDate: null
          }
        ],
        provider: null,
        countryCode: null,
        tncLatestVersionUrl:
          'https://nulpstorage1.blob.core.windows.net/termsandconditions/terms-and-conditions-v12.html',
        maskedEmail: 'ni*********@yopmail.com',
        regorgid: null,
        email: 'ni*********@yopmail.com',
        rootOrg: {
          keys: {},
          organisationSubType: null,
          channel: 'niua',
          description: 'NIUA-Test',
          updatedDate: '2024-01-23 11:50:55:000+0000',
          organisationType: 5,
          isTenant: true,
          provider: null,
          id: '0130701891041689600',
          isBoard: true,
          email: null,
          slug: 'niua',
          isSSOEnabled: null,
          orgName: 'NIUA',
          updatedBy: '73edf1b6-4cd2-457c-a121-1dda7a638248',
          locationIds: [],
          externalId: null,
          orgLocation: [],
          isRootOrg: true,
          rootOrgId: '0130701891041689600',
          imgUrl: null,
          homeUrl: null,
          createdDate: '2020-07-23 05:26:38:020+0000',
          createdBy: null,
          hashTagId: '0130701891041689600',
          status: null
        },
        tcUpdatedDate: null,
        recoveryPhone: '',
        userName: 'niua_admin1',
        userId: '20431439-c03e-4e3d-af30-e0fe38768cde',
        declarations: [],
        promptTnC: false,
        lastLoginTime: 0,
        createdDate: '2023-06-15 11:33:38:910+0000',
        framework: {
          board: ['Accessibility'],
          gradeLevel: ['Mission'],
          id: ['nulp'],
          medium: ['English']
        },
        createdBy: '73edf1b6-4cd2-457c-a121-1dda7a638248',
        profileUserType: {},
        tncAcceptedVersion: 'v12'
      }
    }
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

export const getCustodianOrgData = async (url) => {
  try {
    const response = await get(url)
    return response.data
  } catch (error) {
    console.error('Error getting anonymous user preference:', error)
    throw error
  }
}
