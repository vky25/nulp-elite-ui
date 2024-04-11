import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/search";
import getAllContents from "../services/contentService";

const Contents = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const url =
        "http://localhost:3000/api/content/v1/search?orgdetails=orgName,email&licenseDetails=name,description,url";
      const data = {
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
          query: query,
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
      };

      const response = await getAllContents(url, data);
      setSearchResults(response.data.result);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(searchResults, null, 2)}</pre>
    </div>
  );
};

export default Contents;
