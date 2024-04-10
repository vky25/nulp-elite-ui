import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from '@mui/material/Link';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Grid from '@mui/material/Grid';
import data from "../../assets/courseHierarchy.json";


const JoinCourse = () => {
  const { t } = useTranslation();
  // console.log(data.result.content.batches[0].endDate,"ekta")
  return (
    <div>
      <Header />

      <Container maxWidth="xxl" role="main" className="container-pb">
      <Grid container spacing={2}>
          <Grid item xs={8}>
              <Breadcrumbs
                  aria-label="breadcrumb"
                  style={{
                    padding: "25px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <Link underline="hover" color="#004367" href="/">
                  {t("COURSES")} 
                  </Link>
                  <Link
                    underline="hover"
                    href=""
                    aria-current="page"
                    color="#484848"
                  >
                  {data.result.content.name}
                  </Link>
                </Breadcrumbs>
          </Grid>
          <Grid item xs={4}>
          <Link href="#" style={{textAlign:'right',marginTop:'20px',display:'block'}}><ShareOutlinedIcon/></Link>
          </Grid>
          
        </Grid>
    
            <Box>
            <Typography
                    variant="h7"
                    style={{
                      margin: "0 0 9px 0",
                      display: "block",
                      fontSize:'11px'
                    }}
                  >
        {t("RELEVANT_FOR")}:
        <Button size="small" style={{background: '#ffefc2',color:'#484848',fontSize:'10px',margin:'0 10px'}}>{data.result.content.se_gradeLevelIds}</Button>
       
        <Button size="small" style={{background: '#ffefc2',color:'#484848',fontSize:'10px'}}> {data.result.content.se_mediums}</Button>
          </Typography>
            </Box>
            <Box style={{background:'#fee9dd',padding:'10px',borderRadius:'10px',color:'#484848'}}>
            <Typography
                    variant="h7"
                    style={{
                      margin: "0 0 9px 0",
                      display: "block",
                      fontSize:'16px'
                    }}
                  >
        {t("BATCH_DETAILS")}:
                  </Typography>
                  <Box style={{background:'#fff',padding:'10px',borderRadius:'10px'}}>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("BATCH_START_DATE")}:  {data.result.content.batches[0].startDate}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("BATCH_END_DATE")}:   {data.result.content.batches[0].endDate}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("LAST_DATE_FOR_ENROLLMENT")}:  {data.result.content.batches[0].enrollmentEndDate}
                  </Typography>
                  </Box>
            </Box>
            <Box pt={2} style={{textAlign:'center'}}>
          <Button
            style={{
              background: "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 71px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {t("JOIN_COURSE")}
          </Button>
        </Box>
        <Box>
        <Typography
                    variant="h7"
                    style={{
                      fontWeight: "700",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("DESCRIPTION")}:
                  </Typography>
                  <Typography
                    variant="h7"
                    className="twoLineEllipsis"
                    style={{
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'

                    }}
                  >
                    {data.result.content.description}
                  </Typography>
        </Box>
        
      <Accordion defaultExpanded style={{background:'#fee9dd',borderRadius:'10px',marginTop:'10px'}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         {t("COURSES_MODULE")}
        </AccordionSummary>
        <AccordionDetails>
        {data.result&&data.result.content && data.result.content.children.map((faqIndex) => (
            <Accordion key={faqIndex.id} style={{borderRadius:'10px',margin:'10px 0'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${faqIndex.id}-content`}
                    id={`panel${faqIndex.id}-header`}
                  >
                    {faqIndex.name}</AccordionSummary>
                        {faqIndex.children.map((faqIndexname) => (
                            <AccordionDetails>
                                   <Link href="#" key={faqIndexname.id}>{faqIndexname.name}</Link>
                            </AccordionDetails>
                    ))} 

              </Accordion>
          ))} 

        </AccordionDetails>
      </Accordion>
      <Accordion  style={{background:'#fee9dd',borderRadius:'10px',marginTop:'10px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {t("CERTIFICATION_CRITERIA")}
        </AccordionSummary>
        <AccordionDetails  style={{background:'#fff'}}>
          <ul>
            <li>The completion certificate will be issued upon 100% completion</li>
<li>The certificate will be issued if you score greater than or equal to 60% in your assessment</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion  style={{background:'#fee9dd',borderRadius:'10px',marginTop:'10px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {t("OTHER_DETAILS")}
        </AccordionSummary>
        <AccordionDetails  style={{background:'#fff'}}>
        <Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("CREATED_ON")}:  {data.result.content.children[0].createdOn}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("UPDATED_ON")}:  {data.result.content.children[0].lastUpdatedOn}
                  </Typography><Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("CREDITS")}: 
                  </Typography><Typography
                    variant="h7"
                    style={{
                      fontWeight: "500",
                      margin: "9px 0",
                      display: "block",
                      fontSize:'14px'
                    }}
                  >
        {t("LICENSE_TERMS")}:  {data.result.content.licenseDetails.name}
        {t("FOR_DETAILS")}: {data.result.content.licenseDetails.url}
                  </Typography>
             
        </AccordionDetails>
      </Accordion>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default JoinCourse;

