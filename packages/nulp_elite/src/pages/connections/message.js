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
} from "@mui/material";
import * as util from "../../services/utilService";
const axios = require("axios");
import { useNavigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import BlockIcon from "@mui/icons-material/Block";

const moment = require("moment");
const timezone = require("moment-timezone");
const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    padding: "16px",
    backgroundColor: "#f0f0f0",
  },
  chatHeader: {
    padding: "8px 16px",
    backgroundColor: "#1976d2",
    color: "#ffffff",
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
  },
  senderMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#d6e4ff",
    borderRadius: "4px",
    padding: "8px",
    margin: "4px 0",
    maxWidth: "70%",
    textAlign: "right",
  },
  receiverMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "8px",
    margin: "4px 0",
    maxWidth: "70%",
    textAlign: "left",
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
    const timeZone = "Asia/Kolkata";
    const date = moment(timestamp).tz(timeZone);
    const data = date.format("HH:mm:ss");
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
        </IconButton>
        <span>{dataStore.fullName || localStorage.getItem("chatName")}</span>
        <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleBlockUser} disabled={isBlocked}>
            <BlockIcon />
            Block
          </MenuItem>
        </Menu>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Block User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason for blocking"
            type="text"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBlockUserConfirmed} color="primary">
            Block
          </Button>
        </DialogActions>
      </Dialog>

      <Alert severity="info" style={{ marginBottom: "10px" }}>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isBlocked} // Disable input field if user is blocked
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={isBlocked} // Disable send button if user is blocked
            >
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Message;