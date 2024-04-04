import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Filter = ({ options, label, onChange }) => {
  const handleFilterChange = (event, selectedValues) => {
    onChange(selectedValues);
  };

  return (
    <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: "100%", background: "#fff" }}
      onChange={handleFilterChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default Filter;

