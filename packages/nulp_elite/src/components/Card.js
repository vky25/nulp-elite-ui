import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Opacity } from "@mui/icons-material";


export default function BoxCard({  }) {
  
  return (
    <Card sx={{ maxWidth: 345, position:'relative' }}>
      <CardMedia
        sx={{ height: 140,position: 'relative', opacity: 0.6 }}
        image={require("../assets/card-bg.png")}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{position:'absolute',color:'#fff',fontWeight:'500',fontSize:'16px', top:'30px'}}>
        Enable GIS monitoring for SWM
        </Typography>
        <Typography gutterBottom variant="h7" component="div" style={{position:'absolute',top:'50px',right:'10px'}}>
        Courses
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Engineering Staff College India
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">SWM</Button>
        <Button size="small">Sanitation</Button>
      </CardActions>
    </Card>
  );
}
