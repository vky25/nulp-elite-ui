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
import Modal from "@mui/material/Modal";
const designations = require("../../configs/designations.json");
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";

const DELAY = 1500;
const MAX_CHARS = 500;
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [certData, setCertificateCountData] = useState({});
  const [courseData, setCourseCountData] = useState({});
  const navigate = useNavigate();
  const _userId = util.userId();
  const [openModal, setOpenModal] = useState(false);
  const [isEmptyPreference, setIsEmptyPreference] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const axios = require("axios");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstName: userData?.result?.response?.firstName || "",
    lastName: userData?.result?.response?.lastName || "",
    bio: "",
    designation: "",
    otherDesignation: "",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [designationsList, setDesignationsList] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [rootOrgId, setRootOrgId] = useState();

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, DELAY);
    setDesignationsList(designations);
  }, []);

  useEffect(() => {
    if (userData?.result?.response && userInfo) {
      setEditedUserInfo({
        firstName: userData?.result?.response.firstName,
        lastName: userData?.result?.response.lastName,
        bio: userInfo[0]?.bio,
        designation: userInfo[0]?.designation,
        otherDesignation: "",
      });
      setOriginalUserInfo({
        firstName: userData?.result?.response.firstName,
        lastName: userData?.result?.response.lastName,
        bio: userInfo[0]?.bio,
        designation: userInfo[0]?.designation,
        otherDesignation: "",
      });
    }
  }, [userData, userInfo]);

  useEffect(() => {
    setDesignationsList(designations);
    const fetchCertificateCount = async () => {
      try {
        const url = `${urlConfig.URLS.POFILE_PAGE.CERTIFICATE_COUNT}?user_id=${_userId}`;

        const response = await fetch(url);
        const data = await response.json();
        setCertificateCountData({
          totalCourses: data.result.courseWithCertificate,
          certificatesReceived: data.result.certificateReceived,
        });
      } catch (error) {
        console.error("Error fetching certificate count:", error);
        showErrorMessage("Failed to fetch data. Please try again.");
      }
    };

    const fetchCourseCount = async () => {
      try {
        const url = `${urlConfig.URLS.POFILE_PAGE.COURSE_COUNT}?user_id=${_userId}`;

        const response = await fetch(url);
        const data = await response.json();
        setCourseCountData({
          enrolledThisMonth: data.result.enrolledThisMonth,
          enrolledLastMonth: data.result.enrolledLastMonth,
        });
      } catch (error) {
        console.error(error);
        showErrorMessage("Failed to fetch data. Please try again.");
      }
    };
    const fetchUserInfo = async () => {
      try {
        const url = `${urlConfig.URLS.POFILE_PAGE.USER_READ}`;
        const response = await axios.post(
          url,
          { user_ids: [_userId] },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserInfo(response?.data?.result);
      } catch (error) {
        console.error(error);
        showErrorMessage("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
    fetchCertificateCount();
    fetchCourseCount();
    fetchUserInfo();
    fetchUserDataAndSetCustodianOrgData();
  }, []);

  const fetchUserDataAndSetCustodianOrgData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.SYSTEM_SETTING.CUSTODIAN_ORG}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch custodian organization ID");
      }
      const data = await response.json();
      const custodianOrgId = data?.result?.response?.value;
      const rootOrgId = sessionStorage.getItem("rootOrgId");

      if (custodianOrgId === rootOrgId) {
        const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${custodianOrgId}`;
        const response = await fetch(url);
        const data = await response.json();
        const defaultFramework = data?.result?.channel?.defaultFramework;
        localStorage.setItem("defaultFramework", defaultFramework);
      } else {
        const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
        const response = await fetch(url);
        const data = await response.json();
        const defaultFramework = data?.result?.channel?.defaultFramework;
        localStorage.setItem("defaultFramework", defaultFramework);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo({
      ...editedUserInfo,
      [name]: value,
    });
    setIsFormDirty(true);
  };
  const handleOpenEditDialog = () => {
    setIsEditing(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditing(false);
  };
  const updateUserData = async () => {
    setIsLoading(true);
    setError(null);
    const requestBody = {
      params: {},
      request: {
        firstName: editedUserInfo.firstName,
        lastName: editedUserInfo.lastName,
        userId: _userId,
      },
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.UPDATE_USER_PROFILE}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      await updateUserInfoInCustomDB();
      console.log("responseData", responseData);
    } catch (error) {
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const updateUserInfoInCustomDB = async () => {
    const requestBody = {
      designation:
        editedUserInfo.designation === "Other"
          ? editedUserInfo.otherDesignation
          : editedUserInfo.designation,
      bio: editedUserInfo.bio,
      created_by: _userId,
    };
    try {
      const url = `${urlConfig.URLS.POFILE_PAGE.USER_UPDATE}?user_id=${_userId}`;
      const response = await fetch(url, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data in custom DB");
      }

      const data = await response.json();
    } catch (error) {
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateUserData();
    // Close the edit dialog
    setIsEditing(false);
    window.location.reload();
    setIsFormDirty(false);
  };

  const fetchData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}?fields=${urlConfig.params.userReadParam.fields}`;

      const header = "application/json";
      const response = await fetch(url, {
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      const data = await response.json();
      setUserData(data);
      const rootOrgId = data.result.response.rootOrgId;
      sessionStorage.setItem("rootOrgId", rootOrgId);
      setRootOrgId(rootOrgId);
      console.log("rootOrgId", rootOrgId);
      if (_.isEmpty(data?.result?.response.framework)) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showErrorMessage("Failed to fetch data. Please try again.");
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
    fetchData();
  };

  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
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
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}

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
                    {t("ABOUT_ME")}
                  </Box>
                  <ModeEditIcon onClick={handleOpenEditDialog} />
                </Box>
                {isEditing && (
                  <Modal
                    // open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    open={isEditing}
                    onClose={handleCloseEditDialog}
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        style={{ marginBottom: "20px" }}
                      >
                        {t("EDIT_PROFILE")}
                      </Typography>
                      <form onSubmit={handleFormSubmit}>
                        <Box py={1}>
                          <CssTextField
                            id="firstName"
                            name="firstName"
                            label={<span>First Name</span>}
                            variant="outlined"
                            size="small"
                            value={editedUserInfo.firstName}
                            onChange={(e) =>
                              setEditedUserInfo({
                                ...editedUserInfo,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </Box>
                        <Box py={1}>
                          <CssTextField
                            id="lastName"
                            name="lastName"
                            label={<span>Last Name</span>}
                            variant="outlined"
                            size="small"
                            value={editedUserInfo.lastName}
                            onChange={(e) =>
                              setEditedUserInfo({
                                ...editedUserInfo,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </Box>

                        <Box py={1}>
                          <FormControl fullWidth style={{ marginTop: "10px" }}>
                            <InputLabel
                              id="designation-label"
                              className="year-select"
                            >
                              {" "}
                              {t("DESIGNATION")}{" "}
                            </InputLabel>
                            <Select
                              labelId="designation-label"
                              id="designation"
                              value={editedUserInfo.designation}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  designation: e.target.value,
                                })
                              }
                            >
                              {designationsList.map((desig, index) => (
                                <MenuItem key={index} value={desig}>
                                  {desig}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {editedUserInfo.designation === "Other" && (
                          <Box py={1}>
                            <CssTextField
                              id="otherDesignation"
                              name="otherDesignation"
                              label={
                                <span>
                                  {t("OTHER_DESIGNATION")}{" "}
                                  <span className="required">*</span>
                                </span>
                              }
                              variant="outlined"
                              size="small"
                              value={editedUserInfo.otherDesignation}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  otherDesignation: e.target.value,
                                })
                              }
                            />
                          </Box>
                        )}
                        <Box py={2}>
                          <TextField
                            id="bio"
                            name="bio"
                            label={<span>{t("BIO")}</span>}
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            value={editedUserInfo.bio}
                            onChange={(e) =>
                              setEditedUserInfo({
                                ...editedUserInfo,
                                bio: e.target.value,
                              })
                            }
                            inputProps={{ maxLength: MAX_CHARS }}
                          />
                          <Typography
                            variant="caption"
                            color={
                              editedUserInfo.bio?.length > MAX_CHARS
                                ? "error"
                                : "textSecondary"
                            }
                          >
                            {editedUserInfo.bio ? editedUserInfo.bio.length : 0}
                            /{MAX_CHARS}
                          </Typography>
                        </Box>

                        <Box pt={4}>
                          <Button className="custom-btn-primary" type="submit">
                            {t("SAVE")}
                          </Button>

                          <Button
                            className="custom-btn-default"
                            onClick={handleCloseEditDialog}
                          >
                            {t("CANCEL")}
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Modal>
                  // <Dialog open={isEditing} onClose={handleCloseEditDialog}>
                  //   <DialogTitle>Edit Profile</DialogTitle>
                  //   <DialogContent>

                  //   </DialogContent>
                  // </Dialog>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px 10px",
                  }}
                >
                  {userData && (
                    <>
                      <div
                        style={{
                          width: "180px",
                          height: "60px",
                          borderRadius: "2px",
                          backgroundColor: "#6D757A",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "58px",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        {userData?.result?.response?.firstName[0]}
                      </div>
                    </>
                  )}
                  <CardContent
                    style={{ textAlign: "left", paddingTop: "0", width: "60%" }}
                  >
                    {userData && userInfo?.length > 0 && (
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
                            fontSize: "14px",
                            padding: "5px 0",
                            display: "flex",
                          }}
                        >
                          {/* {t("DESIGNATION")} |{" "} */}
                          {userInfo[0]?.designation}{" "}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            color: "#48484887",
                          }}
                        >
                          {" "}
                          <Box> ID:</Box>{" "}
                          <Box>
                            {userData.result.response.userName}{" "}
                            {userData.result.response.organisations.orgName}
                          </Box>
                        </Box>{" "}
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
                            fontSize: "12px",
                            padding: "10px 0",
                            display: "flex",
                          }}
                        >
                          <Box>{t("DOMAIN")}: </Box>{" "}
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
                        cursor: "pointer",
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
                        cursor: "pointer",
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
                        cursor: "pointer",
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
                        cursor: "pointer",
                      }}
                    >
                      <SettingsOutlinedIcon />
                    </Box>

                    <Box style={{ paddingLeft: "20px" }}>
                      {t("CHANGE_PREFERENCES")}
                    </Box>
                  </Card>
                </Grid>
                <Modal
                  // open={open}
                  // onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  isableEscapeKeyDown={!isEmptyPreference}
                  open={openModal}
                  onClose={(event, reason) => {
                    if (
                      reason === "backdropClick" ||
                      reason === "escapeKeyDown"
                    ) {
                      setOpenModal(true);
                    } else {
                      handleCloseModal();
                    }
                  }}
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                      style={{ marginBottom: "20px" }}
                    >
                      {t("SELECT_PREFERENCE")}
                    </Typography>
                    <SelectPreference onClose={handleCloseModal} />
                  </Box>
                </Modal>
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
                        variant="h5"
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
                        variant="h5"
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
                      {certData &&
                        certData.certificatesReceived &&
                        certData.totalCourses && (
                          <CircularProgressWithLabel
                            received={certData.certificatesReceived}
                            total={certData.totalCourses}
                            className="circular"
                            style={{ width: "80px", height: "80px" }}
                          />
                        )}
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
                      {courseData && (
                        <CircularProgressWithLabel
                          received={courseData.enrolledThisMonth}
                          total={courseData.enrolledLastMonth}
                          className="circular"
                          style={{ width: "80px", height: "80px" }}
                        />
                      )}
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
