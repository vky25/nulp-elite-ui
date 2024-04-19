import React, { useState, useEffect } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import URLSConfig from "../../configs/urlConfig.json";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Container from '@mui/material/Container';
import Pagination from "@mui/material/Pagination";
import domainWithImage from "../../assets/domainImgForm.json";
import DomainCarousel from "components/domainCarousel";
import { frameworkService } from "@shiksha/common-lib";

const CategoryPage = () => {
  // const history = useHistory();
  const { category } = useParams();
  const [domain, setDomain] = useState();
  const [channelData, setChannelData] = React.useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(location.search || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsArray, setItemsArray] = useState([]);

  // const goBack = () => {
  //   history.goBack();
  // };
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
      const url = `http://localhost:3000/api/channel/v1/read/0130701891041689600`;
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      setError(error.message);
    } finally {

    }
    try {
      const url = `http://localhost:3000/api/framework/v1/read/nulp?categories=board,gradeLevel,medium,class,subject`;
      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );
      setDomain(response.data.result.framework.categories[0].terms);
      response.data.result.framework.categories[0].terms.map((term) => {
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.map((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"]= imgItem.image ? imgItem.image : "";
              pushData(term);
              itemsArray.push(term);
            }
          });
        }
      });
      console.log("kkkkk----", itemsArray);

      setData(itemsArray);
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

  return (
    <>
      <Header />
      {domain &&  <DomainCarousel  domains={domain}/>}

      <Container maxWidth="xxl" role="main" className="container-pb">
      {/* <Link style={{display:'block',display:'flex',fontSize:'16px',paddingTop:'30px',color:'rgb(0, 67, 103)'}} onClick={ navigate(-1)}><ArrowBackOutlinedIcon/> Back</Link> */}
      <Link style={{display:'block',display:'flex',fontSize:'16px',paddingTop:'30px',color:'rgb(0, 67, 103)'}} ><ArrowBackOutlinedIcon/> Back</Link>

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
                <BoxCard items={item} index={item.count}></BoxCard>
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
