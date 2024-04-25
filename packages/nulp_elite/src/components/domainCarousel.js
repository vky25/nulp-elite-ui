import React, { useState, useEffect } from 'react'
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import domainWithImage from "../assets/domainImgForm.json";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};


export default function DomainCarousel({ domains ,onSelectDomain}) {

  const dotsToShow = 4; // Number of dots to display
  const [isActive, setIsActive] = useState(false);
  const [itemsArray, setItemsArray] = useState([]);
  const [data, setData] = React.useState();
  const [activeStates, setActiveStates] = useState(() => (
    domains.map(() => false) // Initialize all items as inactive
  ));
  useEffect(() => {
    domains.map((term) => {
      if (domainWithImage) {
        domainWithImage.result.form.data.fields.map((imgItem) => {
          if ((term && term.code) === (imgItem && imgItem.code)) {
            term["image"] = imgItem.image ? imgItem.image : "";
            pushData(term);
            itemsArray.push(term);
          }
        });
      }
    });
    setData(itemsArray);
    console.log("itemsArray---",itemsArray)
    console.log("data---",data)
  }, []);
    // Function to push data to the array
    const pushData = (term) => {
      setItemsArray((prevData) => [...prevData, term]);
    };
  const handleDomainClick = (query,index) => {
    const newActiveStates = [...activeStates]; // Create a copy of activeStates
    newActiveStates[index] = !newActiveStates[index]; // Toggle the active state at the clicked index
    setActiveStates(newActiveStates);
    onSelectDomain(query);
    // setIsActive(!isActive);
  };
  return (
   
   <Box style={{position:'relative'}}>
   
      
          <Carousel swipeable={false}
          draggable={false}
          showDots={["mobile"]} // Show dots only if there are more than 4 items
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">
                  {itemsArray && itemsArray.map((domain, index) => (

          <Box  className={`my-class ${activeStates[index] ? 'carousel-active-ui' : ''}`} onClick={(e) => handleDomainClick(domain.code,index)}  key={index} orientation="horizontal" size="sm" variant="outlined" style={{display:'flex'}}>
              <Box className="imgBorder" style={{background:'#fff',padding:'10px',borderRadius:'10px',height:'45px',width:'45px'}}>
              {/* {(domain.image != undefined) && <img src={require(baseImgUrl+domain.image)}  style={{width:'40px',objectFit:'contain'}} alt={domain.name} />}
                {(domain.image == undefined)&& <img src={require("../assets/swm.png")}  style={{width:'40px',objectFit:'contain'}} alt={domain.name} />} */}
                <img
                        src={require(`../assets/domainImgs${domain.image}`)}
                        style={{width:'40px',objectFit:'contain'}} alt={domain.name}
                      />
                {/* <img src={require("../assets/swm.png")}  style={{width:'40px',objectFit:'contain'}} alt={domain.name} /> */}
                </Box>
            <Box sx={{ alignSelf:'center',padding:'0 19px 0 5px' }} className="xs-hide">
              <Typography level="title-md" style={{fontSize:'12px'}}>{domain.name}</Typography>
            </Box>
          </Box>
                 ))}

          </Carousel>
          <Box className="leftshade"></Box>
          <Box className="rightshade"></Box>

      
    </Box>
  );
}
