// Profile.js

import React, { useState, useEffect } from "react";
import URLSConfig from "../../configs/urlConfig.json";
import { Link, useParams,useNavigate,useLocation } from "react-router-dom";
import BoxCard from "components/Card";
import Box from '@mui/material/Box';
import Search from "components/search";
import Filter from "components/filter"; 
import contentData from "../../assets/contentSerach.json"
import RandomImage from "../../assets/cardRandomImgs.json"
import Grid from '@mui/material/Grid';
import Footer from "components/Footer"; 
import Header from "components/header"; 
import Container from '@mui/material/Container';
import { contentService } from "@shiksha/common-lib";
import queryString from 'query-string';
import Pagination from '@mui/material/Pagination';

const ContentList = (props) => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState( location.search || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { domain } = location.state || {};
  const [page, setPage] = React.useState(1);
  console.log("state----",location.state)
  // console.log("page----",page)
  // Example of API Call   
  useEffect(() => { 
     fetchData();
     const random = getRandomValue();
  }, [currentPage]);

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
          se_boards: [domain]
        },
        limit:20,
        offset: (20*(page-1)),
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

      // console.log("total pages------",Math.ceil(response.data.result.count / 20)+1);
      console.log("total pages------",Math.ceil(response.data.result.count / 20));
      setTotalPages(Math.ceil(response.data.result.count / 20)+1);

      setData(response.data.result);
    } catch (error) {
      console.log("error---",error);

      setError(error.message);
    } finally {
      console.log("finally---");
      setIsLoading(false);
    }
  };
 // Function to select a random value from an array
 const getRandomValue = (array) => {
  console.log("RandomImage   --  ",RandomImage.ImagePaths )
  const randomIndex= RandomImage;
  // const randomIndex = Math.floor(Math.random() * RandomImage..length);
  console.log("randomIndex",randomIndex)

  // return array[randomIndex];
  return randomIndex;
};

// Assuming 'data' is your JSON array
const randomItem = getRandomValue(data);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(page);
    fetchData();
  };


  return (
    <div>
      <Header/>
      <Box sx={{background:'#2D2D2D',padding:'20px'}}>
        <p style={{fontSize:'20px',fontWeight:'700',color:'#fff',paddingBottom:'5px',margin:'0'}}>Explore content related to your domain. Learn from well curated courses and content.</p>
        <p style={{fontSize:'16px',fontWeight:'700',color:'#C1C1C1',margin:'0',paddingBottom:'30px'}}>Learn from well curated courses and content.</p>
        <Search></Search>
      </Box>

      <Container maxWidth="xxl" role="main" className="container-pb">
        <Box style={{margin:'20px 0'}}>
          <Filter/>
        </Box>

        <Box textAlign="center" padding="10">
          <Box sx={{paddingTop:'30px'}}>
            <Grid container spacing={2} style={{margin:'20px 0', marginBottom:'10px'}}>
              
              {/* {contentData.result && contentData.result.content && contentData.result.content.map((items) => ( */}
               {data && data.content && data.content.map((items) => (
                <Grid item xs={12} md={6} lg={3}  style={{marginBottom:'10px'}}>
                  
                  <BoxCard items ={items} image = {getRandomValue()}></BoxCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        
        <Pagination count={totalPages} page={page} onChange={handleChange} />

      </Container>
     
      <Footer/>
    </div>
  );
};
export default ContentList;
