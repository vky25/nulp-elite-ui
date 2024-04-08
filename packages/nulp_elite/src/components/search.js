import React, { useState } from "react";
import { Button } from "@mui/base/Button";
import Box from "@mui/material/Box";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    onSearch(query);
  };
  <Box style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
    <input
      type="text"
      // value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      style={{
        width: "100%",
        flex: 1,
        marginRight: "0.5rem",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #CACACA",
      }}
    />
    <Button
      onClick={handleSearchClick}
      style={{
        padding: "11px 9px",
        borderRadius: "4px",
        backgroundColor: "#004367",
        color: "white",
        border: "1px",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      Search
    </Button>
  </Box>;
}

export default Search;
