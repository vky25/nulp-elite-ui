// Profile.js

import React, { useState, useEffect } from "react";
// import { Box, Heading, Text, Button } from '@chakra-ui/react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Search from "../../components/search";
import frameworkHardCodedData from "../../assets/framework.json"
import Header from "../../components/header";
import { frameworkService } from "@shiksha/common-lib";
import { generatePath, useNavigate ,useLocation} from "react-router-dom";
import Footer from "../../components/Footer";
import { contentService } from "@shiksha/common-lib";


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
  "@media (min-width:600px)": {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
  },
};

const DomainList = () => {
  // console.log(data.result.categories.terms.category);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [data, setData] = React.useState(true);
  const [channelData, setChannelData] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

   // Example of API Call   
   useEffect(() => {  
    fetchDataFramework();
   
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

  const fetchDataFramework = async () => {
    setIsLoading(true);
    setError(null);

    // Headers
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    const url = `http://localhost:3000/api/channel/v1/read/0130701891041689600`;
    try {
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---",error);
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
      console.log("nulp---",response.data.result);
      setData(response.data.result);
    } catch (error) {
      console.log("nulp--  error-",error);

      setError(error.message);
    } finally {
      console.log("nulp finally---",  );

      setIsLoading(false);
    }
  }

  const loadContents = async (term) => {
    console.log(term);
    navigate('/search/contentList', { state: { domain: term.code } }); 
  }
  return (
<div>
<Header/>

    <Box sx={{background:'#2D2D2D',padding:'20px'}}>
   <p style={{fontSize:'20px',fontWeight:'700',color:'#fff',paddingBottom:'5px',margin:'0'}}>Explore content related to your domain.Learn from well curated courses and content.</p>
   <p style={{fontSize:'16px',fontWeight:'700',color:'#C1C1C1',margin:'0',paddingBottom:'30px'}}>Learn from well curated courses and content.</p>
   <Search></Search>
 </Box>


<Container maxWidth="xxl" role="main" className="container-pb">
   <ThemeProvider theme={theme}>
   <Typography variant="h3" sx={{ marginTop: '30px' }}>Filter by popular domain</Typography>
   </ThemeProvider> 
   <Box sx={{paddingTop:'30px'}}>
            {data && data.framework && data.framework.categories && data.framework.categories.map((faqIndex) => (
            // {frameworkHardCodedData.result.framework.categories.map((faqIndex) => (
                <Grid container spacing={2} style={{margin:'20px 0',marginBottom:'10px'}}  key={faqIndex}>
                {faqIndex.terms.map(term => (
                    <Grid item xs={12} md={6} lg={3}  style={{marginBottom:'10px'}}>

                    <Box onClick={() => loadContents(term)} style={{display:'flex', flexDirection:'row', alignItems:'center'}} key={faqIndex.id}>
                    <Box style={{background:'#fff',padding:'10px',borderRadius:'10px',height:'48px',width:'48px',border:'solid 1px #E1E1E1'}}><img src={require("../../assets/swm.png")} style={{width:'100%'}} /></Box>
                    <h5 style={{fontSize:'14px',fontWeight:'500',paddingLeft:'10px',margin:'0'}}>{term.name}</h5>
                    </Box>
                    </Grid>
                ))}
                </Grid>
            ))}
            </Box>
</Container>
<Footer/>
</div>
  );
};

export default DomainList;