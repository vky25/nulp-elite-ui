import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { contentService, userService } from "@shiksha/common-lib";
const Contents = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example of API Call
  useEffect(() => {}, []);

  // const getUserInfo = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   let data = JSON.stringify({});
  //   try {
  //     const headers = {
  //       "Content-Type": "application/json",
  //     };
  //     const url =
  //       "https://nulp.niua.org/learner/user/v5/read/5d757783-a86a-40cd-a814-1b6a16d37cb6?fields=organisations,roles,locations,declarations,externalIds";
  //     const response = await userService.getUserData(url, headers);
  //     console.log(data?.result?.response?.rootOrg?.rootOrgId);
  //     setData(data?.result?.response?.rootOrg?.rootOrgId);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // getUserInfo();

  const getUserData = async () => {
    setIsLoading(true);
    setError(null);
    let data = JSON.stringify({});
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `http://localhost:3000/learner/user/v3/update`;
      const response = await userService.getUserData(url, headers);
      console.log(data?.result?.response?.rootOrg?.rootOrgId);
      setData(data?.result?.response?.rootOrg?.rootOrgId);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  getUserData();

  // Function to get cookie value by name
  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
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
      <Button colorScheme="blue" size="lg">
        Explore Courses
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

export default Contents;
