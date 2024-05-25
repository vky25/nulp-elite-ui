import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const DrawerFilter = () => {
  const [state, setState] = React.useState({
    left: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  // const handleResize = () => {
  //   setIsMobile(window.innerWidth <= 767);
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      className="header-bg-blue p-10 filter-bx"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="d-flex jc-bw">
        <Box className="filter-title">Filter By:</Box>
        <Button type="button" className="viewAll">
          Clear all
        </Button>
      </Box>
      <Box className="filter-text mt-15">Content Type</Box>
      <List>
        <ListItem className="filter-ul-text">
          <FormControlLabel control={<Checkbox />} label="Courses" />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel control={<Checkbox />} label="Manual and SOPs" />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel control={<Checkbox />} label="Courses" />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel control={<Checkbox />} label="Manual and SOPs" />
        </ListItem>
      </List>
      <Box className="filter-text mt-15">Sub-domains</Box>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Search Sub-domain
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                {<SearchOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          }
          label="Search Sub-domain"
        />
      </FormControl>
      {/* <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      sx={{ width: "100%", background: "#fff" }}
      renderInput={(params) => <TextField  label="search" />}
    />             */}
      <List>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Energy & green building"
          />
        </ListItem>
        <ListItem className="filter-ul-text">
          <FormControlLabel
            control={<Checkbox />}
            label="Disaster Mangement and Resilience"
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        </Box>
      ) : (
        <Box className="header-bg-blue p-10 pl-18 filter-bx mb-20">
          <Box className="d-flex jc-bw" style={{ paddingTop: "10px" }}>
            <Box className="filter-title">Filter By:</Box>
            <Button type="button" className="viewAll">
              Clear all
            </Button>
          </Box>
          <Box className="filter-text mt-15 mb-15">Content Type</Box>
          <List>
            <ListItem className="filter-ul-text">
              <FormControlLabel control={<Checkbox />} label="Courses" />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Manual and SOPs"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel control={<Checkbox />} label="Courses" />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Manual and SOPs"
              />
            </ListItem>
          </List>
          <Box className="filter-text mt-15 mb-20">Sub-domains</Box>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Search Sub-domain
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    {<SearchOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Search Sub-domain"
            />
          </FormControl>
          {/* <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      sx={{ width: "100%", background: "#fff" }}
      renderInput={(params) => <TextField  label="search" />}
    />             */}
          <List>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Energy & green building"
              />
            </ListItem>
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={<Checkbox />}
                label="Disaster Mangement and Resilience"
              />
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
};

export default DrawerFilter;
