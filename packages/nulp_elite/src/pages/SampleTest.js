import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const categories = ["Oliver", "Van", "April", "Ralph", "Omar", "Carlos"];
const languages = ["Hindi", "Marathi", "English", "Urdu"];

export default function SampleTest() {
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState([]);
  const [language, setLanguage] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submittedValues, setSubmittedValues] = React.useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const getStyles = (name, selectedNames) => {
    return {
      fontWeight:
        selectedNames.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleSubmit = () => {
    const submittedValues = {
      category,
      subCategory,
      language,
    };

    // Perform any further actions here, such as sending data to a server
    console.log("Submitted values:", submittedValues);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            To discover relevant content update the following details:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your preferences
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              style={{ marginBottom: "30px" }}
            >
              <MenuItem value="Category 1">Category 1</MenuItem>
              <MenuItem value="Category 2">Category 2</MenuItem>
              <MenuItem value="Category 3">Category 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="first-name-label">Sub-Category</InputLabel>
            <Select
              labelId="first-name-label"
              id="first-name-select"
              multiple
              value={subCategory}
              onChange={handleSubCategoryChange}
              renderValue={(selected) => selected.join(", ")}
              style={{ marginBottom: "30px" }}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, subCategory)}
                >
                  {" "}
                  <Checkbox checked={subCategory.indexOf(name) > -1} />
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="last-name-label">Language</InputLabel>
            <Select
              labelId="last-name-label"
              id="last-name-select"
              multiple
              value={language}
              onChange={handleLanguageChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {languages.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, language)}
                >
                  {" "}
                  <Checkbox checked={language.indexOf(name) > -1} />
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
