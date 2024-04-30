import _ from "lodash"; // Import lodash library if not already imported
import { get } from "./RestClient.ts";

// Define API functions
export const getChannel = async (url, header) => {
  const result = await get(url, {
    header,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getFrameworkCategories = async (url, header) => {
  const result = await get(url, {
    header,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getCourseFramework = async (url, header) => {
  const result = await get(url, {
    header,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getSelectedFrameworkCategories = async (url, header) => {
  const result = await get(url, {
    header,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};
export const getUserData = async (url, header, requestBody) => {
  const result = await patch(url, {
    header,
    requestBody
  })
  if (result) {
    return result
  } else {
    return []
  }
}
