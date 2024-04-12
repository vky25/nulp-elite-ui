import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import BoxCard from "components/Card";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import { Link } from "react-router-dom";
import URLSConfig from "../../configs/urlConfig.json";
import Box from "@mui/material/Box";
// import hardcodedData from "../../assets/contentSerach.json";
import SearchBox from "components/search";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import Container from '@mui/material/Container';


const AllContent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const handleSearch = (query) => {
    // Implement your search logic here
    console.log("Search query:", query);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError(null);
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

    const headers = {
      "Content-Type": "application/json",
    };

    const url = `http://localhost:3000/api/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email&licenseDetails=name,description,url`;
    try {
      const response = await getAllContents(url, data, headers);
      const sortedData = response?.data?.result?.content?.sort((a, b) => {
        if (a.primaryCategory < b.primaryCategory) {
          return 1;
        }
        if (a.primaryCategory > b.primaryCategory) {
          return -1;
        }
        return 0;
      });
      setData(sortedData);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderItems = (items, category) => {
    return items.map((item) => (
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        key={item.id}
        style={{ marginBottom: "10px" }}
      >
        <BoxCard items={item}></BoxCard>
      </Grid>
    ));
  };

  return (
    <>
      <Header />
      <Box sx={{background:'#2D2D2D',padding:'20px'}}>
   <p style={{fontSize:'20px',fontWeight:'700',color:'#fff',paddingBottom:'5px',margin:'0'}}>Explore content related to your domain.Learn from well curated courses and content.</p>
   <p style={{fontSize:'16px',fontWeight:'700',color:'#C1C1C1',margin:'0',paddingBottom:'30px'}}>Learn from well curated courses and content.</p>
   <SearchBox onSearch={handleSearch} />

 </Box>
 <Container maxWidth="xxl" role="main" className="container-pb">
  <Link style={{display:'block',display:'flex',fontSize:'16px',paddingTop:'30px',color:'rgb(0, 67, 103)'}}><ArrowBackOutlinedIcon/> Back</Link>
      {Object?.entries(
        data?.reduce((acc, item) => {
          if (!acc[item.primaryCategory]) {
            acc[item.primaryCategory] = [];
          }
          acc[item.primaryCategory].push(item);
          return acc;
        }, {})
      ).map(([category, items]) => (
        <React.Fragment key={category}>
          <p>
            {category}{" "}
            {items?.length > 4 && (
              <Link
                to={`/view-all/${category}`}
                style={{ color: "#424242", fontSize: "16px" }}
              >
                View All
              </Link>
            )}
          </p>
          <Grid container spacing={2}>
            {expandedCategory === category
              ? renderItems(items, category)
              : renderItems(items.slice(0, 4), category)}
          </Grid>
        </React.Fragment>
      ))}
      </Container>

      <Footer />
    </>
  );
};

export default AllContent;
