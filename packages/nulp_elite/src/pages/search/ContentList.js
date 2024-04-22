import React, { useState, useEffect } from "react";
import URLSConfig from "../../configs/urlConfig.json";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Search from "components/search";
import SearchBox from "components/search";
import Filter from "components/filter";
import contentData from "../../assets/contentSerach.json";
import RandomImage from "../../assets/cardRandomImgs.json";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import { contentService } from "@shiksha/common-lib";
import queryString from "query-string";
import Pagination from "@mui/material/Pagination";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import NoResult from "pages/content/noResultFound";

const ContentList = (props) => {
  const [search, setSearch] = useState(true);
  const location = useLocation();
  const [ pageNumber, setPageNumber ] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);
  const navigate = useNavigate();
  const { domain } = location.state || {};
  const { domainquery } = location.state || {};

  useEffect(() => {
    fetchData();
    fetchGradeLevels();
    const random = getRandomValue();
  }, [ filters, search]);

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilters({ ...filters, se_gradeleverl: selectedValues });
  };

  const handleSearch = (query) => {
    setSearch({ ...search, query });
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
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
          se_boards: [domain],
          se_gradeLevels: filters.se_gradeleverl,
        },
        limit: 20,
        query: search.query || domainquery,
        offset: 20 * (pageNumber - 1),
        sort_by: {
          lastUpdatedOn: "desc",
        },
      },
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    const url = `http://localhost:3000/content/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email`;
    try {
      const response = await contentService.getAllContents(url, req, headers);

        if(response.data.result.content && response.data.result.count<=20){
          setTotalPages(1);
        }else if(response.data.result.count>20){
          setTotalPages(Math.floor(response.data.result.count / 20) + 1);
        }
      
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomValue = (array) => {
    const randomIndex = RandomImage;
    return randomIndex;
  };

  const handleChange = (event, value) => {
    setPageNumber(value)
    setData({})  
    navigate("/contentList/" + value, { state: { domain: domain } }); 
    fetchData();
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };
  const fetchGradeLevels = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/framework/v1/read/nulp?categories=gradeLevel"
      );
      const data = await response.json();
      if (
        data.result &&
        data.result.framework &&
        data.result.framework.categories
      ) {
        const gradeLevelCategory = data.result.framework.categories.find(
          (category) => category.identifier === "nulp_gradelevel"
        );
        if (gradeLevelCategory && gradeLevelCategory.terms) {
          const gradeLevelsOptions = gradeLevelCategory.terms.map((term) => ({
            value: term.code,
            label: term.name,
          }));
          setGradeLevels(gradeLevelsOptions);
        }
      }
    } catch (error) {
      console.error("Error fetching grade levels:", error);
    }
  };

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      navigate("/joinCourse", { state: { contentId } });
    } else {
      navigate("/player");
    }
  };

  return (
    <div>
      <Header />
      <Box sx={{ background: "#2D2D2D", padding: "20px" }}>
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

      <Container maxWidth="xxl" role="main" className="container-pb">
        <Box style={{ margin: "20px 0" }}>
          <domainCarousel></domainCarousel>
          <Filter
            options={gradeLevels}
            label="Filter by Grade Level"
            onChange={handleFilterChange}
          />
        </Box>
        <Link onClick={handleGoBack} style={{display:'block',display:'flex',fontSize:'14px',paddingTop:'30px',color:'rgb(0, 67, 103)'}}><ArrowBackOutlinedIcon style={{width:'0.65em',height:'0.65em'}}/> Back</Link>

  <Box sx={{fontSize:'14px',marginTop:'10px'}}></Box>You are viewing courses for :
  <Box  sx={{fontSize:'16px',fontWeight:'700'}}>{domain}</Box>
        <Box textAlign="center" padding="10">
          <Box sx={{ paddingTop: "30px" }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : data && data.content && data.content.length > 0 ? (
              <div>
              <Grid
                container
                spacing={2}
                style={{ margin: "20px 0", marginBottom: "10px" }}
              >
                {data.content.map((items, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    style={{ marginBottom: "10px" }}
                    key={items.identifier}
                  >
                    <BoxCard
                      items={items}
                      index={index}
                      onClick={() =>
                        handleCardClick(items.identifier, items.contentType)
                      }
                    ></BoxCard>
                  </Grid>
                ))}
              </Grid>
                <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={handleChange}
              />
              </div>
            ) : (
              <NoResult /> // Render NoResult component when there are no search results
            )}
          </Box>
        </Box>

      
      </Container>
      <Footer />
    </div>
  );
};

export default ContentList;
