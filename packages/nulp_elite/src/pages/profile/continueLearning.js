import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Filter from "components/filter";
import BoxCard from "components/Card";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as util from "../../services/utilService";
import Search from "components/search";
import NoResult from "pages/content/noResultFound";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

const ContinueLearning = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { domain } = location.state || {};
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    fetchData();
    fetchGradeLevels();
  }, [filters]);

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilters({ ...filters, se_gradeleverl: selectedValues });
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const _userId = util.userId();

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}`;
      const response = await fetch(url, headers);
      const responseData = await response.json();
      setData(responseData.result.courses);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGradeLevels = () => {
    // Implement your logic to fetch grade levels
  };

  const handleCourseStatusChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setCourseStatus(selectedValues);
  };

  // Filtered courses based on selected course status
  const filteredCourses = useMemo(() => {
    if (!courseStatus.length) {
      // If no course status is selected, return all courses
      return data;
    }

    // Filter courses based on selected course status
    return data.filter((courses) =>
      courseStatus.includes(courses.contents.status)
    );
  }, [courseStatus, data]);

  return (
    <div>
      {/* <Header /> */}
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container maxWidth="xxl" role="main" className="container-pb">
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{
            padding: "25px 0",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          <Link underline="hover" color="#004367" href="/profile">
            {t("MY_PROFILE")}
          </Link>
          <Typography color="#484848" aria-current="page">
            {t("Continue Learning")}
          </Typography>
        </Breadcrumbs>
        {/* <Box style={{ margin: "20px 0" }}>
          <Search></Search>
        </Box> */}

        <Box textAlign="center" padding="10">
          <Box sx={{ paddingTop: "30px" }}>
            <Grid
              container
              spacing={2}
              style={{ margin: "20px 0", marginBottom: "10px" }}
            >
              {/* 
              {filteredCourses.map((items) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "10px" }}
                  key={items.contentId}
                >
                  <BoxCard items={items.content} index={filteredCourses.length}></BoxCard>
                </Grid>
              ))} */}

              {filteredCourses.length === 0 ? (
                <NoResult />
              ) : (
                filteredCourses.map((items) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    style={{ marginBottom: "10px" }}
                    key={items.contentId}
                  >
                    <BoxCard
                      items={items.content}
                      index={filteredCourses.length}
                    ></BoxCard>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
      <FloatingChatIcon />
      {/* <Footer /> */}
    </div>
  );
};

export default ContinueLearning;
