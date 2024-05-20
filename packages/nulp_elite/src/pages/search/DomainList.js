
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
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
import * as frameworkService from ".././../services/frameworkService";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { object } from "yup";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import BoxCard from "../../components/Card";
import NoResult from "pages/content/noResultFound";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import Carousel from "react-multi-carousel";

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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DomainList = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [recentlyAddedCourses, setRecentlyAddedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imgItem, setImgItem] = useState(object ? object : {});
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [category, setCategory] = React.useState();

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    fetchDataFramework();
    getRecentlyAddedCourses();
    getPopularCourses();
  }, []);

  const pushData = (term) => {
    setData((prevData) => [...prevData, term]);
  };

  const fetchDataFramework = async () => {
    setIsLoading(true);
    setError(null);
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url);
      // setChannelData(response.data.result);

      const frameworkUrl = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}?categories=${urlConfig.params.framework}`;
      const frameworkResponse = await frameworkService.getSelectedFrameworkCategories(frameworkUrl);

      frameworkResponse.data.result.framework.categories[0].terms.forEach((term) => {
        setCategory(term);
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.forEach((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"] = imgItem.image ? imgItem.image : "";
              pushData(term);
            }
          });
        }
      });
    } catch (error) {
      console.log("error---", error);
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecentlyAddedCourses = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
        "request": {
            "filters": {
                "se_boards": [
                    null
                ],
                "primaryCategory": [
                    "Collection",
                    "Resource",
                    "Content Playlist",
                    "Course",
                    "Course Assessment",
                    "Digital Textbook",
                    "eTextbook",
                    "Explanation Content",
                    "Learning Resource",
                    "Lesson Plan Unit",
                    "Practice Question Set",
                    "Teacher Resource",
                    "Textbook Unit",
                    "LessonPlan",
                    "FocusSpot",
                    "Learning Outcome Definition",
                    "Curiosity Questions",
                    "MarkingSchemeRubric",
                    "ExplanationResource",
                    "ExperientialResource",
                    "Practice Resource",
                    "TVLesson",
                    "Course Unit",
                    "Exam Question"
                ],
                "visibility": [
                    "Default",
                    "Parent"
                ]
            },
            "limit": 100,
            "sort_by": {
                "lastPublishedOn": "desc"
            },
            "fields": [
                "name",
                "appIcon",
                "mimeType",
                "gradeLevel",
                "identifier",
                "medium",
                "pkgVersion",
                "board",
                "subject",
                "resourceType",
                "primaryCategory",
                "contentType",
                "channel",
                "organisation",
                "trackable",
                "primaryCategory"
            ],
            "facets": [
                "se_boards",
                "se_gradeLevels",
                "se_subjects",
                "se_mediums",
                "primaryCategory"
            ],
            "offset": 0
        }
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: req
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      console.log('data', responseData);
      setRecentlyAddedCourses(responseData?.result?.content || []);
    } catch (error) {
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadContents = (term) => {
    navigate("/contentList/1", { state: { domain: term.code } });
  };

  const handleSearch = (domainquery) => {
    navigate("/contentList/1", { state: { domainquery } });
  };

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      navigate("/joinCourse", { state: { contentId } });
    } else {
      navigate("/player");
    }
  };

  const getPopularCourses = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
      "request": {
          "filters": {
              "se_boards": [
                  null
              ],
              "primaryCategory": [
                  "Collection",
                  "Resource",
                  "Content Playlist",
                  "Course",
                  "Course Assessment",
                  "Digital Textbook",
                  "eTextbook",
                  "Explanation Content",
                  "Learning Resource",
                  "Lesson Plan Unit",
                  "Practice Question Set",
                  "Teacher Resource",
                  "Textbook Unit",
                  "LessonPlan",
                  "FocusSpot",
                  "Learning Outcome Definition",
                  "Curiosity Questions",
                  "MarkingSchemeRubric",
                  "ExplanationResource",
                  "ExperientialResource",
                  "Practice Resource",
                  "TVLesson",
                  "Course Unit",
                  "Exam Question"
              ],
              "visibility": [
                  "Default",
                  "Parent"
              ]
          },
          "limit": 100,
          "sort_by": {
              "lastPublishedOn": "desc"
          },
          "fields": [
              "name",
              "appIcon",
              "mimeType",
              "gradeLevel",
              "identifier",
              "medium",
              "pkgVersion",
              "board",
              "subject",
              "resourceType",
              "primaryCategory",
              "contentType",
              "channel",
              "organisation",
              "trackable",
              "primaryCategory"
          ],
          "facets": [
              "se_boards",
              "se_gradeLevels",
              "se_subjects",
              "se_mediums",
              "primaryCategory"
          ],
          "offset": 0
      }
  };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: req
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      console.log('data', responseData);
      setPopularCourses(responseData?.result?.content || []);
    } catch (error) {
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Box sx={{ paddingTop: "30px" }}>
          <Grid
            container
            spacing={2}
            style={{ margin: "20px 0", marginBottom: "10px" }}
          >
            {data &&
              data.slice(0, 10).map((term) => (
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


        <Container maxWidth="xxl" role="main" className="container-pb">
        {error && <Alert severity="error">{error}</Alert>}
      
        <Box textAlign="center" padding="10">
        <p style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  style={{
                    display: "inline-block",
                    fontSize: "18px",
                    color: "#484848",
                  }}
                >
                  <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
                  <Box
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {'Popular Courses'}{" "}
                  </Box>{" "}
                </Box>
               
              </p>
              {isMobile ? (<Box sx={{ paddingTop: "30px" }}>
      {isLoading ? (
        <p>{t("LOADING")}</p>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : popularCourses.length > 0 ? (
        <div>
          <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
            {popularCourses.slice(0, 8).map((items, index) => (
              <Grid
                item
                xs={12}
                sm={isMobile ? 6 : 12} // Show 2 courses per line on mobile view
                md={6}
                lg={3}
                key={items.identifier}
                style={{ marginBottom: "10px" }}
              >
                <BoxCard items={items} onClick={() => handleCardClick(items.identifier, items.contentType)} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <NoResult />
      )}
    </Box>) : (  <Box sx={{ paddingTop: "30px" }}>
            {isLoading ? (
              <p>{t("LOADING")}</p>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : popularCourses.length > 0 ? (
              <div>
                <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
                  {popularCourses.slice(0, 8).map((items) => (
                    <Grid item xs={6} md={6} lg={3} key={items.identifier} style={{ marginBottom: "10px" }}>
                      <BoxCard items={items} onClick={() => handleCardClick(items.identifier, items.contentType)} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <NoResult />
            )}
          </Box>)}
        
        </Box>
      </Container>

<Container maxWidth="xxl" role="main" className="container-pb">
                    {error && <Alert severity="error">{error}</Alert>}

                    <Box textAlign="center" padding="10">
                      <p style={{ display: "flex", justifyContent: "space-between" }}>
                        <Box
                          style={{
                            display: "inline-block",
                            fontSize: "18px",
                            color: "#484848",
                          }}
                        >
                          <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
                          <Box
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {"Recently Added"}{" "}
                          </Box>{" "}
                        </Box>
                      </p>
                      {isMobile ? (<Box sx={{ paddingTop: "30px" }}>
      {isLoading ? (
        <p>{t("LOADING")}</p>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : recentlyAddedCourses.length > 0 ? (
        <div>
          <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
            {recentlyAddedCourses.slice(0, 8).map((items, index) => (
              <Grid
                item
                xs={12}
                sm={isMobile ? 6 : 12} // Show 2 courses per line on mobile view
                md={6}
                lg={3}
                key={items.identifier}
                style={{ marginBottom: "10px" }}
              >
                <BoxCard items={items} onClick={() => handleCardClick(items.identifier, items.contentType)} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <NoResult />
      )}
    </Box>) : ( <Box sx={{ paddingTop: "30px" }}>
                        {isLoading ? (
                          <p>{t("LOADING")}</p>
                        ) : error ? (
                          <Alert severity="error">{error}</Alert>
                        ) : recentlyAddedCourses.length > 0 ? (
                          <div>
                            <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
                              {recentlyAddedCourses.slice(0, 8).map((items) => (
                                <Grid item xs={6} md={6} lg={3} key={items.identifier} style={{ marginBottom: "10px" }}>
                                  <BoxCard
                                    items={items}
                                    onClick={() => handleCardClick(items.identifier, items.contentType)}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </div>
                        ) : (
                          <NoResult />
                        )}
                      </Box>)}
                     
                    </Box>
                  </Container>

    
     
      <Footer />
    </div>
  );
};

export default DomainList;
