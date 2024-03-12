import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { contentService } from "@shiksha/common-lib";
import URLSConfig from "../configs/urlConfig.json";
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
        request: {
          filters: {
            status: ["Live"],
            contentType: [
              "Collection",
              "TextBook",
              "Course",
              "LessonPlan",
              "Resource",
              "SelfAssess",
              "PracticeResource",
              "LearningOutcomeDefinition",
              "ExplanationResource",
              "ExperientialResource",
              "eTextBook",
              "TVLesson",
            ],
          },
          offset: null,
          sort_by: {
            lastUpdatedOn: "desc",
          },
        },
      });

      // Headers
      const headers = {
        "Content-Type": "application/json",
      };

      const url = `http://localhost:3000/content/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email`;
      try {
        const response = await contentService.getAllContents(
          url,
          data,
          headers
        );
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

  const navigateToCourse = () => {};
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
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
      <Button colorScheme="blue" size="lg" onClick={navigateToCourse()}>
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
