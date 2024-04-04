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
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import Link from "@mui/material/Link";
const AllContent = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
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
  // Group items by category
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.primaryCategory]) {
      acc[item.primaryCategory] = [];
    }
    acc[item.primaryCategory].push(item);
    return acc;
  }, {});
  const fetchMoreItems = async (category) => {
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
      console.log("moreData", response.data.result.content);
      setNewCategory(category);
      setData(response.data.result.content);
    } catch (error) {
      console.log("error---", error);

      setError(error.message);
    }
  };
  const handleViewAllClick = (category) => {
    setExpandedCategory(category);
    fetchMoreItems(category);
  };
  return (
    <>
      <Header />
      {Object.entries(groupedData).map(([category, items]) => (
        <React.Fragment key={category}>
          <p>{category || newCategory}</p>

          {items?.length > 10 && (
            <Link
              href="#"
              underline="none"
              onClick={() => handleViewAllClick(category)}
              style={{ color: "#424242", fontSize: "16px" }}
            >
              View All{" "}
            </Link>
          )}

          <Grid container spacing={2}>
            {expandedCategory === category
              ? expandedItems.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    style={{ marginBottom: "10px" }}
                  >
                    <BoxCard items={item}></BoxCard>
                  </Grid>
                ))
              : items.slice(0, 10).map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
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
};

export default AllContent;
