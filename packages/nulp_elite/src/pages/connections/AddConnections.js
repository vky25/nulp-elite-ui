import React, { useState, useEffect } from "react";
import { Layout, IconByName } from "@shiksha/common-lib";
import { VStack, HStack, Menu, Image } from "native-base";
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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Search from "components/search";
import { useLocation } from "react-router-dom";
import * as util from "../../services/utilService";

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
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showChat, setShowChat] = useState(false);
  const [buttonText, setButtonText] = useState("Start Chat");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userSearchData, setUserSearchData] = useState({});
  const [userdata, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [textValue, setTextValue] = useState(
    "Hello ..., I would like to connect with you regarding some queries i had in your course."
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [invitationAcceptedUsers, setInvitationAcceptedUsers] = useState({});
  const [invitationNotAcceptedUsers, setInvitationNotAcceptedUsers] = useState(
    {}
  );
  const [loggedInUserId, setLoggedInUserId] = useState();

  const toggleChat = () => {
    setShowChat(!showChat);
    setButtonText(showChat ? "Start Chat" : "Send");
  };
  const [filters, setFilters] = useState({});
  const [gradeLevels, setGradeLevels] = useState([]);
  const location = useLocation();
  const { domain } = location.state || {};
  const [receivedUserChat, setReceivedUserchat] = useState("");
  const [invitationReceiverByUser, setInvitationReceivedUserByIds] = useState(
    {}
  );
  const [userChat, setUserChat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleFilterChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setFilters({ ...filters, firstName: selectedValues });
  // };

  // const filteredUsers = userData?.filter(
  //   (user) => user.name && user.name.includes(searchQuery)
  // );

  useEffect(() => {
    const _userId = util.userId();
    console.log("_userId", _userId);
    if (sessionStorage.length > 0) {
      setLoggedInUserId(sessionStorage.getItem("loggedInUserId"));
    }

    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const requestData = {
      request: {
        filters: {
          status: "1",
          rootOrgId: "0130701891041689600",
        },
        query: "",
      },
    };

    const url = `http://localhost:3000/learner/user/v3/search`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      setGradeLevels(responseData.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(userdata.length / pageSize);
  const pagination = [];

  for (let i = 1; i <= totalPages; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  const startIndex = (currentPage - 1) * pageSize;
  const userData = userdata.slice(startIndex, startIndex + pageSize);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setUserSearchData([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
          rootOrgId: "0130701891041689600",
        },
        query: searchQuery,
        pageNumber: currentPage,
        pageSize: pageSize,
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
      // const usedUsers = invitationAcceptedUsers
      //   .concat(invitationNotAcceptedUsers)
      //   .concat(invitationReceiverByUser);
      // responseData = responseData.result.response.content.filter(function (el) {
      //   return usedUsers.indexOf(el.userId) >= 0;
      // });

      setUserSearchData(responseData);
      console.log("responseSearchData", responseData);
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

  const handleSendClick = () => {
    sendChatRequestToUser(selectedUser.userId); // Call sendChat function to send the chat message
    setShowChat(false);
    toggleChat();
  };

  const getConnections = async () => {
    setIsLoading(true);
    setError(null);
    // setData([]);

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

      // setData(responseData.result.response.content);
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
          rootOrgId: "0130701891041689600",
          userId: userIds,
        },
        query: searchQuery,
        pageNumber: currentPage,
        pageSize: pageSize,
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
      setInvitationNotAcceptedUsers(responseData);
      handleOpen(); // Open modal after successful API response
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
          rootOrgId: "0130701891041689600",
          userId: userIds,
        },
        query: searchQuery,
        pageNumber: currentPage,
        pageSize: pageSize,
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
      setInvitationAcceptedUsers(responseData);
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
          rootOrgId: "0130701891041689600",
          userId: userIds,
        },
        query: searchQuery,
        pageNumber: currentPage,
        pageSize: pageSize,
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
      setInvitationReceivedUserByIds(responseData);
      handleOpen(); // Open modal after successful API response
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

  const getInvitations = async () => {
    setIsLoading(true);
    setError(null);
    // setData([]);

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
      setInvitationReceivedUserByIds([]);
      if (!response.ok) {
        throw new Error("Failed to get invited user");
      }

      const responseData = await response.json();
      console.log("getInvitations", responseData.result);
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onMyConnection = () => {
    getConnections();
    //getInvitations();
  };

  const handleAcceptedChatOpen = (userId) => {
    getUserChat(userId);
    setIsModalOpen(true);
    setOpen(true);
  };

  const handleNotAcceptedChatOpen = () => {
    getUserChatNotAccepted();
  };

  const acceptChat = (userId) => {
    acceptChatInvitation(userId);
  };

  const blockChat = (userId) => {
    blockChatInvitation(userId);
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
  const blockChatInvitation = async (userId) => {
    setIsLoading(true);
    setError(null);
    const requestBody = {
      sender_id: userId,
      receiver_id: loggedInUserId,
      reason: "block reason",
    };

    const url = `http://localhost:3000/directConnect/block-user`;

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
      console.log("blockChatInvitation", responseData.result);
      // onMyConnection();
      getConnections();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserChat = async (userId) => {
    setIsLoading(true);
    setError(null);
    // setData([]);

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
      const userChat = responseData.result;
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
  return (
    <Layout
      isDisabledAppBar={true}
      _header={{
        rightIcon: (
          <HStack paddingBottom={"25px"}>
            <IconByName name="CloseCircleFillIcon" />
          </HStack>
        ),
        customeComponent: (
          <Box flex={1} minH={"40px"}>
            <HStack>
              <VStack position={"relative"} padding="10px" top={"10px"}>
                <Menu
                  w="160"
                  trigger={(triggerProps) => {
                    return (
                      <Button
                        alignSelf="center"
                        variant="solid"
                        {...triggerProps}
                      >
                        <IconByName size="20px" name="MenuFillIcon" />
                      </Button>
                    );
                  }}
                >
                  <Menu.Item onPress={(item) => navigate("/help")}>
                    Help
                  </Menu.Item>
                  <Menu.Item onPress={(item) => navigate("/logoff")}>
                    Logout
                  </Menu.Item>
                </Menu>
              </VStack>
              <VStack>
                <Image
                  source={require("../../assets/nulp_logo.jpeg")}
                  alt=""
                  size="sm"
                />
              </VStack>
            </HStack>

            <Box position={"absolute"} right={"20px"} top={"10px"}>
              <Menu
                w="160"
                trigger={(triggerProps) => {
                  return (
                    <Button
                      alignSelf="center"
                      variant="solid"
                      {...triggerProps}
                    >
                      Language
                    </Button>
                  );
                }}
              >
                <Menu.Item>English</Menu.Item>
                <Menu.Item> Hindi</Menu.Item>
              </Menu>
            </Box>
          </Box>
        ),
      }}
      // subHeader={
      //   <Link
      //     to="/"
      //     style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
      //   >
      //     <HStack space="4" justifyContent="space-between">
      //       <VStack>
      //         <SearchLayout
      //           {...{
      //             search,
      //             setSearch,
      //             // minStringLenght: 3,
      //             notFoundMessage: "TYPE_TO_START_SEARCHING_LEARNING",
      //             onCloseSearch: setSearchState,
      //           }}
      //         ></SearchLayout>
      //       </VStack>
      //     </HStack>
      //   </Link>
      // }
      _subHeader={{ bg: "rgb(248, 117, 88)" }}
      _footer={{
        menues: [
          {
            title: "Search",
            icon: "SearchLineIcon",
            route: "/contents",
          },
          {
            title: "Contents",
            icon: "BookOpenLineIcon",
            route: "/all",
          },
          {
            title: "Connections",
            icon: "TeamLineIcon",
            route: "/addConnections",
          },
          {
            title: "Profie",
            icon: "AccountCircleLineIcon",
            route: "/profile",
          },
        ],
      }}
    >
      <Box textAlign="center" padding="10">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              style={{
                padding: "10px 10px 20px 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Link underline="hover" color="#004367" href="/">
                Direct Connect
              </Link>
              <Link
                underline="hover"
                href=""
                aria-current="page"
                color="#484848"
              >
                My Connections
              </Link>
            </Breadcrumbs>
          </div>
          {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <input type="text" placeholder="Search..." style={{ flex: 1, marginRight: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CACACA' }} />
      <button style={{ padding:'11px 16px 11px 16px', borderRadius: '4px', backgroundColor: '#004367', color: 'white', border: '1px', cursor: 'pointer' ,fontSize:'12px'}}>Search</button>
    </div> */}
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
                    // onNewAdd();
                    handleSearch();
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" style={{ padding: "0" }}>
              {invitationAcceptedUsers &&
                invitationAcceptedUsers.result &&
                invitationAcceptedUsers.result.response.content &&
                invitationAcceptedUsers.result.response.content.map((item) => (
                  <List sx={{}} style={{ color: "green" }}>
                    <ListItem>
                      <ListItemText
                        primary={"" + item.firstName + item.lastName}
                        secondary="Designation"
                      />
                    </ListItem>
                    <TriggerButton
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => handleAcceptedChatOpen(item.userId)}
                      style={{ marginLeft: "90%" }}
                    >
                      Open chat
                    </TriggerButton>
                    <Modal open={isModalOpen} onClose={handleCloseModal}>
                      {/* Content of your modal */}
                      {/* Example content */}
                      <div>
                        <h2>Chat Modal</h2>
                        <p>This is the chat modal content.</p>
                        <button onClick={handleCloseModal}>Close</button>
                      </div>
                    </Modal>
                    {/* <TriggerButton
                      type="button"
                      onClick={() => handleAcceptedChatOpen(item.userId)}
                    >
                      Open chat
                    </TriggerButton> */}
                    <Divider />

                    {/* <ListItem>
                    <ListItemText
                      primary="Manisha Kapadnis"
                      secondary="Learner"
                    />
                  </ListItem>
                  <Divider />

                  <ListItem>
                    <ListItemText
                      primary="Charvi Upadhyay"
                      secondary="Commissioner"
                    />
                  </ListItem> */}
                  </List>
                ))}

              {invitationNotAcceptedUsers &&
                invitationNotAcceptedUsers.result &&
                invitationNotAcceptedUsers.result.response &&
                invitationNotAcceptedUsers.result.response.content.map(
                  (item) => (
                    <List sx={{}} style={{ color: "red" }}>
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
                  )
                )}
              {/* <TriggerButton type="button" onClick={handleOpen}>
                Open chat
              </TriggerButton> */}

              {invitationReceiverByUser &&
                invitationReceiverByUser.result &&
                invitationReceiverByUser.result.response &&
                invitationReceiverByUser.result.response.content.map((item) => (
                  <List sx={{}} style={{ color: "gray" }}>
                    <ListItem>
                      <ListItemText
                        primary={`${item.firstName}${
                          item.lastName ? ` ${item.lastName}` : ""
                        }`}
                        secondary="Designation"
                      />
                    </ListItem>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <TriggerButton
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => acceptChat(item.userId)}
                        // onClick={acceptChatInvitation(item.userId)}
                        style={{ marginRight: "10px" }}
                      >
                        Accept
                      </TriggerButton>
                      <TriggerButton
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => blockChat(item.userId)}
                        // onClick={blockChatInvitation(item.userId)}
                      >
                        Decline
                      </TriggerButton>
                    </div>

                    {/* <TriggerButton
                        type="button"
                        onClick={handleNotAcceptedChatOpen}
                      >
                        Open chat
                      </TriggerButton> */}
                    <Divider />
                  </List>
                ))}
              {/* <TriggerButton type="button" onClick={handleOpen}>
                Open chat
              </TriggerButton> */}
            </TabPanel>
            <List>
              {/* {userData.map((user, index) => (
                <React.Fragment key={index}>
                  <ListItem button onClick={() => handleOpenModal(user)}>
                    <ListItemText
                      primary={user.name}
                      secondary={user.designation}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))} */}
            </List>

            {/* <TabPanel value="2"> */}
            {/* <Filter /> */}
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: "100%", background: "#fff" }}
                options={gradeLevels}
                onChange={handleFilterChange}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by Name" />
                )}
              /> */}
            {/* {!isLoading && !error && (
                <div className="button" onClick={handleOpen}>
                  {userData.map((item) => (
                    <div key={item.id} onClick={() => handleUserClick(item)}>
                      <Box
                        sx={{ border: "1px solid", borderRadius: "lg", p: 4 }}
                      >
                        <Typography variant="body2" fontSize="small">
                          Name Surname: {item.firstName} {item.lastName}
                        </Typography>
                        <Typography variant="body2">Designation: </Typography>
                      </Box>
                    </div>
                  ))}
                  <div className="pagination">{pagination}</div>
                </div>
              )} */}

            {/* <div>  */}

            <TabPanel value="2">
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: "100%", background: "#fff" }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by Designation" />
                )}
              /> */}

              {userSearchData &&
                userSearchData.result &&
                userSearchData.result.response.content &&
                userSearchData.result.response.content.map((item) => (
                  <List
                    key={item.id} // Add key prop to each List element
                    sx={{}} // Add styling here if needed
                    style={{ color: "blue" }}
                    onClick={() => handleUserClick(item)}
                  >
                    <ListItem>
                      <ListItemText
                        primary={`${item.firstName}${
                          item.lastName ? ` ${item.lastName}` : ""
                        }`}
                        secondary="Designation"
                        onClick={handleOpen}
                      />
                    </ListItem>
                    <Divider />
                    <div className="pagination">{pagination}</div>
                    {/* {
                      <TriggerButton type="button" onClick={handleOpen}>
                        Open chat
                      </TriggerButton>
                    } */}
                  </List>
                ))}
              <div>
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={open}
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
                        <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                          Name Surname: {selectedUser?.firstName}
                          {selectedUser?.lastName}
                        </div>
                      )}
                      {selectedUser && (
                        <div
                          style={{ fontSize: "12px", paddingBottom: "10px" }}
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
                          {selectedUser.firstName} {selectedUser.lastName} is a
                          manager with the department of Revenue and taxes and
                          has actively contributed to the growth and
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
                        {/* Your chat UI components go here */}
                        <TextField
                          multiline
                          rows={4} // You can adjust the number of rows as needed
                          value={textValue}
                          onChange={handleTextareaChange}
                          placeholder="Enter your text here..."
                          fullWidth
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
                      <Box style={{ width: "50%" }}>
                        <Button
                          variant="outlined"
                          style={{
                            borderRadius: "10px",
                            color: "#004367",
                            padding: "10px 12px",
                            margin: "0 10px",
                            fontWeight: "500",
                            fontSize: "12px",
                            border: "solid 1px #004367",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Box>
                      <Box style={{ width: "50%" }}>
                        <Button
                          style={{
                            background: "#004367",
                            borderRadius: "10px",
                            color: "#fff",
                            padding: "10px 12px",
                            margin: "0 10px",
                            fontWeight: "500",
                            fontSize: "12px",
                          }}
                          onClick={showChat ? handleSendClick : toggleChat} // Call handleSendClick or toggleChat based on showChat state
                        >
                          {buttonText}
                        </Button>
                      </Box>
                    </Box>
                  </ModalContent>
                </Modal>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Layout>
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
