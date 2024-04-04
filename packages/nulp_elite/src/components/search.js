import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setUserData([]);

    const url = `http://localhost:3000/learner/user/v3/search`;
    const requestBody = {
      request: {
        filters: {
          status: "1",
          rootOrgId: "0130701891041689600",
        },
        query: searchQuery,
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
      setUserData(responseData.result.response.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = userData?.filter(
    (user) => user.name && user.name.includes(searchQuery)
  );

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column", // Added to align items vertically
      }}
    >
      <TextField
        label="Search for a user..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
        }}
      />
      <Button
        style={{
          padding: "11px 9px",
          borderRadius: "4px",
          backgroundColor: "#004367",
          color: "white",
          border: "1px",
          cursor: "pointer",
          fontSize: "12px",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
      {!isLoading && !error && (
        <List>
          {filteredUsers.map((user, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Name Surname: ${user.firstName} ${user.lastName}`}
                  secondary={`Designation: ${user.designation}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
    </Box>
  );
}
