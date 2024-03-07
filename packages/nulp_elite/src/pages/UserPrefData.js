// import React, { useState, useEffect } from "react";

// const UserPrefPopup = () => {
//   const [custodianOrgId, setCustodianOrgId] = useState("");
//   const [isRootOrg, setIsRootOrg] = useState(false);
//   //const [frameworks, setFrameworks] = useState([]);

//   // Effect hook to fetch user data and set custodian organization data
//   useEffect(() => {
//     fetchUserDataAndSetCustodianOrgData();
//   }, []);

//   // Function to fetch user data and set custodian organization data
//   const fetchUserDataAndSetCustodianOrgData = async () => {
//     try {
//       // Simulated response for testing
//       const data = {
//         response: {
//           organisations: [{ organisationId: "0130701891041689600" }],
//         },
//       };
//       const custodianOrgId = data.response.organisations[0]?.organisationId;
//       setCustodianOrgData(custodianOrgId);
//       setIsRootOrg(custodianOrgId === "0130701891041689600");
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Effect hook to fetch frameworks based on custodian organization ID and root organization status
//   //   useEffect(() => {
//   //     if (custodianOrgId) {
//   //       fetchFrameworks();
//   //     }
//   //   }, [custodianOrgId, isRootOrg]);

//   // Function to fetch frameworks
//   //   const fetchFrameworks = async () => {
//   //     try {
//   //       if (isRootOrg) {
//   //         // Fetch frameworks for root organization
//   //         // Implement logic to fetch frameworks for root organization
//   //         // Example:
//   //         const response = await fetch(
//   //           "https://nulp.niua.org/learner/data/v1/system/settings/get/custodianOrgId"
//   //         );
//   //         const data = await response.json();
//   //         const frameworks = data.frameworks.map((framework) => framework.name);
//   //         setFrameworks(frameworks);
//   //       } else {
//   //         // Fetch default frameworks or suggested frameworks
//   //         const response = await fetch(
//   //           `https://nulp.niua.org/api/channel/v1/read/${custodianOrgId}`
//   //         );
//   //         const data = await response.json();
//   //         const frameworks = data.response.channel.suggested_frameworks.map(
//   //           (framework) => framework.name
//   //         );
//   //         setFrameworks(frameworks);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching frameworks:", error);
//   //     }
//   //   };

//   // Function to set custodian organization data
//   const setCustodianOrgData = (orgId) => {
//     setCustodianOrgId(orgId);
//   };

//   return (
//     <div>
//       <h1>User Preferences</h1>
//       <p>Custodian Org ID: {custodianOrgId}</p>
//       <p>Is Root Org: {isRootOrg ? "Yes" : "No"}</p>
//       <h2>Frameworks:</h2>
//       <ul>
//         {/* {frameworks.map((framework, index) => (
//           <li key={index}>{framework}</li>
//         ))} */}
//       </ul>
//     </div>
//   );
// };

// export default UserPrefPopup;

// import React, { useState, useEffect } from "react";

// const UserPrefData = () => {
//   const [custodianOrgId, setCustodianOrgId] = useState("");
//   const [isRootOrg, setIsRootOrg] = useState(false);
//   const [frameworks, setFrameworks] = useState([]);
//   const [defaultFramework, setDefaultFramework] = useState([]);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
//   const userData = {
//     response: {
//       maskedPhone: null,
//       tcStatus: null,
//       channel: "niua",
//       profileUserTypes: [],
//       updatedDate: "2024-01-31 11:09:12:336+0000",
//       managedBy: null,
//       flagsValue: 4,
//       id: "20431439-c03e-4e3d-af30-e0fe38768cde",
//       recoveryEmail: "",
//       identifier: "20431439-c03e-4e3d-af30-e0fe38768cde",
//       updatedBy: "20431439-c03e-4e3d-af30-e0fe38768cde",
//       externalIds: [],
//       roleList: [
//         {
//           name: "Book Creator",
//           id: "BOOK_CREATOR",
//         },
//         {
//           name: "Membership Management",
//           id: "MEMBERSHIP_MANAGEMENT",
//         },
//         {
//           name: "Content Curation",
//           id: "CONTENT_CURATION",
//         },
//         {
//           name: "Book Reviewer",
//           id: "BOOK_REVIEWER",
//         },
//         {
//           name: "Content Creator",
//           id: "CONTENT_CREATOR",
//         },
//         {
//           name: "Org Management",
//           id: "ORG_MANAGEMENT",
//         },
//         {
//           name: "Course Admin",
//           id: "COURSE_ADMIN",
//         },
//         {
//           name: "Org Moderator",
//           id: "ORG_MODERATOR",
//         },
//         {
//           name: "Public",
//           id: "PUBLIC",
//         },
//         {
//           name: "Admin",
//           id: "ADMIN",
//         },
//         {
//           name: "Course Mentor",
//           id: "COURSE_MENTOR",
//         },
//         {
//           name: "Content Reviewer",
//           id: "CONTENT_REVIEWER",
//         },
//         {
//           name: "Report Admin",
//           id: "REPORT_ADMIN",
//         },
//         {
//           name: "Org Admin",
//           id: "ORG_ADMIN",
//         },
//         {
//           name: "Flag Reviewer",
//           id: "FLAG_REVIEWER",
//         },
//         {
//           name: "Report Viewer",
//           id: "REPORT_VIEWER",
//         },
//         {
//           name: "Program Manager",
//           id: "PROGRAM_MANAGER",
//         },
//         {
//           name: "Program Designer",
//           id: "PROGRAM_DESIGNER",
//         },
//         {
//           name: "System Administration",
//           id: "SYSTEM_ADMINISTRATION",
//         },
//       ],
//       rootOrgId: "0130701891041689600",
//       prevUsedEmail: "",
//       firstName: "NIUA Org",
//       profileLocation: [],
//       tncAcceptedOn: 1686828872216,
//       allTncAccepted: {},
//       profileDetails: null,
//       phone: "",
//       dob: null,
//       status: 1,
//       lastName: " Admin",
//       tncLatestVersion: "v12",
//       aadhaarno: null,
//       roles: [
//         {
//           role: "ORG_ADMIN",
//           createdDate: "2023-06-15 11:33:39:034+0000",
//           updatedBy: null,
//           createdBy: null,
//           scope: [
//             {
//               organisationId: "0130701891041689600",
//             },
//           ],
//           updatedDate: null,
//         },
//       ],
//       prevUsedPhone: "",
//       stateValidated: true,
//       isDeleted: false,
//       organisations: [
//         {
//           organisationId: "0130701891041689600",
//           approvedBy: null,
//           channel: "niua",
//           updatedDate: null,
//           approvaldate: null,
//           isSystemUpload: false,
//           isDeleted: false,
//           id: "0138185058661007361142",
//           isApproved: null,
//           orgjoindate: "2023-06-15 11:33:39:038+0000",
//           isSelfDeclaration: false,
//           updatedBy: null,
//           orgName: "NIUA",
//           addedByName: null,
//           addedBy: null,
//           associationType: 1,
//           locationIds: null,
//           orgLocation: [],
//           externalId: null,
//           userId: "20431439-c03e-4e3d-af30-e0fe38768cde",
//           isSchool: false,
//           hashTagId: "0130701891041689600",
//           isSSO: true,
//           isRejected: null,
//           position: null,
//           orgLeftDate: null,
//         },
//       ],
//       provider: null,
//       countryCode: null,
//       tncLatestVersionUrl:
//         "https://nulpstorage1.blob.core.windows.net/termsandconditions/terms-and-conditions-v12.html",
//       maskedEmail: "ni*********@yopmail.com",
//       regorgid: null,
//       email: "ni*********@yopmail.com",
//       rootOrg: {
//         keys: {},
//         organisationSubType: null,
//         channel: "niua",
//         description: "NIUA-Test",
//         updatedDate: "2024-01-23 11:50:55:000+0000",
//         organisationType: 5,
//         isTenant: true,
//         provider: null,
//         id: "0130701891041689600",
//         isBoard: true,
//         email: null,
//         slug: "niua",
//         isSSOEnabled: null,
//         orgName: "NIUA",
//         updatedBy: "73edf1b6-4cd2-457c-a121-1dda7a638248",
//         locationIds: [],
//         externalId: null,
//         orgLocation: [],
//         isRootOrg: true,
//         rootOrgId: "0130701891041689600",
//         imgUrl: null,
//         homeUrl: null,
//         createdDate: "2020-07-23 05:26:38:020+0000",
//         createdBy: null,
//         hashTagId: "0130701891041689600",
//         status: null,
//       },
//       tcUpdatedDate: null,
//       recoveryPhone: "",
//       userName: "niua_admin1",
//       userId: "20431439-c03e-4e3d-af30-e0fe38768cde",
//       declarations: [],
//       promptTnC: false,
//       lastLoginTime: 0,
//       createdDate: "2023-06-15 11:33:38:910+0000",
//       framework: {
//         board: ["Accessibility"],
//         gradeLevel: ["Mission"],
//         id: ["nulp"],
//         medium: ["English"],
//       },
//       createdBy: "73edf1b6-4cd2-457c-a121-1dda7a638248",
//       profileUserType: {},
//       tncAcceptedVersion: "v12",
//     },
//   };
//   const userRootOrgId = userData?.response?.rootOrgId;
//   console.log("userRootOrgId", userRootOrgId);

//   useEffect(() => {
//     const fetchUserDataAndSetCustodianOrgData = async () => {
//       try {
//         const response = await fetch(
//           "https://nulp.niua.org/learner/data/v1/system/settings/get/custodianOrgId"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch custodian organization ID");
//         }
//         const data = await response.json();
//         console.log("Raw API response:", data);
//         const custodianOrgId = data?.result?.response?.value;
//         setCustodianOrgId(custodianOrgId);
//         const userRootOrgId = userData?.response?.rootOrgId;
//         if (custodianOrgId === userRootOrgId) {
//           setIsRootOrg(true);
//         } else {
//           setIsRootOrg(false);
//         }

//         if (isRootOrg || !isUserLoggedIn) {
//           const response = await fetch(
//             `https://nulp.niua.org/api/channel/v1/read/${custodianOrgId}`
//           );
//           const data = await response.json();
//           const frameworks = data?.result?.channel?.frameworks.map(
//             (framework) => framework.name
//           );
//           setFrameworks(frameworks);
//         } else {
//           const response = await fetch(
//             `https://nulp.niua.org/api/channel/v1/read/${userRootOrgId}`
//           );
//           const data = await response.json();
//           const frameworks = data?.result?.channel?.suggested_frameworks.map(
//             (framework) => framework.name
//           );
//           const defaultFramework = data?.result?.channel?.defaultFramework;
//           const frameworkId = defaultFramework;
//           setFrameworks(frameworks);
//           setDefaultFramework(frameworkId);
//           console.log("frameworkId", frameworkId);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (isUserLoggedIn) {
//       fetchUserDataAndSetCustodianOrgData();
//     } else {
//       fetchUserDataAndSetCustodianOrgData();
//     }
//     return () => {};
//   }, []);

//   const getFrameworkCategories = async (frameworkId) => {
//     try {
//       const frameworkOptionsResponse = await fetch(
//         `https://nulp.niua.org/api/framework/v1/read/${frameworkId}?categories=board,gradeLevel,medium,class,subject`
//       );
//       if (!frameworkOptionsResponse.ok) {
//         throw new Error("Failed to fetch framework options");
//       }
//       const frameworkOptions = await frameworkOptionsResponse.json();
//       console.log("frameworkOptions", frameworkOptions);
//       return frameworkOptions;
//     } catch (error) {
//       console.error("Error fetching framework options:", error);
//       throw error;
//     }
//   };
//   getFrameworkCategories(frameworkId);

//   //   return () => {};
//   //   return {
//   //     custodianOrgId,
//   //     isRootOrg,
//   //     frameworks,
//   //     defaultFramework,
//   //     getFrameworkCategories,
//   //   };

//   return (
//     <div>
//       <h1>User Preferences</h1>
//       <p>Custodian Org ID: {custodianOrgId}</p>
//       <p>Is Root Org: {isRootOrg ? "Yes" : "No"}</p>
//       <h2>getFrameworkCategories:</h2>
//     </div>
//   );
// };

// export default UserPrefData;

// const UserPrefData = () => {
//   const [custodianOrgId, setCustodianOrgId] = useState("");
//   const [isRootOrg, setIsRootOrg] = useState(false);
//   const [frameworks, setFrameworks] = useState([]);
//   const [defaultFramework, setDefaultFramework] = useState([]);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);

//   const userData = {
//     // Your user data object...
//   };

//   const userRootOrgId = userData?.response?.rootOrgId;

//   useEffect(() => {
//     const fetchUserDataAndSetCustodianOrgData = async () => {
//       try {
//         const response = await fetch(
//           "https://nulp.niua.org/learner/data/v1/system/settings/get/custodianOrgId"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch custodian organization ID");
//         }
//         const data = await response.json();
//         const custodianOrgId = data?.result?.response?.value;
//         setCustodianOrgId(custodianOrgId);

//         if (custodianOrgId === userRootOrgId) {
//           setIsRootOrg(true);
//         } else {
//           setIsRootOrg(false);
//         }

//         let frameworkId;
//         if (isRootOrg || !isUserLoggedIn) {
//           frameworkId = custodianOrgId;
//         } else {
//           frameworkId = userRootOrgId;
//         }

//         const frameworkOptions = await getFrameworkCategories(frameworkId);
//         console.log("frameworkOptions", frameworkOptions);
//         // Further processing of framework options
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (isUserLoggedIn) {
//       fetchUserDataAndSetCustodianOrgData();
//     } else {
//       fetchUserDataAndSetCustodianOrgData();
//     }
//   }, [isUserLoggedIn, userRootOrgId]);

//   const getFrameworkCategories = async (frameworkId) => {
//     try {
//       const frameworkOptionsResponse = await fetch(
//         `https://nulp.niua.org/api/framework/v1/read/${frameworkId}?categories=board,gradeLevel,medium,class,subject`
//       );
//       if (!frameworkOptionsResponse.ok) {
//         throw new Error("Failed to fetch framework options");
//       }
//       const frameworkOptions = await frameworkOptionsResponse.json();
//       return frameworkOptions;
//     } catch (error) {
//       console.error("Error fetching framework options:", error);
//       throw error;
//     }
//   };

//   return (
//     <div>
//       <h1>User Preferences</h1>
//       <p>Custodian Org ID: {custodianOrgId}</p>
//       <p>Is Root Org: {isRootOrg ? "Yes" : "No"}</p>
//       <h2>getFrameworkCategories:</h2>
//     </div>
//   );
// };

// export default UserPrefData;

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import UserPrefPopup from "./UserPrefPopup";

const UserPrefData = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [custodianOrgId, setCustodianOrgId] = useState("");
  const [isRootOrg, setIsRootOrg] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [defaultFramework, setDefaultFramework] = useState([]);
  const [frameworkId, setFrameworkId] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const userData = {
    response: {
      maskedPhone: null,
      tcStatus: null,
      channel: "niua",
      profileUserTypes: [],
      updatedDate: "2024-01-31 11:09:12:336+0000",
      managedBy: null,
      flagsValue: 4,
      id: "20431439-c03e-4e3d-af30-e0fe38768cde",
      recoveryEmail: "",
      identifier: "20431439-c03e-4e3d-af30-e0fe38768cde",
      updatedBy: "20431439-c03e-4e3d-af30-e0fe38768cde",
      externalIds: [],
      roleList: [
        {
          name: "Book Creator",
          id: "BOOK_CREATOR",
        },
        {
          name: "Membership Management",
          id: "MEMBERSHIP_MANAGEMENT",
        },
        {
          name: "Content Curation",
          id: "CONTENT_CURATION",
        },
        {
          name: "Book Reviewer",
          id: "BOOK_REVIEWER",
        },
        {
          name: "Content Creator",
          id: "CONTENT_CREATOR",
        },
        {
          name: "Org Management",
          id: "ORG_MANAGEMENT",
        },
        {
          name: "Course Admin",
          id: "COURSE_ADMIN",
        },
        {
          name: "Org Moderator",
          id: "ORG_MODERATOR",
        },
        {
          name: "Public",
          id: "PUBLIC",
        },
        {
          name: "Admin",
          id: "ADMIN",
        },
        {
          name: "Course Mentor",
          id: "COURSE_MENTOR",
        },
        {
          name: "Content Reviewer",
          id: "CONTENT_REVIEWER",
        },
        {
          name: "Report Admin",
          id: "REPORT_ADMIN",
        },
        {
          name: "Org Admin",
          id: "ORG_ADMIN",
        },
        {
          name: "Flag Reviewer",
          id: "FLAG_REVIEWER",
        },
        {
          name: "Report Viewer",
          id: "REPORT_VIEWER",
        },
        {
          name: "Program Manager",
          id: "PROGRAM_MANAGER",
        },
        {
          name: "Program Designer",
          id: "PROGRAM_DESIGNER",
        },
        {
          name: "System Administration",
          id: "SYSTEM_ADMINISTRATION",
        },
      ],
      rootOrgId: "0130171255884513283",
      prevUsedEmail: "",
      firstName: "NIUA Org",
      profileLocation: [],
      tncAcceptedOn: 1686828872216,
      allTncAccepted: {},
      profileDetails: null,
      phone: "",
      dob: null,
      status: 1,
      lastName: " Admin",
      tncLatestVersion: "v12",
      aadhaarno: null,
      roles: [
        {
          role: "ORG_ADMIN",
          createdDate: "2023-06-15 11:33:39:034+0000",
          updatedBy: null,
          createdBy: null,
          scope: [
            {
              organisationId: "0130701891041689600",
            },
          ],
          updatedDate: null,
        },
      ],
      prevUsedPhone: "",
      stateValidated: true,
      isDeleted: false,
      organisations: [
        {
          organisationId: "0130701891041689600",
          approvedBy: null,
          channel: "niua",
          updatedDate: null,
          approvaldate: null,
          isSystemUpload: false,
          isDeleted: false,
          id: "0138185058661007361142",
          isApproved: null,
          orgjoindate: "2023-06-15 11:33:39:038+0000",
          isSelfDeclaration: false,
          updatedBy: null,
          orgName: "NIUA",
          addedByName: null,
          addedBy: null,
          associationType: 1,
          locationIds: null,
          orgLocation: [],
          externalId: null,
          userId: "20431439-c03e-4e3d-af30-e0fe38768cde",
          isSchool: false,
          hashTagId: "0130701891041689600",
          isSSO: true,
          isRejected: null,
          position: null,
          orgLeftDate: null,
        },
      ],
      provider: null,
      countryCode: null,
      tncLatestVersionUrl:
        "https://nulpstorage1.blob.core.windows.net/termsandconditions/terms-and-conditions-v12.html",
      maskedEmail: "ni*********@yopmail.com",
      regorgid: null,
      email: "ni*********@yopmail.com",
      rootOrg: {
        keys: {},
        organisationSubType: null,
        channel: "niua",
        description: "NIUA-Test",
        updatedDate: "2024-01-23 11:50:55:000+0000",
        organisationType: 5,
        isTenant: true,
        provider: null,
        id: "0130701891041689600",
        isBoard: true,
        email: null,
        slug: "niua",
        isSSOEnabled: null,
        orgName: "NIUA",
        updatedBy: "73edf1b6-4cd2-457c-a121-1dda7a638248",
        locationIds: [],
        externalId: null,
        orgLocation: [],
        isRootOrg: true,
        rootOrgId: "0130701891041689600",
        imgUrl: null,
        homeUrl: null,
        createdDate: "2020-07-23 05:26:38:020+0000",
        createdBy: null,
        hashTagId: "0130701891041689600",
        status: null,
      },
      tcUpdatedDate: null,
      recoveryPhone: "",
      userName: "niua_admin1",
      userId: "20431439-c03e-4e3d-af30-e0fe38768cde",
      declarations: [],
      promptTnC: false,
      lastLoginTime: 0,
      createdDate: "2023-06-15 11:33:38:910+0000",
      framework: {
        board: ["Accessibility"],
        gradeLevel: ["Mission"],
        id: ["nulp"],
        medium: ["English"],
      },
      createdBy: "73edf1b6-4cd2-457c-a121-1dda7a638248",
      profileUserType: {},
      tncAcceptedVersion: "v12",
    },
  };
  const userRootOrgId = userData?.response?.rootOrgId;
  console.log("userRootOrgId", userRootOrgId);

  useEffect(() => {
    const fetchUserDataAndSetCustodianOrgData = async () => {
      // try {
      //   const url =
      //     "http://localhost:3000/learner/user/v5/read/5d757783-a86a-40cd-a814-1b6a16d37cb6?fields=organisations,roles,locations,declarations,externalIds";
      //   const response = await userService.getUserData(url, headers);
      //   console.log(userData?.response?.rootOrgId);
      //   setData(response.data.result);
      //   const userRootOrgId = userData?.response?.rootOrgId;
      // } catch (error) {
      //   setError(error.message);
      // } finally {
      //   setIsLoading(false);
      // }
      try {
        const response = await fetch(
          "https://nulp.niua.org/learner/data/v1/system/settings/get/custodianOrgId"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch custodian organization ID");
        }
        const data = await response.json();
        console.log("Raw API response:", data);
        const custodianOrgId = data?.result?.response?.value;
        setCustodianOrgId(custodianOrgId);
        const userRootOrgId = userData?.response?.rootOrgId;
        if (custodianOrgId === userRootOrgId) {
          setIsRootOrg(true);
        } else {
          setIsRootOrg(false);
        }

        if (isRootOrg || !isUserLoggedIn) {
          const response = await fetch(
            `https://nulp.niua.org/api/channel/v1/read/${custodianOrgId}`
          );
          const data = await response.json();
          const frameworks = data?.result?.channel?.frameworks.map(
            (framework) => framework.name
          );
          setFrameworks(frameworks);
        } else {
          const response = await fetch(
            `https://nulp.niua.org/api/channel/v1/read/${userRootOrgId}`
          );
          const data = await response.json();
          const frameworks = data?.result?.channel?.suggested_frameworks.map(
            (framework) => framework.name
          );
          const defaultFramework = data?.result?.channel?.defaultFramework;
          //   const frameworkId = defaultFramework;
          const frameworkData = data?.result?.framework?.categories;
          setFrameworks(frameworks);
          setDefaultFramework(frameworkId);
          console.log("frameworkId", frameworkId);
          getFrameworkCategories(defaultFramework);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isUserLoggedIn) {
      fetchUserDataAndSetCustodianOrgData();
    } else {
      fetchUserDataAndSetCustodianOrgData();
    }

    const getFrameworkCategories = async (defaultFramework) => {
      try {
        const frameworkOptionsResponse = await fetch(
          `https://nulp.niua.org/api/framework/v1/read/${defaultFramework}?categories=board,gradeLevel,medium,class,subject`
        );

        const frameworkOptions = await frameworkOptionsResponse.json();
        console.log("frameworkOptions", frameworkOptions);
        return frameworkOptions;
      } catch (error) {
        console.error("Error ....:", error);
        throw error;
      }
    };

    // if (onOpen) {
    //   getFrameworkCategories();
    // }
  }, [onOpen]);

  //   return () => {};
  //   return {
  //     custodianOrgId,
  //     isRootOrg,
  //     frameworks,
  //     defaultFramework,
  //     getFrameworkCategories,
  //   };

  return (
    <>
      <Button onClick={onOpen}>Preference popup</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <UserPrefPopup />
      </Modal>
      {/* <UserPrefData onOpen={onOpen} />
      <UserPrefPopup isOpen={isOpen} onClose={onClose} /> */}
    </>
    // <div>
    //   <h1>User Preferences</h1>
    //   <p>Custodian Org ID: {custodianOrgId}</p>
    //   <p>Is Root Org: {isRootOrg ? "Yes" : "No"}</p>
    //   <h2>getFrameworkCategories:</h2>
    // </div>
  );
};

export default UserPrefData;
