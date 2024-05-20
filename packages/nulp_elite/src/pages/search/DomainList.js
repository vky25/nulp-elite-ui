// // Profile.js

// import React, { useState, useEffect } from "react";
// // import { Box, Heading, Text, Button } from '@chakra-ui/react';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useTranslation } from "react-i18next";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import domainWithImage from "../../assets/domainImgForm.json";
// import SearchBox from "components/search";
// import frameworkHardCodedData from "../../assets/framework.json";
// import Header from "../../components/header";
// import * as frameworkService from ".././../services/frameworkService";
// import { generatePath, useNavigate, useLocation } from "react-router-dom";
// import Footer from "../../components/Footer";
// import { object } from "yup";
// import Alert from "@mui/material/Alert";
// // import { useTranslation } from "react-i18next";
// import appConfig from "../../configs/appConfig.json";
// const urlConfig = require("../../configs/urlConfig.json");
// import ToasterCommon from "../ToasterCommon";
// import BoxCard from "../../components/Card";
// import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
// import { Link } from "react-router-dom";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import NoResult from "pages/content/noResultFound";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
// const theme = createTheme();

// theme.typography.h3 = {
//   fontSize: "0.938rem",
//   background: "#fff",
//   display: "block",
//   "@media (min-width:600px)": {
//     fontSize: "1.1rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "1.125rem",
//   },
// };

// const DomainList = () => {
//   const { t } = useTranslation();
//   // console.log(data.result.categories.terms.category);
//   // const [search, setSearch] = React.useState(true);
//   // const [searchState, setSearchState] = React.useState(false);
//   const [data, setData] = useState();
//   const [recentlyAddedCourse, setRecentlyAddedCourse] = React.useState();
//   const [channelData, setChannelData] = React.useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [category, setCategory] = React.useState();
//   const [imgItem, setImgItem] = React.useState(object ? object : {});
//   const [itemsArray, setItemsArray] = useState([]);
//   const [toasterOpen, setToasterOpen] = useState(false);
//   const [toasterMessage, setToasterMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   const showErrorMessage = (msg) => {
//     setToasterMessage(msg);
//     setTimeout(() => {
//       setToasterMessage("");
//     }, 2000);
//     setToasterOpen(true);
//   };

//   useEffect(() => {
//     fetchDataFramework();
//     getRecentlyAddedCourses();
//     // console.log("domainWithImage--",domainWithImage)
//   }, []);

//   // Function to push data to the array
//   const pushData = (term) => {
//     setItemsArray((prevData) => [...prevData, term]);
//   };

//   const fetchDataFramework = async () => {
//     setIsLoading(true);
//     setError(null);
//     const rootOrgId = sessionStorage.getItem("rootOrgId");
//     const defaultFramework = localStorage.getItem("defaultFramework");

//     try {
//       const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;

//       const response = await frameworkService.getChannel(url);
//       // console.log("channel---",response.data.result);
//       setChannelData(response.data.result);
//     } catch (error) {
//       console.log("error---", error);
//       showErrorMessage("Failed to fetch data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//     try {
//       const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/
//       ${defaultFramework}?categories=${urlConfig.params.framework}`;

//       const response = await frameworkService.getSelectedFrameworkCategories(
//         url
//       );

//       response.data.result.framework.categories[0].terms.map((term) => {
//         setCategory(term);
//         if (domainWithImage) {
//           domainWithImage.result.form.data.fields.map((imgItem) => {
//             if ((term && term.code) === (imgItem && imgItem.code)) {
//               term["image"] = imgItem.image ? imgItem.image : "";
//               pushData(term);
//               itemsArray.push(term);
//             }
//           });
//         }
//       });

//       setData(itemsArray);
//     } catch (error) {
//       console.log("nulp--  error-", error);
//       showErrorMessage("Failed to fetch data. Please try again.");
//     } finally {
//       console.log("nulp finally---");

//       setIsLoading(false);
//     }
//   };

//   const loadContents = async (term) => {
//     // console.log(term);
//     navigate("/contentList/1", { state: { domain: term.code } });
//   };

//   const handleSearch = async (domainquery) => {
//     console.log(domainquery);
//     navigate("/contentList/1", { state: { domainquery } });
//   };
//   // console.log(frameworkHardCodedData.result.framework.categories[0].terms);

//   const getRecentlyAddedCourses = async () => {
//     setIsLoading(true);
//     setError(null);

//     let requestData = {
//         "request": {
//             "filters": {
//                 "contentType": ["Course"],
//                 "primaryCategory": ["Course"],
//                 "batches.enrollmentType": "open",
//                 "batches.status": ["1"],
//                 "status": ["Live"]
//             },
//             "limit": 100,
//             "sort_by": {
//                 "lastPublishedOn": "desc"
//             },
//             "fields": [
//                 "name",
//                 "appIcon",
//                 "medium",
//                 "subject",
//                 "resourceType",
//                 "contentType",
//                 "organisation",
//                 "topic",
//                 "mimeType",
//                 "trackable",
//                 "gradeLevel",
//                 "se_boards",
//                 "se_subjects",
//                 "se_mediums",
//                 "se_gradeLevels"
//             ],
//             "mode": "soft",
//             "facets": [
//                 "channel",
//                 "gradeLevel",
//                 "subject",
//                 "medium"
//             ],
//             "offset": 0
//         }
//     };

//     let req = JSON.stringify(requestData);

//     const headers = {
//       "Content-Type": "application/json",
//     };

//     try {
//       const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}`;

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: req
//       });
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
      
//       const responseData = await response.json();
//       console.log('data', responseData);
//       if (Array.isArray(data.result)) {
//         setData(data.result);
//       } else {
//         throw new Error("Unexpected response structure");
//       }
//       setRecentlyAddedCourse(responseData?.result?.content[0]);
//     } catch (error) {
//       showErrorMessage("Failed to fetch data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const renderItems = (items, category) => {
    return items.map((item) => (
      <Grid
        item
        xs={isMobile ? 12 : 12}
        md={isMobile ? 12 : 6}
        lg={isMobile ? 12 : 3}
        key={item.id}
        style={{ marginBottom: "10px" }}
      >
        <BoxCard
          items={item}
          onClick={() => handleCardClick(item.identifier, item.primaryCategory)}
        ></BoxCard>
      </Grid>
    ));
  };

//   const handleCardClick = (contentId, courseType) => {
//     if (courseType === "Course") {
//       navigate("/joinCourse", { state: { contentId } });
//     } else {
//       navigate("/player");
//     }
//   };

//   return (
//     <div>
//       <Header />
//       {toasterMessage && <ToasterCommon response={toasterMessage} />}
//       {/* <Box sx={{ background: "#2D2D2D", padding: "20px" }}>
//         <p
//           style={{
//             fontSize: "20px",
//             fontWeight: "700",
//             color: "#fff",
//             paddingBottom: "5px",
//             margin: "0",
//           }}
//         >
//           {t("EXPLORE_CONTENT_RELATED_TO_YOUR_DOMAIN")}
//         </p>
//         <p
//           style={{
//             fontSize: "16px",
//             fontWeight: "700",
//             color: "#C1C1C1",
//             margin: "0",
//             paddingBottom: "30px",
//           }}
//         >
//           {t("LEARN_FROM_WELL_CURATED")}
//         </p>
//         <SearchBox onSearch={handleSearch} />
//       </Box>  */}

//       <Container maxWidth="xxl" role="main" className="container-pb">
//         {error && <Alert severity="error">{error}</Alert>}
//         {/* <Box sx={{background:'#fff',padding:'20px 10px 30px 10px', margin:'25px 0'}}>
//    <ThemeProvider theme={theme}>
//    <Typography variant="h3" sx={{ margin: '10px 0 10px 0' }}>Filter by popular domain</Typography>
//    <Box sx={{boxShadow:'0px 4px 4px 0px #00000040',padding:'10px 10px',background:'#F4FBFF'}}>
//    {/* <DomainCarousel  domain={frameworkHardCodedData.result.framework.categories[0].terms}></DomainCarousel> 
//    </Box>

//    </ThemeProvider> 
//    </Box> */}
//         {/* <DomainCarousel data={data.framework.categories[0].terms}></DomainCarousel> */}

//         <Box sx={{ paddingTop: "30px" }}>
//           <Grid
//             container
//             spacing={2}
//             style={{ margin: "20px 0", marginBottom: "10px" }}
//           >
//             {data &&
//               data.map((term) => (
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   lg={3}
//                   style={{ marginBottom: "10px" }}
//                 >
//                   <Box
//                     onClick={() => loadContents(term)}
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Box
//                       style={{
//                         background: "#fff",
//                         padding: "10px",
//                         borderRadius: "10px",
//                         height: "48px",
//                         width: "48px",
//                         border: "solid 1px #E1E1E1",
//                       }}
//                     >
//                       <img
//                         src={require(`../../assets/domainImgs${term.image}`)}
//                         style={{ width: "100%" }}
//                       />
//                     </Box>
//                     <h5
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "500",
//                         paddingLeft: "10px",
//                         margin: "0",
//                       }}
//                     >
//                       {term.name}
//                     </h5>
//                   </Box>
//                 </Grid>
//               ))}
//           </Grid>
//         </Box>
//       </Container>
//       {recentlyAddedCourse &&
//               recentlyAddedCourse?.map((term) => (
//       <Box textAlign="center" padding="10">
//           <Box sx={{ paddingTop: "30px" }}>
//             {isLoading ? (
//               <p>{t("LOADING")}</p>
//             ) : error ? (
//               <Alert severity="error">{error}</Alert>
//             ) : recentlyAddedCourse && recentlyAddedCourse?.content && recentlyAddedCourse?.content?.length > 0 ? (
//               <div>
//                 <Grid
//                   container
//                   spacing={2}
//                   style={{ margin: "20px 0", marginBottom: "10px" }}
//                 >
//                   {recentlyAddedCourse?.content?.map((items, index) => (
//                     <Grid
//                       item
//                       xs={12}
//                       md={6}
//                       lg={3}
//                       style={{ marginBottom: "10px" }}
//                       key={items.identifier}
//                     >
//                       <BoxCard
//                         items={items}
//                         index={index}
//                         onClick={() =>
//                           handleCardClick(items.identifier, items.contentType)
//                         }
//                       ></BoxCard>
//                     </Grid>
//                   ))}
//                 </Grid>
//                 {/* <Pagination
//                   count={totalPages}
//                   page={pageNumber}
//                   onChange={handleChange}
//                 /> */}
//               </div>
//             ) : (
//               <NoResult /> // Render NoResult component when there are no search results
//             )}
//           </Box>
//         </Box>
//         ))}
//       {/* <React.Fragment >
//               <p style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Box
//                   style={{
//                     display: "inline-block",
//                     fontSize: "18px",
//                     color: "#484848",
//                   }}
//                 >
//                   <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
//                   <Box
//                     style={{
//                       display: "inline-block",
//                     }}
//                   >
//                     {'category'}{" "}
//                   </Box>{" "}
//                 </Box>
//                 {items?.length > 4 && (
//                   <Link
//                     to={`/view-all/${'category'}`}
//                    className="viewAll"
//                   >
//                     {t("VIEW_ALL")}
//                   </Link>
//                 )}
//               </p>
             
//                 <Carousel
//                   swipeable={false}
//                   draggable={false}
//                   showDots={true}
//                   responsive={responsive}
//                   ssr={true}
//                   infinite={true}
//                   autoPlaySpeed={1000}
//                   keyBoardControl={true}
//                   customTransition="all .5"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   removeArrowOnDeviceType={["tablet", "mobile"]}
//                   dotListClass="custom-dot-list-style"
//                   itemClass="carousel-item-padding-40-px"
//                 >
//                   { items.slice(0, 4).map((item) => (
//                         <Grid item xs={12} md={6} lg={5} key={item.id}>
//                           <BoxCard
//                             items={item}
//                             onClick={() =>
//                               handleCardClick(
//                                 item.identifier,
//                                 item.primaryCategory
//                               )
//                             }
//                           ></BoxCard>
//                         </Grid>
//                       ))}
//                 </Carousel>
              
                
              
//             </React.Fragment> */}
//       <Footer />
//     </div>
//   );
// };

// export default DomainList;










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
          "contentType": ["Course"],
          "primaryCategory": ["Course"],
          "batches.enrollmentType": "open",
          "batches.status": ["1"],
          "status": ["Live"]
        },
        "limit": 100,
        "sort_by": {
          "lastPublishedOn": "desc"
        },
        "fields": [
          "name",
          "appIcon",
          "medium",
          "subject",
          "resourceType",
          "contentType",
          "organisation",
          "topic",
          "mimeType",
          "trackable",
          "gradeLevel",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels"
        ],
        "mode": "soft",
        "facets": [
          "channel",
          "gradeLevel",
          "subject",
          "medium"
        ],
        "offset": 0
      }
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}`;

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
          "contentType": ["Course"],
          "primaryCategory": ["Course"],
          "batches.enrollmentType": "open",
          "batches.status": ["1"],
          "status": ["Live"]
        },
        "limit": 100,
        "sort_by": {
          "lastPublishedOn": "desc"
        },
        "fields": [
          "name",
          "appIcon",
          "medium",
          "subject",
          "resourceType",
          "contentType",
          "organisation",
          "topic",
          "mimeType",
          "trackable",
          "gradeLevel",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels"
        ],
        "mode": "soft",
        "facets": [
          "channel",
          "gradeLevel",
          "subject",
          "medium"
        ],
        "offset": 0
      }
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}`;

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
                    {'Recently Added'}{" "}
                  </Box>{" "}
                </Box>
                {/* {recentlyAddedCourses?.length > 10 && (
                  <Link
                    to={`/domainList/${'category'}`}
                   className="viewAll"
                  >
                    {t("VIEW_ALL")}
                  </Link>
                )} */}
              </p>
              {isMobile ? (<Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {recentlyAddedCourses.slice(0, 10).map((item) => (
                        <Grid item xs={6} md={6} lg={3} key={item.id}>
                          <BoxCard
                            items={item}
                            onClick={() =>
                              handleCardClick(
                                item.identifier,
                                item.primaryCategory
                              )
                            }
                          ></BoxCard>
                        </Grid>
                      ))}
                </Carousel>) : (<Box sx={{ paddingTop: "30px" }}>
            {isLoading ? (
              <p>{t("LOADING")}</p>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : recentlyAddedCourses.length > 0 ? (
              <div>
                <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
                  {recentlyAddedCourses.slice(0, 8).map((items) => (
                    <Grid item xs={12} md={6} lg={3} key={items.identifier} style={{ marginBottom: "10px" }}>
                      <BoxCard items={items} onClick={() => handleCardClick(items.identifier, items.contentType)} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <NoResult />
            )}
          </Box>) }
          
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
                    {'Popular Courses'}{" "}
                  </Box>{" "}
                </Box>
                {/* {popularCourses?.length > 10 && (
                  <Link
                    to={`/domainList/${'category'}`}
                   className="viewAll"
                  >
                    {t("VIEW_ALL")}
                  </Link>
                )} */}
              </p>
          <Box sx={{ paddingTop: "30px" }}>
            {isLoading ? (
              <p>{t("LOADING")}</p>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : popularCourses.length > 0 ? (
              <div>
                <Grid container spacing={2} style={{ margin: "20px 0", marginBottom: "10px" }}>
                  {popularCourses.slice(0, 8).map((items) => (
                    <Grid item xs={12} md={6} lg={3} key={items.identifier} style={{ marginBottom: "10px" }}>
                      <BoxCard items={items} onClick={() => handleCardClick(items.identifier, items.contentType)} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <NoResult />
            )}
          </Box>
        </Box>
      </Container>

    

    
      {/* <Box textAlign="center" padding="10">
          <Box sx={{ paddingTop: "30px" }}>
            {isLoading ? (
              <p>{t("LOADING")}</p>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : data && data.content && data.content.length > 0 ? (
              <div>
                <Grid
                  container
                  spacing={2}
                  style={{ margin: "20px 0", marginBottom: "10px" }}
                >
                  {data.content.map((items, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      style={{ marginBottom: "10px" }}
                      key={items.identifier}
                    >
                      <BoxCard
                        items={items}
                        index={index}
                        onClick={() =>
                          handleCardClick(items.identifier, items.contentType)
                        }
                      ></BoxCard>
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  count={totalPages}
                  page={pageNumber}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <NoResult /> // Render NoResult component when there are no search results
            )}
          </Box>
          </Box> */}
      <Footer />
    </div>
  );
};

export default DomainList;
