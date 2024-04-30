// Profile.js

import React, { useState, useEffect } from "react";
// import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import domainWithImage from "../../assets/domainImgForm.json";
import SearchBox from "components/search";
import frameworkHardCodedData from "../../assets/framework.json";
import Header from "../../components/header";
import { frameworkService } from "@shiksha/common-lib";
import { generatePath, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import { contentService } from "@shiksha/common-lib";
import { object } from "yup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const theme = createTheme();

theme.typography.h3 = {
  fontSize: "0.938rem",
  background: "#fff",
  display: "block",
  "@media (min-width:600px)": {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
  },
};

const DomainList = () => {
  // console.log(data.result.categories.terms.category);
  // const [search, setSearch] = React.useState(true);
  // const [searchState, setSearchState] = React.useState(false);
  const [data, setData] = React.useState();
  const [channelData, setChannelData] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [category, setCategory] = React.useState();
  const [imgItem, setImgItem] = React.useState(object ? object : {});
  const [itemsArray, setItemsArray] = useState([]);
  // Example of API Call

  useEffect(() => {
    fetchDataFramework();
    // console.log("domainWithImage--",domainWithImage)
  }, []);

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

  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const fetchDataFramework = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
    try {
      const url = `http://localhost:3000/api/framework/v1/read/nulp?categories=board,gradeLevel,medium,class,subject`;
      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

      response.data.result.framework.categories[0].terms.map((term) => {
        setCategory(term);
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

      setData(itemsArray);
    } catch (error) {
      console.log("nulp--  error-", error);
      setError(error.message);
    } finally {
      console.log("nulp finally---");

      setIsLoading(false);
    }
  };

  const loadContents = async (term) => {
    // console.log(term);
    navigate("/contentList/1", { state: { domain: term.code } });
  };

  const handleSearch = async (domainquery) => {
    console.log(domainquery);
    navigate("/contentList/1", { state: { domainquery } });
  };
  // console.log(frameworkHardCodedData.result.framework.categories[0].terms);
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
        {/* <Box sx={{background:'#fff',padding:'20px 10px 30px 10px', margin:'25px 0'}}>
   <ThemeProvider theme={theme}>
   <Typography variant="h3" sx={{ margin: '10px 0 10px 0' }}>Filter by popular domain</Typography>
   <Box sx={{boxShadow:'0px 4px 4px 0px #00000040',padding:'10px 10px',background:'#F4FBFF'}}>
   {/* <DomainCarousel  domain={frameworkHardCodedData.result.framework.categories[0].terms}></DomainCarousel> 
   </Box>

   </ThemeProvider> 
   </Box> */}
        {/* <DomainCarousel data={data.framework.categories[0].terms}></DomainCarousel> */}

        <Box sx={{ paddingTop: "30px" }}>
          <Grid
            container
            spacing={2}
            style={{ margin: "20px 0", marginBottom: "10px" }}
          >
            {data &&
              data.map((term) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "10px" }}
                >
                  <Box
                    onClick={() => loadContents(term)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                        height: "48px",
                        width: "48px",
                        border: "solid 1px #E1E1E1",
                      }}
                    >
                      <img
                        src={require(`../../assets/domainImgs${term.image}`)}
                        style={{ width: "100%" }}
                      />
                    </Box>
                    <h5
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        paddingLeft: "10px",
                        margin: "0",
                      }}
                    >
                      {term.name}
                    </h5>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default DomainList;
