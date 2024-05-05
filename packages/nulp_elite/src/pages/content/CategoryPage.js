import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import URLSConfig from "../../configs/urlConfig.json";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

import domainWithImage from "../../assets/domainImgForm.json";
import DomainCarousel from "components/domainCarousel";
import * as frameworkService from "../../services/frameworkService";

import SearchBox from "components/search";
import { t } from "i18next";

const CategoryPage = () => {
  // const history = useHistory();
  const { category } = useParams();
  const [domain, setDomain] = useState();
  const [channelData, setChannelData] = React.useState(true);
  const [selectedDomain, setSelectedDomain] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { pageNumber } = useParams(1);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(location.search || 1);
  const [totalPages, setTotalPages] = useState(1);

  const [itemsArray, setItemsArray] = useState([]);

  const handleSearch = (query) => {
    // Implement your search logic here
    console.log("Search query:", query);
  };
  const handleDomainFilter = (query) => {
    // Implement your search logic here
    setSelectedDomain(query);
    console.log("Search query:", selectedDomain);
    fetchMoreItems(category);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };
  const fetchMoreItems = async (category) => {
    setError(null);
    // Filters for API
    let data = JSON.stringify({
      request: {
        filters: {
          primaryCategory: [category],
          visibility: [],
          se_boards: [selectedDomain],
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

    const url = `/api/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email`;
    try {
      const response = await getAllContents(url, data, headers);
      setData(response.data.result.content);
    } catch (error) {
      setError(error.message);
    }
  };
  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const fetchDomains = async () => {
    setError(null);
    // Headers
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    try {
      const url = `/api/channel/v1/read/0130701891041689600`;
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      setError(error.message);
    } finally {
    }
    try {
      const url = `/api/framework/v1/read/nulp?categories=board,gradeLevel,medium,class,subject`;
      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

      response.data.result.framework.categories[0].terms.map((term) => {
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.map((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"] = imgItem.image ? imgItem.image : "";
              pushData(term);
              itemsArray.push(term);
            }
          });
        }
      });
      console.log("kkkkk----", itemsArray);

      setDomain(response.data.result.framework.categories[0].terms);
    } catch (error) {
      console.log("nulp--  error-", error);
      setError(error.message);
    } finally {
      console.log("nulp finally---");
    }
  };
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
  useEffect(() => {
    fetchMoreItems(category);
    fetchDomains();
  }, [category]);

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      navigate("/joinCourse", { state: { contentId } });
    } else {
      navigate("/player");
    }
  };

  return (
    <>
      <Header />
      {domain && (
        <DomainCarousel onSelectDomain={handleDomainFilter} domains={domain} />
      )}
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
          {t("EXPLORE_CONTENT_RELATED_TO_YOUR_DOMAIN")}
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
          {t("LEARN_FROM_WELL_CURATED")}
        </p>
        <SearchBox onSearch={handleSearch} />
      </Box>
      <Container maxWidth="xxl" role="main" className="container-pb">
        {error && (
          <Alert className="my-4" severity="error">
            {error}
          </Alert>
        )}
        <Link
          onClick={handleGoBack}
          style={{
            display: "block",
            display: "flex",
            fontSize: "16px",
            paddingTop: "30px",
            color: "rgb(0, 67, 103)",
          }}
        >
          <ArrowBackOutlinedIcon /> {t("BACK")}
        </Link>

        <p
          style={{
            display: "inline-block",
            borderBottom: "solid 2px #000",
            fontSize: "14px",
            color: "#1E1E1E",
          }}
        >
          {category}
        </p>
        <Box textAlign="center">
          <Box>
            <Grid
              container
              spacing={2}
              style={{ margin: "20px 0", marginBottom: "10px" }}
            >
              {data &&
                data.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    key={item.id}
                    style={{ marginBottom: "10px" }}
                  >
                    <BoxCard
                      items={item}
                      index={item.count}
                      onClick={() =>
                        handleCardClick(item.identifier, item.contentType)
                      }
                    ></BoxCard>
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
