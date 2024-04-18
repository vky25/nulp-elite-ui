import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import BoxCard from "components/Card";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import { Link } from "react-router-dom";
import URLSConfig from "../../configs/urlConfig.json";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Box from "@mui/material/Box";
import data from "../../assets/contentSerach.json";
import SearchBox from "components/search";

import Container from "@mui/material/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DomainCarousel from "components/domainCarousel";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AllContent = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };
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
    // console.log(data.result.content)

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
        xs={isMobile ? 12 : 12}
        md={isMobile ? 12 : 6}
        lg={isMobile ? 12 : 3}
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
      <Box sx={{ background: "#2D2D2D", padding: "20px" }} className="xs-hide">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
            paddingBottom: "5px",
            margin: "0",
          }}
        >
          Explore content related to your domain.Learn from well curated courses
          and content.
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#C1C1C1",
            margin: "0",
            paddingBottom: "30px",
          }}
        >
          Learn from well curated courses and content.
        </p>
        <SearchBox onSearch={handleSearch} />
      </Box>
      {/* <DomainCarousel  domain={data.result.content}/> */}
      <Container maxWidth="xxl" role="main" className="container-pb">
        {Object?.entries(
          data?.reduce((acc, item) => {
            if (!acc[item.primaryCategory]) {
              acc[item.primaryCategory] = [];
            }
            acc[item.primaryCategory].push(item);
            return acc;
          }, {})
        ).map(([category, items]) => (
          // console.log(data,"hi"),

          <React.Fragment key={category}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                style={{
                  display: "inline-block",
                  fontSize: "14px",
                  color: "#1E1E1E",
                }}
              >
                <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
                <Box style={{ borderBottom: "solid 2px #000" }}>
                  {category}{" "}
                </Box>{" "}
              </Box>
              {items?.length > 4 && (
                <Link
                  to={`/view-all/${category}`}
                  style={{
                    color: "#424242",
                    fontSize: "12px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  View All
                </Link>
              )}
            </p>
            {isMobile ? (
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {expandedCategory === category
                  ? items.map((item) => (
                      <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <BoxCard items={item}></BoxCard>
                      </Grid>
                    ))
                  : items.slice(0, 4).map((item) => (
                      <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <BoxCard items={item}></BoxCard>
                      </Grid>
                    ))}
              </Carousel>
            ) : (
              <Grid container spacing={2}>
                {expandedCategory === category
                  ? renderItems(items, category)
                  : renderItems(items.slice(0, 4), category)}
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Container>
      <FloatingChatIcon />
      <Footer />
    </>
  );
};

export default AllContent;
