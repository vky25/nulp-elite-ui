import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { contentService, userService } from "@shiksha/common-lib";
const Contents = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example of API Call
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      // Filters for API
      let data = JSON.stringify({
        // Request body data
      });

      // Headers
      try {
        const cookie =
          "_ga=GA1.1.1679344062.1706002901; _ga_QH3SHT9MTG=GS1.1.1706072634.2.1.1706072649.0.0.0; _ga_EJDFKF9L1X=GS1.1.1706072635.2.1.1706072649.0.0.0; _clck=awo761%7C2%7Cfjl%7C0%7C1457; connect.sid=s%3AfQtI-IxZKQuipm4MdaCGIjBdWuzW1cDp.bRJ64XvlWLUbiTyFB%2FoS%2F4IwQGMORMeZOd8fDQOvzg0";
        const headers = {
          Cookie: cookie,
          "Content-Type": "application/json", // Assuming JSON data is being sent
        };
        const url =
          "https://nulp.niua.org/learner/user/v5/read/5d757783-a86a-40cd-a814-1b6a16d37cb6?fields=organisations,roles,locations,declarations,externalIds";
        const response = await userService.getUserData(url, headers);
        console.log(response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
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
