import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Modal as BaseModal, makeStyles } from "@material-ui/core";
import { styled, css } from "@mui/system";
import PropTypes from "prop-types";
import { Button } from "@mui/base/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Search from "components/search";
import { useLocation, Navigate } from "react-router-dom";
import * as util from "../../services/utilService";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Header from "components/header";
import Footer from "components/Footer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTranslation } from "react-i18next";
import { useStore } from "configs/zustandStore";
import { Link as RouterLink } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Popover from "@mui/material/Popover";
import { Container } from "@mui/material";

// Define modal styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
    maxWidth: 600, // Adjust as needed
    borderRadius: 10, // Add rounded corners
    borderTopLeftRadius: 0, // Ensure modal appears attached to the bottom
    borderTopRightRadius: 0,
  },
}));

const AddConnections = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showChat, setShowChat] = useState(false);
  const [buttonText, setButtonText] = useState("Invite");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userSearchData, setUserSearchData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [textValue, setTextValue] = useState(
    "Hello ..., I would like to connect with you regarding some queries i had in your course."
  );
  const [invitationAcceptedUsers, setInvitationAcceptedUsers] = useState();
  const [invitationNotAcceptedUsers, setInvitationNotAcceptedUsers] =
    useState();
  const [loggedInUserId, setLoggedInUserId] = useState();
  const location = useLocation();
  const [invitationReceiverByUser, setInvitationReceivedUserByIds] = useState();
  const [userChat, setUserChat] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState(false);
  const { t } = useTranslation();
  const setData = useStore((state) => state.setData);
  const [totalPages, setTotalPages] = useState(1);
  const [userQuerySearchData, setUserQuerySearchData] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleFilterChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setFilters({ ...filters, firstName: selectedValues });
  // };

  // const filteredUsers = userData?.filter(
  //   (user) => user.name && user.name.includes(searchQuery)
  // );

  const getChat = async (userId) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      sender_id: loggedInUserId,
      receiver_id: userId,
      is_accepted: true,
      is_read: false,
    });

    const url = `http://localhost:3000/directConnect/get-chats?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get chat");
      }

      const responseData = await response.json();
      console.log("getChat", responseData.result);
      return responseData.result;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handlePageChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  useEffect(() => {
    if (activeTab === "Tab2") {
      handleSearch();
    }
  }, [currentPage]);

  useEffect(() => {
    const _userId = util.userId();
    setLoggedInUserId(_userId);
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
    setButtonText(showChat ? t('INVITE') : t('SEND_INVITATION'));
  };

  useEffect(() => {
    onMyConnection();
  }, [loggedInUserId]);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsModalOpen(false);
  };

  const handleSearch = async (selectedUserId = "") => {
    setIsLoading(true);
    setError(null);
    setUserSearchData([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    let filters = {
      status: "1",
    };
    if (selectedUserId) {
      filters.userId = selectedUserId;
    }
    const requestBody = {
      request: {
        filters: filters,
        // query: searchQuery,
        limit: 10,
        offset: 10 * (currentPage - 1),
        sort_by: {
          lastUpdatedOn: "desc",
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let responseData = await response.json();
      setTotalPages(Math.ceil(responseData?.result?.response?.count / 10));
      console.log("responseData", responseData);
      console.log(
        "user list of all type user",
        invitationAcceptedUsers,
        invitationNotAcceptedUsers,
        invitationReceiverByUser
      );
      const allTypeOfUsers = [
        ...(invitationAcceptedUsers || []),
        ...(invitationNotAcceptedUsers || []),
        ...(invitationReceiverByUser || []),
      ]
        .filter((e) => e.userId)
        .map((e) => e.userId);
      console.log("allTypeOfUsers", allTypeOfUsers);
      const responseUserData = responseData?.result?.response?.content?.filter(
        function (el) {
          return !allTypeOfUsers.includes(el.userId);
        }
      );

      console.log("responseUserData", responseUserData);
      setUserSearchData(responseUserData);
      console.log("responseSearchData", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUserQuerySearch = async () => {
    setIsLoading(true);
    setError(null);
    setUserQuerySearchData([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
        },
        query: searchQuery,
        sort_by: {
          lastUpdatedOn: "desc",
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let responseData = await response.json();
      setUserQuerySearchData(responseData?.result?.response?.content);
      console.log("setUserQuerySearchData", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = (selectedUser) => {
    setSelectedUser(selectedUser);
  };
  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSendClick = async () => {
    try {
      await sendChatRequestToUser(selectedUser.userId);
      handleClose();
      setShowModal(true);
    } catch (error) {
      console.error("Error sending chat request:", error);
    }
  };

  const userClick = (selectedUser) => {
    setSelectedUser(selectedUser);
    setShowChatModal(true);
  };
  const getConnections = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      sender_id: loggedInUserId,
      receiver_id: loggedInUserId,
      is_connection: true,
    });

    const url = `http://localhost:3000/directConnect/get-chats?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get connected user chat");
      }
      setInvitationReceivedUserByIds([]);
      setInvitationAcceptedUsers([]);
      setInvitationNotAcceptedUsers([]);
      const responseData = await response.json();
      console.log("getConnections", responseData.result);

      const invitationNotAcceptedUserIds = responseData.result
        .filter((res) => !res.is_accepted && res.sender_id === loggedInUserId)
        .map((res) => res.receiver_id);

      const sender = responseData.result
        .filter((res) => res.is_accepted && res.receiver_id === loggedInUserId)
        .map((res) => res.sender_id);
      const receiver = responseData.result
        .filter((res) => res.is_accepted && res.sender_id === loggedInUserId)
        .map((res) => res.receiver_id);
      const invitationAcceptedUserIds = sender.concat(receiver);

      const invitationReceivedUserIds = responseData.result
        .filter(
          (res) =>
            !res.is_accepted &&
            res.receiver_id == loggedInUserId &&
            res.sender_id !== loggedInUserId
        )
        .map((res) => res.sender_id);

      invitationReceivedUserIds.length > 0 &&
        getInvitationReceivedUserByIds(invitationReceivedUserIds);
      invitationNotAcceptedUserIds.length > 0 &&
        getInvitationNotAcceptedUserByIds(invitationNotAcceptedUserIds);
      invitationAcceptedUserIds.length > 0 &&
        getInvitationAcceptedUserByIds(invitationAcceptedUserIds);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInvitationNotAcceptedUserByIds = async (userIds) => {
    setIsLoading(true);
    setError(null);
    setInvitationNotAcceptedUsers([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
          userId: userIds,
        },
        // query: searchQuery,
        // pageNumber: currentPage,
        // pageSize: pageSize,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to search data");
      }

      const responseData = await response.json();
      setInvitationNotAcceptedUsers(
        responseData?.result?.response?.content || []
      );
      handleOpen();
      handleClose();

      console.log(
        "InvitationNotAcceptedUsers",
        responseData.result.response.content
      );
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    console.log("invitationNotAcceptedUsers", invitationNotAcceptedUsers);
  };

  const getInvitationAcceptedUserByIds = async (userIds) => {
    setIsLoading(true);
    setError(null);
    setInvitationAcceptedUsers([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
          userId: userIds,
        },
        // query: searchQuery,
        // pageNumber: currentPage,
        // pageSize: pageSize,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to search data");
      }

      const responseData = await response.json();
      const userList = responseData?.result?.response?.content || [];

      const userListWithChat = await Promise.all(
        userList.map(async (item) => {
          const userChat = await getChat(item.id);
          if (userChat?.length > 0) {
            item = { ...item, isRead: false };
          }

          return item;
        })
      );

      setInvitationAcceptedUsers(userListWithChat || []);
      console.log(
        "InvitationAcceptedUsers",
        responseData.result.response.content
      );
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInvitationReceivedUserByIds = async (userIds) => {
    setIsLoading(true);
    setError(null);
    setInvitationReceivedUserByIds([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
          userId: userIds,
        },
        // query: searchQuery,
        // pageNumber: currentPage,
        // pageSize: pageSize,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to search data");
      }

      const responseData = await response.json();
      setInvitationReceivedUserByIds(
        responseData?.result?.response?.content || []
      );
      handleOpen();
      handleClose();
      console.log(
        "getInvitationReceivedUserByIds",
        responseData.result.response.content
      );
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onMyConnection = () => {
    if (loggedInUserId) {
      getConnections();
    }
  };

  const handleAcceptedChatOpen = (userId, name) => {
    const dataToSend = {
      userId: userId,
      fullName: name,
    };
    localStorage.setItem("userId", userId);
    localStorage.setItem("chatName", name);
    setData(dataToSend);
    setSelectedUserName(name);
    getUserChat(userId);
    setIsModalOpen(true);
    setOpen(true);
    // return <Navigate to={`/message`} />;
  };

  const handleCloseChatHistoryModal = () => {
    setOpen(false);
  };

  const handleNotAcceptedChatOpen = () => {
    getUserChatNotAccepted();
  };

  const acceptChat = (userId) => {
    acceptChatInvitation(userId);
  };

  const rejectChat = (userId) => {
    rejectChatInvitation(userId);
  };

  const acceptChatInvitation = async (userId) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      sender_id: userId,
      receiver_id: loggedInUserId,
    };

    const url = `http://localhost:3000/directConnect/accept-invitation`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to accept chat");
      }

      const responseData = await response.json();
      console.log("acceptChatInvitation", responseData.result);
      onMyConnection();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectChatInvitation = async (userId) => {
    setIsLoading(true);
    setError(null);
    const requestBody = {
      sender_id: userId,
      receiver_id: loggedInUserId,
    };

    const url = `http://localhost:3000/directConnect/reject-invitation`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to block chat");
      }

      const responseData = await response.json();
      console.log("rejectChatInvitation", responseData.result);
      onMyConnection();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserChat = async (userId) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      sender_id: loggedInUserId,
      receiver_id: loggedInUserId,
      is_accepted: true,
      is_connection: true,
    });

    const url = `http://localhost:3000/directConnect/get-chats?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get user chat");
      }

      const responseData = await response.json();
      console.log("getUserChat", responseData.result);
      const userChats = responseData.result.filter(
        (res) =>
          (res.sender_id === loggedInUserId && res.receiver_id === userId) ||
          (res.sender_id === userId && res.receiver_id === loggedInUserId)
      );
      setUserChat(userChats);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatRequestToUser = async (userId) => {
    setIsLoading(true);
    setError(null);

    const url = `http://localhost:3000/directConnect/send-chat`;
    const requestBody = {
      sender_id: loggedInUserId,
      receiver_id: userId,
      message: textValue,
      sender_email: "snehal.sabade@tekditechnologies.com",
      receiver_email: "mahesh.mahajan@tekditechnologies.com",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to send chat");
      }
      setSelectedUser("");
      console.log("sentChatRequest", response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSearchedUser = (selectedUserId) => {
    handlePopoverClose();
    const allTypeOfUsers = [
      ...(invitationAcceptedUsers || []),
      ...(invitationNotAcceptedUsers || []),
      ...(invitationReceiverByUser || []),
    ];
    if (activeTab === "Tab1") {
      if (
        allTypeOfUsers &&
        allTypeOfUsers.find((user) => user.userId === selectedUserId)
      ) {
        emptyOtherSectionsFromMyConnection(selectedUserId);
      } else {
        handleTabClick("Tab2");
        setValue("2");
        handleSearch(selectedUserId);
      }
    } else {
      if (
        allTypeOfUsers &&
        allTypeOfUsers.find((user) => user.userId === selectedUserId)
      ) {
        emptyOtherSectionsFromMyConnection(selectedUserId);
        handleTabClick("Tab1");
        setValue("1");
      } else {
        handleSearch(selectedUserId);
      }
    }
  };

  const emptyOtherSectionsFromMyConnection = (selectedUserId) => {
    if (
      invitationReceiverByUser &&
      invitationReceiverByUser.find((user) => user.userId === selectedUserId)
    ) {
      setInvitationReceivedUserByIds(
        invitationReceiverByUser.filter(
          (user) => user.userId === selectedUserId
        )
      );
      setInvitationAcceptedUsers([]);
      setInvitationNotAcceptedUsers([]);
    } else if (
      invitationAcceptedUsers &&
      invitationAcceptedUsers.find((user) => user.userId === selectedUserId)
    ) {
      setInvitationAcceptedUsers(
        invitationAcceptedUsers.filter((user) => user.userId === selectedUserId)
      );
      setInvitationReceivedUserByIds([]);
      setInvitationNotAcceptedUsers([]);
    } else if (
      invitationNotAcceptedUsers &&
      invitationNotAcceptedUsers.find((user) => user.userId === selectedUserId)
    ) {
      setInvitationNotAcceptedUsers(
        invitationNotAcceptedUsers.filter(
          (user) => user.userId === selectedUserId
        )
      );
      setInvitationAcceptedUsers([]);
      setInvitationReceivedUserByIds([]);
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      onUserQuerySearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Box>
      <Header />
      <Container maxWidth="xxl" role="main" className="container-pb">
        <Box textAlign="center" padding="10" style={{ minHeight: "500px" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input type="text" placeholder="Search..." style={{ flex: 1, marginRight: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CACACA' }} />
        <button style={{ padding:'11px 16px 11px 16px', borderRadius: '4px', backgroundColor: '#004367', color: 'white', border: '1px', cursor: 'pointer' ,fontSize:'12px'}}>Search</button>
      </div> */}

            <input
              label="Search for a user..."
              type="text"
              onChange={(e) => {
                const value = e.target.value.trim();
                setSearchQuery(value);
                if (value.length >= 3) {
                  handlePopoverClick(e);
                }
              }}
              style={{
                width: "100%",
                flex: 1,
                marginRight: "0.5rem",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #CACACA",
              }}
            />
            <div>
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  {userQuerySearchData &&
                    userQuerySearchData?.length > 0 &&
                    userQuerySearchData?.map((item) => (
                      <List
                        sx={{}}
                        style={{ color: "gray", cursor: "pointer" }}
                      >
                        <ListItem>
                          <ListItemText
                            primary={`${item.firstName}${
                              item.lastName ? ` ${item.lastName}` : ""
                            }`}
                            secondary="Designation"
                            onClick={() => onClickSearchedUser(item.userId)}
                          />
                        </ListItem>
                        <Divider />
                      </List>
                    ))}
                  {(!userQuerySearchData ||
                    userQuerySearchData.length === 0) && (
                    <Box>
                      <p>No users found</p>
                    </Box>
                  )}
                </Typography>
              </Popover>
            </div>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="My Connections"
                    value="1"
                    style={{ fontSize: "12px", color: "#484848" }}
                    onClick={() => {
                      handleTabClick("Tab1");
                      setCurrentPage(1);
                      onMyConnection();
                    }}
                  />
                  <Tab
                    label="Add New"
                    value="2"
                    style={{ fontSize: "12px", color: "#484848" }}
                    onClick={() => {
                      handleTabClick("Tab2");
                      setCurrentPage(1);
                      handleSearch();
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ padding: "0" }}>
                {invitationReceiverByUser &&
                  invitationReceiverByUser.length === 0 &&
                  invitationAcceptedUsers &&
                  invitationAcceptedUsers.length === 0 &&
                  invitationNotAcceptedUsers &&
                  invitationNotAcceptedUsers.length === 0 && (
                    <Box>
                      <p>No users found</p>
                    </Box>
                  )}

                {invitationReceiverByUser &&
                  invitationReceiverByUser?.map((item) => (
                    <List sx={{}} style={{ color: "gray", cursor: "pointer" }}>
                      <ListItem>
                        <ListItemText
                          primary={`${item.firstName}${
                            item.lastName ? ` ${item.lastName}` : ""
                          }`}
                          secondary="Designation"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "10px",
                          }}
                        >
                          <Link
                            href="#"
                            underline="none"
                            color="#004367"
                            onClick={() => acceptChat(item.userId)}
                            style={{ marginLeft: "10px" }}
                          >
                            <CheckCircleOutlineIcon
                              style={{ fontSize: "28px" }}
                            />
                          </Link>
                          <span style={{ margin: "0 5px" }}></span>
                          <Link
                            href="#"
                            underline="none"
                            color="#7d7a7a"
                            onClick={() => rejectChat(item.userId)}
                          >
                            <CancelOutlinedIcon style={{ fontSize: "28px" }} />
                          </Link>
                        </div>
                      </ListItem>

                      <Divider />
                    </List>
                  ))}
                {invitationAcceptedUsers &&
                  invitationAcceptedUsers?.map((item) => (
                    <List sx={{}} style={{ color: "green", cursor: "pointer" }}>
                      <ListItem
                        component={RouterLink}
                        to={{
                          pathname: "/message",
                        }}
                      >
                        <ListItemText
                          primary={
                            <span
                              style={{
                                color:
                                  item && item.isRead === false
                                    ? "black"
                                    : "black",
                                fontWeight:
                                  item && item.isRead === false
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {item.firstName}
                              {item.lastName ? ` ${item.lastName}` : ""}
                            </span>
                          }
                          secondary="Designation"
                          onClick={() =>
                            handleAcceptedChatOpen(
                              item.userId,
                              `${item.firstName}${
                                item.lastName ? ` ${item.lastName}` : ""
                              }`
                            )
                          }
                        />
                      </ListItem>
                      <Divider />
                    </List>
                  ))}

                {invitationNotAcceptedUsers &&
                  invitationNotAcceptedUsers?.map((item) => (
                    <List
                      sx={{}}
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      onClick={() => userClick(item)}
                    >
                      <ListItem>
                        <ListItemText
                          primary={`${item.firstName}${
                            item.lastName ? ` ${item.lastName}` : ""
                          }`}
                          secondary="Designation"
                        />
                      </ListItem>

                      <Divider />
                    </List>
                  ))}
                <div>
                  {showChatModal && (
                    <Modal
                      open={showChatModal}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-desc"
                      className="sx-bottom"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        pt: "10vh",
                        p: "0",
                      }}
                    >
                      <ModalContent sx={{ width: 400 }} style={{}}>
                        <div style={{ textAlign: "center" }}>
                          <h2
                            style={{
                              fontSize: "14px",
                              textAlign: "center",
                              padding: "13px",
                            }}
                          >
                            {t("INVITATION_NOT_ACCEPTED")}
                          </h2>
                          <Button
                            onClick={(e) => {
                              setShowChatModal(false);
                            }}
                            style={{
                              background: "#004367",
                              border: "solid 1px #004367",
                              borderRadius: "10px",
                              color: "#fff",
                              padding: "10px 12px",
                              margin: "0 10px",
                              fontWeight: "500",
                              fontSize: "12px",
                              width: "50%",
                              marginBottom: "10px",
                            }}
                          >
                            {t("CLOSE")}
                          </Button>
                        </div>
                      </ModalContent>
                    </Modal>
                  )}
                </div>
              </TabPanel>
              <TabPanel value="2">
                {userSearchData &&
                  userSearchData?.map((item) => (
                    <List
                      key={item.id} // Add key prop to each List element
                      sx={{ fontSize: "14px" }} // Add styling here if needed
                      onClick={() => handleUserClick(item)}
                    >
                      <ListItem>
                        <ListItemText
                          primary={`${item.firstName}${
                            item.lastName ? ` ${item.lastName}` : ""
                          }`}
                          secondary="Designation"
                        />
                        <Link
                          href="#"
                          underline="none"
                          color="primary"
                          onClick={handleOpen}
                          style={{
                            fontSize: "14px",
                            color: "#004367",
                            fontWeight: "600",
                          }}
                        >
                          Invite
                        </Link>
                      </ListItem>
                      <Divider />
                      {/* <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column", // Added to align items vertically
              }}
            >
              <TextField
                label="Search for a user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />
              <Button
                style={{
                  padding: "11px 9px",
                  borderRadius: "4px",
                  backgroundColor: "#004367",
                  color: "white",
                  border: "1px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
              {!isLoading && !error && (
                <List>
                  {filteredUsers &&
                    filteredUsers.map((user, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={`Name Surname: ${user.firstName} ${user.lastName}`}
                            secondary={`Designation: ${user.designation}`}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                </List>
              )}
              {isLoading && <Typography>Loading...</Typography>}
              {error && <Typography>Error: {error}</Typography>}
            </Box> */}
                    </List>
                  ))}

                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
                <div>
                  <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    className="sx-bottom"
                    onClose={() => setOpen(false)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      pt: "10vh",
                      p: "0",
                    }}
                  >
                    <ModalContent sx={{ width: 400 }} style={{}}>
                      <h2
                        id="unstyled-modal-title"
                        className="modal-title"
                        style={{
                          paddingTop: "10px",
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          paddingBottom: "10px", // Changed to paddingBottom to avoid duplication
                          backgroundColor: "#004367",
                          color: "white",
                          borderRadius: "4px", // Changed to "4px" from "md" for borderRadius
                        }}
                      >
                        {selectedUser && (
                          <div
                            style={{
                              fontSize: "16px",
                              lineHeight: "1.6",
                              fontWeight: "500",
                            }}
                          >
                            {selectedUser?.firstName}
                            {selectedUser?.lastName}
                          </div>
                        )}
                        {selectedUser && (
                          <div
                            style={{
                              fontSize: "15px",
                              paddingBottom: "10px",
                              fontWeight: "400",
                            }}
                          >
                            Designation:
                          </div>
                        )}
                      </h2>

                      {!showChat && (
                        <p
                          style={{
                            fontSize: "12px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                          }}
                          id="unstyled-modal-description"
                          className="modal-description"
                        >
                          <Box
                            style={{
                              fontSize: "12px",
                              color: "#484848",
                              paddingBottom: "15px",
                            }}
                          >
                            {selectedUser.firstName} {selectedUser.lastName} is
                            a manager with the department of Revenue and taxes
                            and has actively contributed to the growth and
                            authenticity of the knowledge curated for the
                            betterment of the department.
                          </Box>
                          <Box>
                            Connect with them to get insights on what they do or
                            simply answers to your question!
                          </Box>
                        </p>
                      )}
                      {showChat && (
                        <div>
                          <TextField
                            multiline
                            minRows={5}
                            maxRows={10}
                            value={textValue}
                            onChange={handleTextareaChange}
                            placeholder="Enter your text here..."
                            fullWidth
                            sx={{ fontSize: "13px" }}
                          />
                        </div>
                      )}
                      <Box
                        style={{
                          paddingBottom: "30px",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          variant="outlined"
                          style={{
                            borderRadius: "10px",
                            color: "#004367",
                            padding: "10px 12px",
                            margin: "0 10px",
                            fontWeight: "500",
                            fontSize: "12px",
                            border: "solid 1px #efefea00",
                            width: "50%",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>

<<<<<<< HEAD
                {showModal && (
                  <Modal
                    open={showModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    className="sx-bottom"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      pt: "10vh",
                      p: "0",
                    }}
                  >
                    <ModalContent
                      sx={{ width: 400, bottom: "30px" }}
                      style={{}}
                    >
                      <div style={{ padding: "10px", textAlign: "center" }}>
                        <h2
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            padding: "13px",
                          }}
                        >
                          {t('INVITATION_SEND_SUCCESSFULLY')}
                        </h2>
=======
>>>>>>> 064364543f1855f28fbb171c1ed2d78bbb0326c7
                        <Button
                          style={{
                            background: "#004367",
                            borderRadius: "10px",
                            color: "#fff",
                            padding: "10px 12px",
                            margin: "0 10px",
                            fontWeight: "500",
                            fontSize: "12px",
                            border: "solid 1px #004367",
                            width: "50%",
                          }}
                          onClick={showChat ? handleSendClick : toggleChat}
                        >
<<<<<<< HEAD
                          {t('CLOSE')}
=======
                          {buttonText}
>>>>>>> 064364543f1855f28fbb171c1ed2d78bbb0326c7
                        </Button>
                      </Box>
                    </ModalContent>
                  </Modal>

                  {showModal && (
                    <Modal
                      open={showModal}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-desc"
                      className="sx-bottom"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        pt: "10vh",
                        p: "0",
                      }}
                    >
                      <ModalContent sx={{ width: 400 }} style={{}}>
                        <div style={{ padding: "10px", textAlign: "center" }}>
                          <h2
                            style={{
                              fontSize: "14px",
                              textAlign: "center",
                              padding: "13px",
                            }}
                          >
                            {t("INVITATION_SEND_SUCCESSFULLY")}
                          </h2>
                          <Button
                            onClick={(e) => {
                              setShowModal(false);
                            }}
                            style={{
                              background: "#004367",
                              borderRadius: "10px",
                              color: "#fff",
                              padding: "10px 12px",
                              margin: "0 10px",
                              fontWeight: "500",
                              fontSize: "12px",
                              width: "40%",
                            }}
                          >
                            {t("CLOSE")}
                          </Button>
                        </div>
                      </ModalContent>
                    </Modal>
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 0px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;

    }
  `
);

export default AddConnections;
