// Profile.js

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer"; 
import Header from "components/header"; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import data from "../../assets/certificates.json";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from '@mui/material/Card';


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
               {t("CERTIFICATES")} 
              </Link>
            </Breadcrumbs>
        <Card style={{padding:'20px',textAlign:'left'}}>
          <Box style={{display:'flex',alignItems:'end'}}>
              <DescriptionOutlinedIcon/> {t("CERTIFICATES")}                    

            </Box>
            <Grid container spacing={2} style={{ textAlign: 'left', paddingTop: '10px' }} >

           {data.result && data.result.response.content && data.result.response.content.map((faqIndex) => (
      <Grid item xs={12} md={4} key={faqIndex._id}> 
        <Card sx={{ marginTop: '10px', padding: '10px',borderRadius:'10px',border:'solid 1px #EFEFEF',boxShadow:'none',color:'#484848' }}>
          <Typography className="twoLineEllipsis" variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '14px', paddingBottom: '15px',height:'42px',fontWeight:'600' }}>
          {faqIndex._source.data.badge.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
          {t("CERTIFICATE_GIVEN_BY")}: {faqIndex._source.data.badge.issuer.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
          {t("CERTIFICATE_ISSUE_DATE")}:  -{faqIndex._source.data.issuedOn}
          </Typography>
          <Box style={{ display: 'flex', alignItems: 'end', color: '#1976d2' }}>
            <SimCardDownloadOutlinedIcon />
            <Link href="{faqIndex._source.pdfUrl}" underline="none" style={{ fontSize: '12px', marginTop: '15px', display: 'block' }}>{t("CERTIFICATES")}  </Link>
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
