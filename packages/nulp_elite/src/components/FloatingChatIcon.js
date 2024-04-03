import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import HeadsetIcon from '@mui/icons-material/Headset';
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  link: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: 999,
    background:'blue', // Ensures the icon appears above other elements
  },
}));


const FloatingChatIcon = () => {
  const classes = useStyles();

  return (
    <Link href="" color="primary" aria-label="chat" className="chatIcon">
      <HeadsetIcon style={{verticalAlign: 'middle',fontSize:'28px',paddingTop:'15px'}}/>
    </Link>
  );
};

export default FloatingChatIcon;
