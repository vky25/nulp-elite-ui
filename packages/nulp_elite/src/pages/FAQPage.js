import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "components/header";
import Footer from "components/Footer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage = () => {
  const { t } = useTranslation();
  const [faqData, setFaqData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Login");

  useEffect(() => {
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
      });
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="xxl" role="main" className="container-pb">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <ul>
              {faqData.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} lg={9}>
            {faqData
              .filter((category) => category.name === selectedCategory)
              .map((selectedCategoryData, index) => (
                <Box key={index}>
                  {selectedCategoryData.faqs.map((faq, faqIndex) => (
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
                          {faq.topic}
                        </AccordionSummary>

                        <AccordionDetails style={{ background: "#fff" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: faq.description,
                            }}
                          />
                        </AccordionDetails>
                      </div>
                    </Accordion>
                  ))}
                </Box>
              ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQPage;
