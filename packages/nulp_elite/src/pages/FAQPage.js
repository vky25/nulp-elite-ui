import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "components/header";
import Footer from "components/Footer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import Alert from '@mui/material/Alert';


const useStyles = makeStyles((theme) => ({
  active: {
    color: "blue", // Change color to blue
    textDecoration: "underline", // Add underline
  },
}));

const FAQPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [faqData, setFaqData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Login");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetch(
      "https://nulpstorage1.blob.core.windows.net/public/portal-faq/resources/res/faq-en.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setFaqData(result.categories);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="xxl" role="main" className="container-pb">
      {error &&  <Alert severity="error" className="my-10">{error}</Alert> }
      <Box sx={{ fontSize: "18px", color: "#484848",marginTop:'15px' }}>
              {t("FAQS")}
            </Box>
        <Grid container spacing={2}>
       
          <Grid item xs={12} lg={3}>
            <ul className="bg-white" style={{borderRadius:'5px'}}>
            <Box sx={{ fontSize: "18px", color: "#484848" }}>
              {t("SELECT_CATEGORY")}
            </Box>
              {faqData.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={
                    selectedCategory === category.name ? classes.active : ""
                  } // Apply active class
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} lg={9} >
            {faqData
              .filter((category) => category.name === selectedCategory)
              .map((selectedCategoryData, index) => (
                <div key={index}>
                  {selectedCategoryData.faqs.map((faq, faqIndex) => (
                    <Accordion
                      key={faqIndex}
                      style={{
                        background: "#fee9dd",
                        borderRadius: "10px",
                        marginTop: "10px",
                        maxHeight: "calc(100vh - 20px)",
                        overflow: "auto",
                      }}
                    >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                         
                          style={{
                            background: "#fee9dd",
                            borderRadius: "10px",
                            position: "sticky",
                            top: "0",
                            zIndex: "1",
                          }}
                        >
                          {faq.topic}
                        </AccordionSummary>
                        <AccordionDetails style={{ background: "#fff" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: faq.description,
                            }}
                            />
                        </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQPage;
