import React, { useState } from "react";
import { Button } from "@mui/base/Button";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function SearchBox({ onSearch, domainquery }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  console.log(domainquery);

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <Box
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <input
        type="text"
        value={query || domainquery}
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
        {t("SEARCH")}
      </Button>
    </Box>
  );
}
