import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import DevicesIcon from "@mui/icons-material/Devices";
import WebIcon from "@mui/icons-material/Web";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import  { useState } from 'react';


function Header() {
  // const [age, setAge] = React.useState("");
  const { t } = useTranslation();
  const [language, setLanguage] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 
  

  return (
    <>
      <Box
        className="xs-hide"
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box style={{ padding: "10px" }}>
          <DevicesIcon
            style={{
              padding: "0 10px",
              verticalAlign: "middle",
              color: "#424242",
            }}
          />
          <Link
            href="#"
            underline="none"
            style={{
              color: "#424242",
              fontSize: "16px",
              borderRight: "solid 1px #424242",
              paddingRight: "10px",
            }}
          >
           {t("MAIN_CONTENT")}{" "}
          </Link>
        </Box>
        <Box
          style={{
            padding: "0 10px",
            color: "#424242",
            fontSize: "16px",
            borderRight: "solid 1px #424242",
          }}
        >
          <Link
            href="#"
            underline="none"
            style={{ color: "#424242", fontSize: "16px", paddingRight: "10px" }}
          >
            {" "}
            +A
          </Link>{" "}
          <Link
            href="#"
            underline="none"
            style={{ color: "#424242", fontSize: "16px", paddingRight: "10px" }}
          >
            A -{" "}
          </Link>
          <Link
            href="#"
            underline="none"
            style={{ color: "#424242", fontSize: "16px", paddingRight: "10px" }}
          >
            A
          </Link>{" "}
        </Box>
        <Box
          style={{
            padding: "0 10px",
            color: "#424242",
            fontSize: "14px",
            borderRight: "solid 1px #424242",
          }}
        >
          <WebIcon style={{ padding: "0 10px", verticalAlign: "middle" }} />
          <Link
            href="#"
            underline="none"
            style={{ color: "#424242", fontSize: "16px" }}
          >
            {t("SCREEN_READER")}{" "}
          </Link>
        </Box>
        
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            
            
    </FormControl>
        </Box>

      <AppBar position="sticky" style={{ background: "#fff" }}>
        <Container
          maxWidth="xl"
          style={{ paddingLeft: "0", paddingTop: "10px", paddingBottom: "8px" }}
        >
          <Toolbar disableGutters>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              className="lg-hide"
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, paddingLeft: "20px" }}>
              <img
                src={require("../assets/logo.png")}
                style={{ maxWidth: "100%" }}
              />
            </Box>

            <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                    <MenuItem>
                      <Link href="/all" textAlign="center">{t('CONTENT')}</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/addConnections" textAlign="center">{t('CONNECTIONS')}</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/profile" textAlign="center">{t('PROFILE')}</Link>
                    </MenuItem>
                </Menu>
            </Box>
            {/* <InputLabel  id="language-select-label">
              {" "}
              {t("LANGUAGE")}
            </InputLabel> */}
 {/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
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
    </Box> */}
    <Box sx={{ minWidth: 120 }}>
    <InputLabel id="language-select-label">Select language</InputLabel>

            <Select
  labelId="language-select-label"
  id="language-select"
  className="language"
  style={{ border: "none" }}
  label="select language"
  

  startIcon={<LanguageIcon />}
  onChange={(event) => changeLanguage(event.target.value)}
  inputProps={{ 'aria-label': 'Select Language' }}

><MenuItem value="" disabled>
        Select Language
      </MenuItem>
             
  <MenuItem value="en"> {/* Changed value to language code */}
    {t("ENGLISH")}
  </MenuItem>
  <MenuItem value="hi">
    {t("HINDI")}
  </MenuItem>
</Select>
</Box>


            <Box
              className="xs-hide"
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 3,
                paddingLeft: "40px",
              }}
            >
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>

            <Box
              className="xs-hide"
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Link
                href="/all"
                underline="none"
                style={{
                  my: 2,
                  color: "#484848",
                  display: "block",
                  margin: "0 20px",
                }}
              >
                <EditNoteOutlinedIcon
                  style={{ padding: "0 10px", verticalAlign: "middle" }}
                />
                {t('CONTENT')}
              </Link>
              <Link
                href="/addConnections"
                underline="none"
                style={{
                  my: 2,
                  color: "#484848",
                  display: "block",
                  margin: "0 20px",
                }}
              >
                <GroupsOutlinedIcon
                  style={{ padding: "0 10px", verticalAlign: "middle" }}
                />
                {t('CONNECTIONS')}
              </Link>
              {/* <Link href="#" style={{ my: 2, color: 'black', display: 'block' }}> <AccountCircleOutlinedIcon />Profile</Link> */}

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleOutlinedIcon
                    style={{ padding: "0 10px", verticalAlign: "middle" }}
                  />{" "}
                  {t('PROFILE')}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem>
                    <Link href="/profile" textAlign="center">{t('PROFILE')}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/help" textAlign="center">{t('HELP')}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/logoff" textAlign="center">{t('LOGOUT')}</Link>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
