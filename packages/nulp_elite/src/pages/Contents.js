import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { contentService } from "@shiksha/common-lib";
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
            primaryCategory: [
              "Collection",
              "Resource",
              "Content Playlist",
              "Course",
              "Course Assessment",
              "Digital Textbook",
              "eTextbook",
              "Explanation Content",
              "Learning Resource",
              "Lesson Plan Unit",
              "Practice Question Set",
              "Teacher Resource",
              "Textbook Unit",
              "LessonPlan",
              "FocusSpot",
              "Learning Outcome Definition",
              "Curiosity Questions",
              "MarkingSchemeRubric",
              "ExplanationResource",
              "ExperientialResource",
              "Practice Resource",
              "TVLesson",
              "Course Unit",
              "Exam Question",
            ],
            visibility: ["Default", "Parent"],
          },
          limit: 100,
          sort_by: {
            lastPublishedOn: "desc",
          },
          fields: [
            "name",
            "appIcon",
            "mimeType",
            "gradeLevel",
            "identifier",
            "medium",
            "pkgVersion",
            "board",
            "subject",
            "resourceType",
            "primaryCategory",
            "contentType",
            "channel",
            "organisation",
            "trackable",
          ],
          facets: [
            "se_boards",
            "se_gradeLevels",
            "se_subjects",
            "se_mediums",
            "primaryCategory",
          ],
          offset: 0,
        },
      });

      // Headers
      const headers = {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
      };
      const url = `https://nulp.niua.org/api/content/v1/search?orgdetails=orgName,email&licenseDetails=name,description,url`;
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
