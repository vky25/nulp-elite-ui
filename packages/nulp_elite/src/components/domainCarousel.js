import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

export default function DomainCarousel({ domain }) {
  const dotsToShow = 4; // Number of dots to display

  return (
   
   <Box style={{position:'relative'}}>
   
      
          <Carousel swipeable={false}
          draggable={false}
          showDots={dotsToShow === domain.length ? true : false} // Show dots only if there are more than 4 items
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">
                  {domain.map((domain, index) => (

          <Box key={index} orientation="horizontal" size="sm" variant="outlined" style={{display:'flex'}}>
              <Box style={{background:'#fff',padding:'10px',borderRadius:'10px',height:'45px',width:'45px',border:'solid 1px #E1E1E1'}}>
                <img src={require("../assets/swm.png")}  style={{width:'40px',objectFit:'contain'}} alt={domain.name} />
                </Box>
            <Box sx={{ alignSelf:'center',padding:'0 19px 0 5px' }} className="xs-hide">
              <Typography level="title-md" style={{fontSize:'12px'}}>{domain.name}</Typography>
            </Box>
          </Box>
                 ))}

          </Carousel>
          <Box className="leftshade xs-hide"></Box>
          <Box className="rightshade"></Box>

      
    </Box>
  );
}
