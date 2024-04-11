import ReactDOM from "react-dom";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import image from "../../assets/bg.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
      border: "1px solid #004367",
      borderRadius: "12px",
      width: "100%",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const Registration = () => {
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <Box my={4}>
          <img src={require("../../assets/logo.png")} />
        </Box>
        <Box py={1}>
          <CssTextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box py={2}>
          <CssTextField
            id="outlined-basic"
            label="Enter your Email ID"
            variant="outlined"
            size="small"
          />
        </Box>
        <Box py={1}>
          <CssTextField
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            size="small"
          />
        </Box>
        <Box py={2}>
          <CssTextField
            id="outlined-password-input"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            size="small"
          />
        </Box>
        <Box pt={4}>
          <Button
            style={{
              background: "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 71px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Submit
          </Button>
        </Box>
        <Box py={1}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            Already have an account? <Link href="">Log In</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Registration />, rootElement);

export default Registration;
