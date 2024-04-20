import React from "react";
// import { post, get, update } from "../services/RestClient.ts";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "components/FloatingChatIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";


var data= {};
 fetch('https://nulpstorage1.blob.core.windows.net/public/portal-faq/resources/res/faq-en.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })

  .then(result => {
     data=  result;
     console.log(result,'ekta')
  })

const FAQPage = () => {
  const { t } = useTranslation();

  return (
    <div>
    <Header />

    <Container maxWidth="xxl" role="main" className="container-pb">
    <Grid container spacing={2}>
    <Grid item xs={12} lg={3}>
    <ul>
      {data.categories.map((items, index) => (

       
        <li> {items.name}</li>
      ))}
      </ul>
</Grid>
<Grid item xs={12} lg={9}>
{data.categories.map((itemsDetail, index) => (
   <Box     key={index}>
    {itemsDetail.faqs.map((itemsD,faqIndex) => (

    <Accordion
    key={faqIndex}

  style={{
    background: "#fee9dd",
    borderRadius: "10px",
    marginTop: "10px",
    maxHeight: "calc(100vh - 20px)", // Ensure Accordion has a height for scrolling
    overflow: "auto", // Enable scrolling
  }}
>
<div>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
    style={{
      background: "#fee9dd",
      borderRadius: "10px",
      position: "sticky",
      top: "0",
      zIndex: "1", // Ensure it's above other content
    }}
  >
          {itemsD.topic}

  </AccordionSummary>

  <AccordionDetails style={{ background: "#fff" }}>
 <div dangerouslySetInnerHTML={{ __html:itemsD.description}}/>

  </AccordionDetails>
  </div>

</Accordion>
            ))}

</Box>
        ))}
</Grid>
     
     
     

      
    
      </Grid>
    </Container>
    <FloatingChatIcon />
    <Footer />
    {/* <View>
      {data.categories.map((category, index) => (
        <View key={index}>
          <Box>
            <Heading fontSize="xl" p="4" pb="3">
              {category.name}
            </Heading>
          </Box>
          {category.faqs.map((faq, faqIndex) => (
            <View key={faqIndex}>
              <h6>{faq.topic}</h6>
              <div dangerouslySetInnerHTML={{ __html: faq.description }}></div>
             
            </View>
          ))}
        </View>
      ))}
    </View> */}
  </div>
   
  );
};

export default FAQPage;
