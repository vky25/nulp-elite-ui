import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import Grid from "@mui/material/Grid";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as util from "../../services/utilService";
import { useNavigate } from "react-router-dom";
import SearchBox from "components/search";
import ContinueLearning from "./continueLearning";
import SelectPreference from "pages/SelectPreference";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import _ from "lodash";

const Profile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [certData, setCertificateCountData] = useState({
    totalCourses: 0,
    certificatesReceived: 0,
  });
  const [courseData, setCourseCountData] = useState({
    enrolledThisMonth: 0,
    enrolledLastMonth: 0,
  });
  const progressValue = 60; // Example value, you can set this dynamically based on your progress
  const navigate = useNavigate();
  const _userId = util.userId();
  const [openModal, setOpenModal] = useState(false);
  const [isEmptyPreference, setIsEmptyPreference] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const axios = require("axios");

  useEffect(() => {
    const fetchCertificateCount = async () => {
      try {
        const url = `http://localhost:3000/profilePage/certificateCount?user_id=${_userId}`;
        const response = await fetch(url);
        const data = await response.json();
        setCertificateCountData({
          totalCourses: data.result.courseWithCertificate,
          certificatesReceived: data.result.certificateReceived,
        });
      } catch (error) {
        console.error("Error fetching certificate count:", error);
      }
    };

    const fetchCourseCount = async () => {
      try {
        const url = `http://localhost:3000/profilePage/courseCount?user_id=${_userId}`;
        const response = await fetch(url);
        const data = await response.json();
        setCourseCountData({
          enrolledThisMonth: data.result.enrolledThisMonth,
          enrolledLastMonth: data.result.enrolledLastMonth,
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/custom/user/read",
          { user_ids: [_userId] },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserInfo(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchCertificateCount();
    fetchCourseCount();
    fetchUserInfo();
  }, []);

  const fetchData = async () => {
    try {
      const url = `http://localhost:3000/learner/user/v5/read/${_userId}?fields=organisations,roles,locations,declarations,externalIds`;
      const header = "application/json";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userRootOrgId", data.result.response.rootOrgId);
      if (_.isEmpty(data?.result?.response.framework)) {
        setIsEmptyPreference(true);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLearningHistoryClick = () => {
    navigate("/learningHistory");
  };

  const handleContinueLearningClick = () => {
    navigate("/continueLearning");
  };

  const handleDownloadCertificateClick = () => {
    navigate("/certificate");
  };
  const handleSearch = (query) => {
    // Implement your search logic here
    console.log("Search query:", query);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // fetchData();
  };

  return (
    <div>
      <Header />
      <Box sx={{ background: "#2D2D2D", padding: "20px" }} className="xs-hide">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
            paddingBottom: "5px",
            margin: "0",
          }}
        >
          {t("EXPLORE_CONTENT_RELATED_TO_YOUR_DOMAIN")}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#C1C1C1",
            margin: "0",
            paddingBottom: "30px",
          }}
        >
          {t("LEARN_FROM_WELL_CURATED")}
        </p>
        <SearchBox onSearch={handleSearch} />
      </Box>
      <Container maxWidth="xxl" role="main" className="container-pb">
        <Grid container spacing={2} className="sm-pt-22">
          <Grid item xs={12} md={4} lg={4} className="sm-p-25">
            <Box sx={{ fontSize: "18px", color: "#484848" }}>
              {t("MY_PROFILE")}
            </Box>

            <Box textAlign="center" padding="10" sx={{ marginTop: "22px" }}>
              <Card
                sx={{
                  marginTop: "10px",
                  padding: "10px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon
                      style={{ paddingRight: "10px", fontSize: "28px" }}
                    />
                    {t("ABOUT_ME")}{" "}
                  </Box>
                  <ModeEditIcon />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px 10px",
                  }}
                >
                  <img
                    src={require("../../assets/blank.png")}
                    style={{ width: "20%" }}
                  />
                  <CardContent style={{ textAlign: "left", paddingTop: "0" }}>
                    {userData && userInfo && (
                      <>
                        <Typography
                          component="div"
                          variant="h5"
                          style={{
                            color: "#004367",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {userData.result.response.firstName}{" "}
                          {userData.result.response.lastName}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{
                            fontSize: "12px",
                            padding: "10px 0",
                            display: "flex",
                          }}
                        >
                          {/* {t("DESIGNATION")} |{" "} */}
                          {userInfo[0]?.designation}
                          <Box style={{ paddingLeft: "10px" }}> ID: </Box>{" "}
                          {userData.result.response.organisations.orgName}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "12px" }}
                        >
                          {/* {t("A_MANAGER_WITH_THE_DEPARTMENT_OF_REVENUE")} */}
                          {userInfo[0]?.bio}
                        </Typography>
                        {/* Displaying the framework.board field */}
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{
                            fontSize: "14px",
                            padding: "10px 0",
                            display: "flex",
                          }}
                        >
                          <Box
                            style={{ fontWeight: "600", paddingRight: "10px" }}
                          >
                            {t("Domain")}:{" "}
                          </Box>{" "}
                          {userData.result.response.framework.board}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Box>
              </Card>

              <Grid container spacing={2} style={{ padding: "5px 0" }}>
                <Grid item xs={6} md={6}>
                  <Card
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                      boxShadow: "0px 4px 4px 0px #00000040",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleContinueLearningClick}
                  >
                    <Box
                      className="profileBox"
                      style={{
                        background: "#004367",
                        color: "#fff",
                        margin: "-10px",
                        borderTopRightRadius: "250px",
                        borderBottomRightRadius: "250px",
                      }}
                    >
                      <LibraryAddCheckOutlinedIcon />
                    </Box>

                    <Box style={{ paddingLeft: "20px" }}>
                      {t("CONTINUE_LEARNNG")}
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Card
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                      boxShadow: "0px 4px 4px 0px #00000040",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleDownloadCertificateClick}
                  >
                    <Box
                      className="profileBox"
                      style={{
                        background: "#004367",
                        color: "#fff",
                        margin: "-10px",
                        borderTopRightRadius: "250px",
                        borderBottomRightRadius: "250px",
                      }}
                    >
                      <ReceiptLongOutlinedIcon />
                    </Box>

                    <Box style={{ paddingLeft: "20px" }}>
                      {t("DOWNLOAD_CERTIFICATES")}
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Card
                    sx={{
                      padding: "10px",
                      boxShadow: "0px 4px 4px 0px #00000040",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleLearningHistoryClick}
                  >
                    <Box
                      className="profileBox"
                      style={{
                        background: "#004367",
                        color: "#fff",
                        margin: "-10px",
                        borderTopRightRadius: "250px",
                        borderBottomRightRadius: "250px",
                      }}
                    >
                      <RestoreOutlinedIcon />
                    </Box>

                    <Box style={{ paddingLeft: "20px" }}>
                      {t("LEARNNG_HISTORY")}
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Card
                    sx={{
                      padding: "10px",
                      boxShadow: "0px 4px 4px 0px #00000040",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleOpenModal}
                  >
                    <Box
                      className="profileBox"
                      style={{
                        background: "#004367",
                        color: "#fff",
                        margin: "-10px",
                        borderTopRightRadius: "250px",
                        borderBottomRightRadius: "250px",
                      }}
                    >
                      <SettingsOutlinedIcon />
                    </Box>

                    <Box style={{ paddingLeft: "20px" }}>
                      {t("CHANGE_PREFERENCES")}
                    </Box>
                  </Card>
                </Grid>

                <Dialog
                  open={openModal}
                  onClose={handleCloseModal}
                  disableEscapeKeyDown={!isEmptyPreference}
                >
                  <DialogTitle>Select Preference</DialogTitle>
                  <DialogContent>
                    <SelectPreference onClose={handleCloseModal} />
                  </DialogContent>
                </Dialog>
              </Grid>

              {/* <Card sx={{ marginTop: "10px", padding: "10px" }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <TimelapseOutlinedIcon style={{ paddingRight: "10px" }} />
                      {t("LEARNING_TIME")}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "20px 10px",
                      fontSize: "14px",
                      color: "#484848",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      style={{
                        background: "#A7E0FF",
                        padding: "20px 50px",
                        borderRadius: "20px",
                        marginRight: "20px",
                      }}
                    >
                      {t("COURSES")}
                      <br />
                      <Typography
                        variant="h7"
                        style={{
                          fontWeight: "700",
                          margin: "9px 0",
                          display: "block",
                        }}
                      >
                        14h 20m
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        background: "#f7cfb6",
                        padding: "20px 50px",
                        borderRadius: "20px",
                      }}
                    >
                      {t("WEBINARS")}
                      <br />
                      <Typography
                        variant="h7"
                        style={{
                          fontWeight: "700",
                          margin: "9px 0",
                          display: "block",
                        }}
                      >
                        10h 15m
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card> */}

              <Card sx={{ margin: "15px 0 40px 0", padding: "10px" }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "0 0 12px 0",
                    }}
                  >
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <EmojiEventsOutlinedIcon
                        style={{ paddingRight: "10px" }}
                      />{" "}
                      {t("PERFORMANCE")}
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={3}
                      md={3}
                      className="circular"
                      style={{ paddingRight: "0", textAlign: "right" }}
                    >
                      <CircularProgressWithLabel
                        received={certData.certificatesReceived}
                        total={certData.totalCourses}
                        className="circular"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </Grid>
                    <Grid item xs={3} md={3} className="circular">
                      <Typography
                        variant="h7"
                        style={{
                          margin: "9px 0",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {t("CERTIFICATIONS_RECEIVED")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      md={3}
                      style={{ paddingRight: "0", textAlign: "right" }}
                    >
                      <CircularProgressWithLabel
                        value={
                          courseData.enrolledThisMonth -
                          courseData.enrolledLastMonth
                        }
                      />
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Typography
                        variant="h7"
                        style={{
                          margin: "9px 0",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {t("COURSES_THAN_LAST_MONTH")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            className="xs-hide"
            style={{ borderLeft: "solid 1px #898989" }}
          >
            <ContinueLearning />
          </Grid>
        </Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default Profile;
