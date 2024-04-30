import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    localStorage.setItem(
      "preference",
      JSON.stringify(userData.response.framework)
    );
    const fetchUserDataAndSetCustodianOrgData = async () => {
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
          setDefaultFramework(defaultFramework);
          console.log("defaultFramework", defaultFramework);
          console.log("frameworkId", frameworkId);
          getFrameworkCategories(defaultFramework);
          console.log("defaultFramework1", defaultFramework);
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
  }, [onOpen]);

  return (
    <>
      <UserPrefPopup />
    </>
  );
};

export default UserPrefData;
