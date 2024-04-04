// Profile.js

import React, { useState, useEffect } from "react";
// import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Layout, IconByName, SearchLayout } from "@shiksha/common-lib";
import { VStack, HStack, Button, Menu } from "native-base";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Search from "components/search";
import Filter from "components/filter";
// import data from "../../assets/contentSerach.json";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import { getAllContents } from "services/contentService";
import Header from "components/header";

const AllContent = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  //   let [prevCategory, setPrevCategory] = useState(null);
  let prevCategory = null;
  // Logic to get content list
  useEffect(() => {
    fetchData();
  }, []);
  // State to keep track of the number of items rendered
  const [renderedItems, setRenderedItems] = useState(0);

  // Function to handle loading more items
  const handleLoadMore = () => {
    setRenderedItems(renderedItems + 10);
  };

  const fetchData = async () => {
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
        sort_by: { lastPublishedOn: "desc" },
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
    };

    const url = `http://localhost:3000/api/content/v1/search?orgdetails=orgName,email&licenseDetails=name,description,url`;
    try {
      const response = await getAllContents(url, data, headers);
      console.log("00000000", response.data.result.content);
      const sortedData = response?.data?.result?.content?.sort((a, b) => {
        if (a.primaryCategory < b.primaryCategory) {
          return 1;
        }
        if (a.primaryCategory > b.primaryCategory) {
          return -1;
        }
        return 0;
      });
      console.log("111111111111111111111111222222222222222222222", sortedData);
      setData(sortedData);
    } catch (error) {
      console.log("error---", error);

      setError(error.message);
    }
  };
  const fetchMoreItems = (category) => {
    setError(null);
    // Filters for API
    let data = JSON.stringify({
      request: {
        filters: {
          primaryCategory: [category],
          visibility: [],
        },
        limit: 100,
        sort_by: {
          lastPublishedOn: "desc",
        },
        fields: [
          "name",
          "appIcon",
          "medium",
          "subject",
          "resourceType",
          "contentType",
          "organisation",
          "topic",
          "mimeType",
          "trackable",
          "gradeLevel",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels",
        ],
        facets: ["channel", "gradeLevel", "subject", "medium"],
        offset: 0,
      },
    });

    // Headers
    const headers = {
      "Content-Type": "application/json",
    };

    const url = `http://localhost:3000/api/content/v1/search?orgdetails=orgName,email`;
    try {
      const response = await getAllContents(url, data, headers);
      console.log("00000000", response.data.result.content);

      setData(response.data.result.content);
    } catch (error) {
      console.log("error---", error);

      setError(error.message);
    }
  };

  return (
    <div>
    <Header/>
    <Box textAlign="center" padding="10">
      <Box sx={{ paddingTop: "30px" }}>
        <Grid container spacing={2} style={{ margin: "20px 0" }}>
          {data?.map((items) => {
            const currentCategory = items.primaryCategory;
            const printCategory = currentCategory !== prevCategory; // Check if current category is different from previous one
            prevCategory = currentCategory; // Update the previous category
            console.log(currentCategory, printCategory);
            // Group items by category
            const groupedData = data.reduce((acc, item) => {
              if (!acc[item.primaryCategory]) {
                acc[item.primaryCategory] = [];
              }
              acc[item.primaryCategory].push(item);
              return acc;
            }, {});

            return (
              <>
                {Object.entries(groupedData).map(([category, items]) => (
                  <React.Fragment key={category}>
                    <p>{category}</p>
                    {items.length > 10 && (
                      <Button
                        variant="outlined"
                        style={{ marginLeft: "870px" }}
                      >
                        View All
                      </Button>
                    )}
                    <Grid container spacing={2}>
                      {items.slice(0, 10).map((item) => (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          key={item.id} // Assuming items have a unique id
                          style={{ marginBottom: "10px" }}
                        >
                          <BoxCard items={item}></BoxCard>
                        </Grid>
                      ))}
                    </Grid>
                  </React.Fragment>
                ))}
              </>
            );
          })}
        </Grid>
      </Box>
    </Box>
    </Footer>
    </div>
  );
};

export default AllContent;
