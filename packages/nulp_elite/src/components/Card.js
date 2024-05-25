import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "native-base";
import RandomImage from "../assets/cardRandomImgs.json";

export default function BoxCard({ items, index, onClick }) {
  const [imgUrl, setImgUrl] = React.useState();

  useEffect(() => {
    // const random = getRandomValue();
    console.log("random banner----", RandomImage.ImagePaths[index % 10 || 10]);
    setImgUrl(RandomImage.ImagePaths[index % 10 || 10]);
  }, []);
  // const randomImg = (i) => {
  // console.log("RandomImage--- ",RandomImage.ImagePaths[i % 10 || 10]);
  // setImgUrl(RandomImage.ImagePaths[i % 10 || 10]);
  // console.log("imgUrl--- ",imgUrl);
  // }
  // // Assuming 'data' is your JSON array
  // const randomItem = getRandomValue(data);
  //   // console.log(items.appIcon)
  //    // Function to select a random value from an array
  //  const getRandomValue = (array) => {
  //   console.log("RandomImage   --  ",RandomImage.ImagePaths )
  //   const randomIndex= RandomImage;
  //   // const randomIndex = Math.floor(Math.random() * RandomImage..length);
  //   console.log("randomIndex",randomIndex)

  //   // return array[randomIndex];
  //   return randomIndex;
  // };

  return (
    <Card className="cardBox" sx={{ position: "relative", cursor: "pointer" }}>
      <CardMedia
        sx={{
          height: 140,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          position: "relative",
          backgroundRepeat: "no-repeat",
          background:
            "linear-gradient(45deg, RGBA(28, 25, 25, 0.46) 7%, RGBA(20, 18, 18, 0.57) 45%)",
        }}
        image={
          imgUrl
            ? require(`./../assets/dummyCardImgs/${imgUrl}`)
            : require("../assets/card-bg.png")
        }
        title="green iguana"
      />
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "0",
          width: "100%",
          height: "141px",
          background:
            "linear-gradient(45deg, RGBA(28, 25, 25, 0.46) 7%, RGBA(20, 18, 18, 0.57) 45%)",
          zIndex: 999,
          margin: "0",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      ></div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          className="ribbonCard"
        >
          {items.primaryCategory && (
            <Box className="cardCourses"> {items.primaryCategory}</Box>
          )}
        </Typography>
        <Box className="card-img-container">
          <img
            src={items.appIcon ? items.appIcon : require("assets/default.png")}
            className="card-img"
          />
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="cardTitle mt-40"
        >
          {items.name}
        </Typography>
        <Typography
          variant="body2"
          color="#5B5B5B"
          style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
        >
          {items.organisation && (items.organisation.length = 1) && (
            <Box>{items.organisation[0]} </Box>
          )}
          {items.organisation && items.organisation.length > 1 && (
            <Box>
              {items.organisation[0]} + "+" + {items.organisation.length - 1}
            </Box>
          )}
        </Typography>
      </CardContent>

      {/* {items.board ||
      items.gradeLevel ||
      items.se_boards ||
      items.se_gradeLevels ? ( */}
      <div>
        <Divider></Divider>
        <Box className="my-10 textLeft">
          {(items.board || items.se_boards) && (
            <Button type="button" size="small" className="labelOne">
              {items.board || items.se_boards}
            </Button>
          )}
          {(items.gradeLevel || items.se_gradeLevels) && (
            <Button type="button" size="small" className="labeltwo">
              {" "}
              {items.gradeLevel || items.se_gradeLevels}
            </Button>
          )}
        </Box>
      </div>
      {/* ) : null} */}
    </Card>
  );
}
