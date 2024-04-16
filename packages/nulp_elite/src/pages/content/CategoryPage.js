import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import URLSConfig from "../../configs/urlConfig.json";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Pagination from "@mui/material/Pagination";


const CategoryPage = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { pageNumber } = useParams();

  const [currentPage, setCurrentPage] = useState(location.search || 1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMoreItems = async (category) => {
    setError(null);
    // Filters for API
    let data = JSON.stringify({
      request: {
        filters: {
          primaryCategory: [category],
          visibility: [],
        },
        limit: 20,
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

    const url = `http://localhost:3000/api/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email`;
    try {
      const response = await getAllContents(url, data, headers);
      setData(response.data.result.content);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMoreItems(category);
  }, [category]);

  return (
    <>
      <Header />
      <Container maxWidth="xxl" role="main" className="container-pb">
      <Link style={{display:'block',display:'flex',fontSize:'16px',paddingTop:'30px',color:'rgb(0, 67, 103)'}}><ArrowBackOutlinedIcon/> Back</Link>

      <p style={{display:'block',borderBottom:'solid 2px #000',fontSize:'14px',color:'#1E1E1E'}}>{category}</p>
      <Box textAlign="center">
        <Box>
          <Grid
            container
            spacing={2}
            style={{ margin: "20px 0", marginBottom: "10px" }}
          >
            {data.map((item) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                key={item.id}
                style={{ marginBottom: "10px" }}
              >
                <BoxCard items={item}></BoxCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      </Container>
      {/* <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handleChange}
        /> */}
      <Footer />
    </>
  );
};

export default CategoryPage;
