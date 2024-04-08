// Profile.js

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer"; 
import Header from "components/header"; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import data from "../../assets/learningHistory.json";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from '@mui/material/Card';
import Filter from "components/filter";


const LearningHistory = () => {
  const { t } = useTranslation();

  return (
    <div>
          <Header/>

          <Container maxWidth="xxl" role="main" className="container-pb">

      <Box textAlign="center" padding="10">
      <Breadcrumbs
              aria-label="breadcrumb"
              style={{
                padding: "25px 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Link underline="hover" color="#004367" href="/">
              {t("MY_PROFILE")} 
              </Link>
              <Link
                underline="hover"
                href=""
                aria-current="page"
                color="#484848"
              >
               {t("LEARNNG_HISTORY")} 
              </Link>
            </Breadcrumbs>
        <Card style={{padding:'20px',textAlign:'left'}}>
          <Box style={{display:'flex',alignItems:'end'}}>
              {/* <Filter></Filter> */}
            </Box>
            <Grid container spacing={2} style={{ textAlign: 'left', paddingTop: '10px' }} >

                {data.result && data.result.courses.map((faqIndex) => (
                    <Grid item xs={12} md={4} key={faqIndex}> 
                      <Card sx={{ marginTop: '10px', padding: '10px',borderRadius:'10px',border:'solid 1px #EFEFEF',boxShadow:'none',color:'#484848' }}>
                        <Typography className="twoLineEllipsis" variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '14px', paddingBottom: '15px',height:'42px',fontWeight:'600' }}>
                        {faqIndex.courseName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
                        {t("CERTIFICATE_GIVEN_BY")}: {faqIndex.batch.endDate}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
                        {t("CERTIFICATE_ISSUE_DATE")}: {faqIndex.completedOn}
                        </Typography>
                        <Box style={{ marginTop:'10px',display: 'flex', alignItems: 'end', color: faqIndex.status === 2 ? 'green' : faqIndex.status === 1 ? 'orange' : 'red', fontSize: '12px' }} >
                        {faqIndex.status === 2 ?  "Completed" : faqIndex.status === 1 ? "Ongoing" : "Batch Expired"}
                        </Box>
                      </Card>

                    </Grid>
                ))} 
        </Grid>
    </Card>
  </Box>
</Container>
<Footer/>
</div>

  );
};

export default LearningHistory;

