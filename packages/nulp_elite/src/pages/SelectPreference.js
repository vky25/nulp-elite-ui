import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import * as util from "../services/utilService";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectPreference = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [frameworkData, setFrameworkData] = useState();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const _userId = util.userId();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const [isRootOrg, setIsRootOrg] = useState(false);
  const [userRootOrgId, setUserRootOrgId] = useState();
  const [frameworks, setFrameworks] = useState([]);
  const [defaultFramework, setDefaultFramework] = useState("");
  const [custodianOrgId, setCustodianOrgId] = useState("");
  const [isEmptyPreference, setIsEmptyPreference] = useState(false);
  const [domain, setDomain] = useState();
  const [subDomain, setSubDomain] = useState();
  const [language, setLanguage] = useState();
  const [topic, setTopic] = useState();

  useEffect(() => {
    const fetchUserDataAndSetCustodianOrgData = async () => {
      try {
        const response = await fetch(
          "/learner/data/v1/system/settings/get/custodianOrgId"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch custodian organization ID");
        }
        const data = await response.json();
        console.log("Raw API response:", data);
        const custodianOrgId = data?.result?.response?.value;
        setCustodianOrgId(custodianOrgId);
        setUserRootOrgId(localStorage.getItem("userRootOrgId"));
        const rootOrgId = localStorage.getItem("userRootOrgId");
        if (custodianOrgId === rootOrgId) {
          const response = await fetch(
            `/api/channel/v1/read/${custodianOrgId}`
          );
          const data = await response.json();
          const defaultFramework = data?.result?.channel?.defaultFramework;
          setDefaultFramework(defaultFramework);
        } else {
          const response = await fetch(`/api/channel/v1/read/${rootOrgId}`);
          const data = await response.json();
          const defaultFramework = data?.result?.channel?.defaultFramework;
          setDefaultFramework(defaultFramework);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDataAndSetCustodianOrgData();
  }, []);

  useEffect(() => {
    if (defaultFramework) {
      getFramework(defaultFramework);
    }
  }, [defaultFramework]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory([]);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguages(event.target.value);
  };

  useEffect(() => {
    if (frameworkData) {
      getUserData();
    }
  }, [frameworkData]);

  const getFramework = async (defaultFramework) => {
    setIsLoading(true);
    setError(null);

    const url = `/api/framework/v1/read/${defaultFramework}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setFrameworkData(data?.result?.framework?.categories);
      setCategories(data?.result?.framework?.categories[0]?.terms);
      setSubCategories(data?.result?.framework?.categories[1]?.terms);
      setTopics(data?.result?.framework?.categories[2]?.terms);
      setLanguages(data?.result?.framework?.categories[3]?.terms);

      setDomain(data?.result?.framework?.categories[0]?.name);
      setSubDomain(data?.result?.framework?.categories[1]?.name);
      setTopic(data?.result?.framework?.categories[2]?.name);
      setLanguage(data?.result?.framework?.categories[3]?.name);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    setIsLoading(true);
    setError(null);

    const url = `/learner/user/v5/read/${_userId}?fields=organisations,roles,locations,declarations,externalIds`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      if (_.isEmpty(responseData?.result?.response.framework)) {
        setIsEmptyPreference(true);
      } else {
        setSelectedCategory(
          responseData?.result?.response?.framework?.board[0]
        );
        setSelectedSubCategory(
          responseData?.result?.response?.framework?.gradeLevel
        );
        setSelectedTopic(responseData?.result?.response?.framework?.subject[0]);
        setSelectedLanguages(responseData?.result?.response?.framework?.medium);
      }
      console.log("getUserData", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async () => {
    setIsLoading(true);
    setError(null);

    const url = "/learner/user/v3/update";
    const requestBody = {
      params: {},
      request: {
        framework: {
          board: [selectedCategory],
          medium: selectedLanguages,
          gradeLevel: selectedSubCategory,
          subject: [selectedTopic],
          id: "nulp",
        },
        userId: _userId,
      },
    };

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      console.log("responseData", responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = () => {
    updateUserData();
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="category-label">{domain}</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories?.map((category) => (
              <MenuItem key={category?.id} value={category?.name}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="sub-category-label">{subDomain}</InputLabel>
            <Select
              labelId="sub-category-label"
              id="sub-category-select"
              multiple
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              {subCategories?.map((subCategory) => (
                <MenuItem key={subCategory?.id} value={subCategory?.name}>
                  <Checkbox
                    checked={selectedSubCategory?.includes(subCategory?.name)}
                  />
                  <ListItemText primary={subCategory?.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="language-label">{language}</InputLabel>
            <Select
              labelId="language-label"
              id="language-select"
              multiple
              value={selectedLanguages}
              onChange={handleLanguageChange}
            >
              {languages?.map((language) => (
                <MenuItem key={language?.id} value={language?.name}>
                  <Checkbox
                    checked={selectedLanguages?.includes(language?.name)}
                  />
                  <ListItemText primary={language?.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="topic-label">{topic}</InputLabel>
          <Select
            labelId="topic-label"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            {topics?.map((topic) => (
              <MenuItem key={topic?.id} value={topic?.name}>
                {topic?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={handleSavePreferences}>Save</Button>
      {!isEmptyPreference && <Button onClick={handleClose}>Cancel</Button>}
    </div>
  );
};

export default SelectPreference;
