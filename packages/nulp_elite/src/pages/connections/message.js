import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as util from "../../services/utilService";
const axios = require("axios");
import { useNavigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import BlockIcon from "@mui/icons-material/Block";
import SendIcon from "@mui/icons-material/Send";

const moment = require("moment");
const timezone = require("moment-timezone");
const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    background: "#fff",
  },
  chatHeader: {
    padding: "8px 16px",
    backgroundColor: "#e7e9e9",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
  },
  messageInput: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#ffffff",
    marginTop: "10px",
  },
  senderMessage: {
    borderRadius: "5px",
    padding: "8px",
    margin: "15px 0",
    textAlign: "right",
    background: "linear-gradient(180deg, #004367 0%, #102244 100%)",
    color: "#fff",
  },
  receiverMessage: {
    margin: "4px 0",
    padding: "8px",
    clear: "both",
    alignSelf: "flex-end",
    display: "table",
    borderRadius: "5px",
    color: "#212121",
    backgroundColor: "#F1F1F1",
  },
}));

const Message = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const dataStore = useStore((state) => state.data);
  const receiverUserId = dataStore.userId || localStorage.getItem("userId");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // State to track if user is blocked

  useEffect(() => {
    const _userId = util.userId();
    setLoggedInUserId(_userId);
  }, []);
  useEffect(() => {
    if (loggedInUserId) {
      // Fetch block user status when component mounts
      fetchBlockUserStatus();
      fetchChats();
      updateMessage();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId && !isBlocked) {
      const intervalId = setInterval(fetchChats, 5000);
      return () => clearInterval(intervalId);
    }
  }, [loggedInUserId, isBlocked]);

  const fetchBlockUserStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/directConnect/get-block-user?sender_id=${loggedInUserId}&receiver_id=${receiverUserId}`,
        {
          withCredentials: true,
        }
      );
      setIsBlocked(response.data.result.length > 0); // Update isBlocked state based on API response
    } catch (error) {
      console.error("Error fetching block user status:", error);
    }
  };

  const fetchChats = async () => {
    try {
      // Check if the user is not blocked before fetching chats
      if (!isBlocked) {
        const response = await axios.get(
          `http://localhost:3000/directConnect/get-chats?sender_id=${loggedInUserId}&receiver_id=${receiverUserId}&is_accepted=true`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.result || []);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        console.log("Sending message:", message);

        await axios.post(
          "http://localhost:3000/directConnect/send-chat",
          {
            sender_id: loggedInUserId,
            receiver_id: receiverUserId,
            message: message,
            sender_email: "sender@gmail.com",
            receiver_email: "receiver@gmail.com",
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage("");
        fetchChats(); // Fetch messages after sending a message
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  };

  const updateMessage = async () => {
    try {
      console.log("updating message:", message);

      const data = await axios.put(
        "http://localhost:3000/directConnect/update-chat",
        {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
          is_read: true,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("------333333333333333333----", data);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const getTimeAgo = (timestamp) => {
    const timeZone = "Asia/Kolkata";
    const date = moment(timestamp).utc();
    const now = moment();
    const diffHours = now.diff(date, "hours");

    if (diffHours < 24) {
      return "Today";
    } else if (diffHours < 48) {
      return "Yesterday";
    } else {
      const data = date.tz(timeZone).format("D MMMM YYYY");
      return data;
    }
  };

  const getTime = (timestamp) => {
    const data = moment.utc(timestamp).format("hh:mm a");
    return data;
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleBlockUser = () => {
    handleDialogOpen();
  };
  const handleBlockUserConfirmed = async () => {
    try {
      console.log("Blocking User");

      await axios.post(
        "http://localhost:3000/directConnect/block-user",
        {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
          reason: reason,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReason("");
      setDialogOpen(false);
      console.log("User blocked successfully!");
      // Reload the page after blocking the user
      window.location.reload();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
    handleMenuClose(); // Close the menu after the action is completed
  };

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHeader}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIcon />
          <Box
            sx={{ fontSize: "22px", fontWeight: "600", paddingLeft: "10px" }}
          >
            {dataStore.fullName || localStorage.getItem("chatName")}
          </Box>
        </IconButton>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {/* <BlockIcon
            onClick={handleBlockUser}
            disabled={isBlocked}
            style={{ paddingRight: "10px", cursor: "pointer" }}
          />
          Block */}
          {!isBlocked && (
            <IconButton
              onClick={handleBlockUser}
              style={{ paddingRight: "10px", cursor: "pointer" }}
            >
              <BlockIcon />
              Block
            </IconButton>
          )}
        </Box>

        {/* <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton> */}
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleBlockUser} disabled={isBlocked}>
            <BlockIcon />
            Block
          </MenuItem>
        </Menu> */}
      </div>
      <Dialog open={dialogOpen} maxWidth="lg" onClose={handleDialogClose}>
        <DialogTitle>Block User</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            autoFocus
            minRows={6}
            maxRows={4}
            margin="dense"
            id="reason"
            label="Reason for blocking"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
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
          >
            Cancel
          </Button>
          <Button
            onClick={handleBlockUserConfirmed}
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
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>

      <Alert severity="info" style={{ margin: "10px 0" }}>
        Your chat will disappear after 7 Days.
      </Alert>
      <div className={classes.chat}>
        {messages.map((msg, index) => (
          <div key={index}>
            <div style={{ textAlign: "center" }}>
              {index === 0 ||
              getTimeAgo(msg.timestamp) !==
                getTimeAgo(messages[index - 1].timestamp) ? (
                <div>{getTimeAgo(msg.timestamp)}</div>
              ) : null}
            </div>
            <div
              className={
                msg.sender_id === loggedInUserId
                  ? `${classes.senderMessage} ${classes.message}`
                  : `${classes.receiverMessage} ${classes.message}`
              }
            >
              <div>{msg.message}</div>
              <div>{getTime(msg.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
      {isBlocked ? (
        <Alert severity="warning" style={{ marginBottom: "10px" }}>
          User blocked. You cannot send messages to this user.
        </Alert>
      ) : (
        <>
          <div className={classes.messageInput}>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              fullWidth
              style={{ background: "#fff", border: "none" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isBlocked} // Disable input field if user is blocked
            />
            <Button
              variant="contained"
              style={{ padding: "15px" }}
              color="primary"
              onClick={sendMessage}
              disabled={isBlocked} // Disable send button if user is blocked
            >
              <SendIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
