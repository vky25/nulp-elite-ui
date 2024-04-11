import ReactDOM from "react-dom";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import image from "../../assets/bg.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
const { t } = useTranslation();
const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};

  return (
    <>
      <Container
        maxWidth="sm"
        className="register"
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
        <Typography style={{fontWeight:'600',fontSize:'16px',marginBottom:'20px'}}>{t('REGISTER')}</Typography>


        <Box py={1}>
          <CssTextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
          />
        </Box>
        <FormControl fullWidth style={{marginTop:'10px'}}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
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
            {t('CONTINUE')}
          </Button>
        </Box>
        <Box py={1}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "400",
              fontSize: "12px",
              marginTop:"10px"
            }}
          >
            {t('ALREADY_HAVE_AN_ACCOUNT')} <Link href="">{t('LOG_IN')}</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Registration />, rootElement);

export default Registration;
