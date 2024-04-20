import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Alert } from "@mui/material";
import io from "socket.io-client";
import * as util from "../../services/utilService";
const axios = require("axios");
import { Navigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";

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

const socket = io("http://localhost:3000");

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
  useEffect(() => {
    const _userId = util.userId();
    setLoggedInUserId(_userId);
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      fetchChats();
    }

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/directConnect/get-chats?sender_id=${loggedInUserId}&receiver_id=${receiverUserId}&is_accepted=true`,
        {
          withCredentials: true,
        }
      );
      // getUserDetails([loggedInUserId, response?.data?.result[0]?.receiver_id]);
      setMessages(response.data.result || []);
      // // console.log("getUserChat", responseData.result);
      // const userChats = response.data.result.filter(
      //   (res) =>
      //     (res.sender_id === loggedInUserId &&
      //       res.receiver_id === receiverUserId) ||
      //     (res.sender_id === receiverUserId &&
      //       res.receiver_id === loggedInUserId)
      // );
      // setUserChat(userChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        socket.emit("message", {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
          message: message,
        });
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
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessage("");
        fetchChats();
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  };
  const getUserDetails = async (userIds) => {
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
      console.log(responseData);
    } catch (error) {
      console.log("error", error);
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

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHeader}>
        <span>{dataStore.fullName || localStorage.getItem("chatName")} </span>{" "}
      </div>
      <Alert severity="info" style={{ textAlign: "left" }}>
        Your chat will be disappear after 7 Days.
      </Alert>
      <div className={classes.chat}>
        {messages.map((msg, index) => (
          <div key={index}>
            <div style={{ textAlign: "center" }}>
              {" "}
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
      <div className={classes.messageInput}>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Message;
