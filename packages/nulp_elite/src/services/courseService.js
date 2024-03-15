import { post, get, update } from "./RestClient.ts";

//  Get all content
export const getAllCourses = async (url, filters = {}, header = {}) => {
  const result = await post(url, filters, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getOne = async (url, header = {}) => {
  const result = await get(url, {
    header,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

// Update content
export const updateCourseProgress = async (url, data = {}, headers = {}) => {
  const result = await update(url, data, {
    headers,
  });
  if (result) {
    return result;
  } else {
    return {};
  }
};

export const getCourseSection = async (url, headers = {}) => {
  const result = await get(url, { headers });
  if (result) {
    return result;
  } else {
    return {};
  }
};

export const getQRCodeFile = async (url, data = {}, headers = {}) => {
  const result = await post(url, { data }, { headers });
  if (result) {
    return result;
  } else {
    return {};
  }
};

export const getEnrolledCourses = async (url, headers = {}) => {
  const result = await get(url, { headers });
  if (result) {
    return result;
  } else {
    return {};
  }
};
