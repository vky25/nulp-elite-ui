import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import * as util from "../../services/utilService";

const LearningHistory = () => {
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _userId = util.userId();
        const url = `http://localhost:3000/learner/course/v1/user/enrollment/list/${_userId}?orgdetails=orgName,email&licenseDetails=name,description,url&fields=contentType,topic,name,channel,mimeType,appIcon,gradeLevel,resourceType,identifier,medium,pkgVersion,board,subject,trackable,primaryCategory,organisation&batchDetails=name,endDate,startDate,status,enrollmentType,createdBy,certificates`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />

      <Container maxWidth="xl" role="main" className="container-pb">
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
            <Typography color="#484848" aria-current="page">
              {t("LEARNING_HISTORY")}
            </Typography>
          </Breadcrumbs>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <Grid
              container
              spacing={2}
              style={{ textAlign: "left", paddingTop: "10px" }}
            >
              {courseData?.result?.courses?.map((course) => (
                <Grid item xs={12} md={4} key={course.identifier}>
                  <Card
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "solid 1px #EFEFEF",
                      boxShadow: "none",
                      color: "#484848",
                    }}
                  >
                    <Typography
                      className="twoLineEllipsis"
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                      style={{
                        fontSize: "14px",
                        paddingBottom: "15px",
                        height: "42px",
                        fontWeight: "600",
                      }}
                    >
                      {course.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                      style={{ fontSize: "12px" }}
                    >
                      {t("CERTIFICATE_GIVEN_BY")}: {course.batch.endDate}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                      style={{ fontSize: "12px" }}
                    >
                      {t("CERTIFICATE_ISSUE_DATE")}: {course.completedOn}
                    </Typography>
                    <Typography
                      style={{
                        marginTop: "10px",
                        color:
                          course.status === 2
                            ? "green"
                            : course.status === 1
                            ? "orange"
                            : "red",
                        fontSize: "12px",
                      }}
                    >
                      {course.status === 2
                        ? t("COMPLETED")
                        : course.status === 1
                        ? t("ONGOING")
                        : t("BATCH_EXPIRED")}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default LearningHistory;
