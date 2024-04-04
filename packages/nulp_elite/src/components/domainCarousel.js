import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function DomainCarousel({ domain }) {
  const containerRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, domain.length - 1));
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
   
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          gap: 1,
          py: 1,
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          '& > *': {
            scrollSnapAlign: 'center',
          },
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
      
        {domain.map((item, index) => (
          <Box key={index} orientation="horizontal" size="sm" variant="outlined" style={{display:'flex'}}>
              <Box style={{background:'#fff',padding:'10px',borderRadius:'10px',height:'45px',width:'45px',border:'solid 1px #E1E1E1'}}>
                <img src={require("../assets/swm.png")}  style={{width:'40px',objectFit:'contain'}} alt={item.name} />
                </Box>
            <Box sx={{ alignSelf:'center',padding:'0 19px 0 5px' }}>
              <Typography level="title-md">{item.name}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          px: 2,
        }}
      >
        <Button
          disabled={activeIndex === 0}
          onClick={handlePrev}
          startIcon={<NavigateBefore />}
          sx={{ alignSelf: 'center' }}
        >
          Prev
        </Button>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          {domain.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: activeIndex === index ? 'primary.main' : 'grey.500',
                cursor: 'pointer',
              }}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Box>
        <Button
          disabled={activeIndex === domain.length - 1}
          onClick={handleNext}
          endIcon={<NavigateNext />}
          sx={{ alignSelf: 'center' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
