// Profile.js

import React, { useState, useEffect } from "react";


import BoxCard from "components/Card";
import Box from '@mui/material/Box';
import Search from "components/search";
import Filter from "components/filter"; 
import data from "../../assets/contentSerach.json"
import Grid from '@mui/material/Grid';
import Footer from "components/Footer"; 
import Header from "components/header"; 
import Container from '@mui/material/Container';



const ContentList = (props) => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);

  return (
   <div>
    <Header/>
      <Box sx={{background:'#2D2D2D',padding:'20px'}}>
          <p style={{fontSize:'20px',fontWeight:'700',color:'#fff',paddingBottom:'5px',margin:'0'}}>Explore content related to your domain.Learn from well curated courses and content.</p>
          <p style={{fontSize:'16px',fontWeight:'700',color:'#C1C1C1',margin:'0',paddingBottom:'30px'}}>Learn from well curated courses and content.</p>
          <Search></Search>

        </Box>
        <Container maxWidth="xxl" role="main" className="container-pb">

        <Box style={{margin:'20px 0'}}>
          <Filter></Filter>
        </Box>

     <Box textAlign="center" padding="10">
     <Box sx={{paddingTop:'30px'}}>
     <Grid container spacing={2} style={{margin:'20px 0',marginBottom:'10px'}}>

        {data.result.content.map((items) => (
                        // console.log(items),

                <Grid item xs={12} md={6} lg={3}  style={{marginBottom:'10px'}}>
                <BoxCard items ={items}></BoxCard>

                </Grid>
        ))}
                    </Grid>

        </Box>
  
      </Box>
      </Container>
<Footer/>
</div>
  );
};

export default ContentList;
