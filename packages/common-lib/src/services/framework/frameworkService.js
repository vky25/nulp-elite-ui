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
  const result = await get(url, {
    header
  })
  if (result) {
    return result
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

// function YourComponent() {
//   const [frameworkData, setFrameworkData] = useState(null);
//   const [channelData, setChannelData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const channelData = await getChannel();
//         setChannelData(channelData);

//         const frameworkData = await getFrameworkCategories(channelData.defaultFramework);
//         setFrameworkData(frameworkData.result.framework);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, []);
//   const getDefaultLicense = () => {
//     return _.get(channelData, 'defaultLicense');
//   };

//   const getDefaultCourseFramework = async (hashTagId) => {
//     const userHashTagId = hashTagId ? hashTagId : '';
//     const channelData = await getChannel(userHashTagId);
//     const defaultCourseFrameworkName = _.get(channelData, 'result.channel.defaultCourseFramework');
//     return defaultCourseFrameworkName;
//   };

//   const getSortedFilters = (filters, type) => {
//     return (type === 'gradeLevel' || _.lowerCase(type) === 'class') ?
//       _.sortBy(filters, ['index', 'name']) : _.sortBy(filters, 'name');
//   };

//   const getSegmentationCommands = async () => {
//     const formRequest = {
//       formType: 'config',
//       contentType: 'segmentation_v2',
//       formAction: 'get'
//     };
//     return await formService.getFormConfig(formRequest);
//   };

//   return (
//     <div>
//       {/* Render  component content  */}
//     </div>
//   );
// }

// export default YourComponent
