//This is for  Tesing perpose

import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import URLSConfig from "../configs/urlConfig.json";
import {
  endSession,
  getOrganizationDetails,
  acceptTermsAndConditions,
  getUserByKey,
  registerUser,
  userMigrate,
  getUserData,
  getFeedData,
  getIsUserExistsUserByKey,
  updateGuestUser,
  createGuestUser,
  updateAnonymousUserDetails,
  createAnonymousUser,
  getGuestUser,
  getAnonymousUserPreference,
  updateUserData,
} from "../services/userService";

const User = () => {
  const [data, setData] = useState({});
  const [userid, setUserid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [organisationIds, setOrganisationIds] = useState("");

  useEffect(() => {
    endSessionPage();
    getUserDataPage();
    updateUserDataPage();
    getOrganizationDetailsPage();
    registerUserPage();
    getAnonymousUserPreferencePage();
    getIsUserExistsUserByKeyPage();
    getGuestUserPage();
    getUserByKeyPage();
    getFeedDataPage();
    userMigratePage();
  }, []);
  const headers = {
    "content-type": "Application/json",
  };
  const endSessionPage = async () => {
    try {
      setIsLoading(true);
      const url = URLSConfig.URLS.USER.END_SESSION;
      const response = await endSession(url);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDataPage = async () => {
    try {
      // setIsLoading(true);
      const params = URLSConfig.params.userReadParam.fields;

      const baseUrl =
        "http://localhost:3000/learner/" + URLSConfig.URLS.USER.GET_PROFILE; // Assuming this does not contain /modules/nulp_elite
      const url = `${baseUrl}5d757783-a86a-40cd-a814-1b6a16d37cb6?fields=${params}`;
      console.log(url);
      const response = await getUserData(url, headers);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserDataPage = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.USER.UPDATE_USER_PROFILE;
      const response = await updateUserData(url, data);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getAnonymousUserPreferencePage = async () => {
    try {
      const url =
        "http://localhost:3000/api/" + URLSConfig.URLS.OFFLINE.READ_USER;
      const response = await getAnonymousUserPreference(url);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getGuestUserPage = async () => {
    try {
      const url =
        "http://localhost:3000/api/" + URLSConfig.URLS.OFFLINE.READ_USER;
      const response = await getGuestUser(url);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getIsUserExistsUserByKeyPage = async (key) => {
    try {
      const response = await getIsUserExistsUserByKey(
        (url =
          "http://localhost:3000/api/" +
          URLSConfig.URLS.USER.USER_EXISTS_GET_USER_BY_KEY +
          "/" +
          key)
      );
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getUserByKeyPage = async (key) => {
    try {
      const response = await getUserByKey(
        (url =
          "http://localhost:3000/api/" +
          URLSConfig.URLS.USER.GET_USER_BY_KEY +
          "/" +
          key)
      );
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getFeedDataPage = async () => {
    try {
      const response = await getFeedData(
        (url =
          "http://localhost:3000/api/" +
          URLSConfig.URLS.USER.GET_USER_FEED +
          "/" +
          userid)
      );
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const userMigratePage = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.USER.USER_MIGRATE;
      const response = await userMigrate(url, data);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const registerUserPage = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.USER.SIGN_UP_MANAGED_USER;
      const response = await registerUser(url, data).pipe(
        map((resp) => {
          createManagedUser.emit(_.get(resp, "result.userId"));
          return resp;
        })
      );
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getOrganizationDetailsPage = async () => {
    try {
      const url =
        "http://localhost:3000/api/" + URLSConfig.URLS.ADMIN.ORG_EXT_SEARCH;
      const data = {
        request: {
          filters: {
            id: organisationIds,
          },
        },
      };
      const response = await getOrganizationDetails(url, data); // Call the imported function
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleFilterChange = (field, value) => {
    // Handle filter change logic here
  };

  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal Content
      </Heading>
      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg" onClick={getUserData}>
        Get User Data
      </Button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Object.keys(data).map((key) => (
        <div key={key}>
          <p>
            {key}: {JSON.stringify(data[key])}
          </p>
        </div>
      ))}
    </Box>
  );
};

export default User;
