// Profile.js

import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer"; 
import Header from "components/header"; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import Grid from '@mui/material/Grid';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import data from "../../assets/userDetail.json";
import FloatingChatIcon from '../../components/FloatingChatIcon';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import Chip from '@mui/material/Chip';
import Button from "@mui/material/Button";



const Profile = () => {
  const { t } = useTranslation();
  const progressValue = 60; // Example value, you can set this dynamically based on your progress


  return (
    <div>
   
          <Header/>

          <Container maxWidth="md" role="main" className="container-pb">

      <Box textAlign="center" padding="10">
      <Card sx={{marginTop:'10px', padding:'10px',boxShadow: '0px 4px 4px 0px #00000040' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                <Box style={{display:'flex',alignItems:'center'}}><PersonIcon style={{paddingRight:'10px',fontSize:'28px'}}/>{t("ABOUT_ME")} </Box>
                <ModeEditIcon/>
              </Box>
                 <Box sx={{ display: 'flex', flexDirection: 'row',padding:'20px 10px' }}> 

                  {/* Use require for the image source */}
                  <img src={require("../../assets/blank.png")} style={{width:'20%'}} />

                  <CardContent style={{textAlign:'left', paddingTop:'0'}} >
                     <Typography component="div" variant="h5" style={{color:'#004367', fontSize:'16px',fontWeight:'600'}}>
                     {data.result.response.firstName} {data.result.response.lastName}
                    </Typography>
 
                    <Typography variant="subtitle1"  color="text.secondary" component="div" style={{ fontSize:'14px',padding:'10px 0',display:'flex'}}>
                    {data.result.response.roles.map((role) => (
                       <Chip label={role.role} color="primary" variant="outlined" style={{marginRight:'10px'}} />
                    //  <Box> {role.role} </Box>
                      ))} 

                    </Typography>
                      <Typography variant="subtitle1"  color="text.secondary" component="div" style={{ fontSize:'14px',padding:'10px 0',display:'flex'}}>
                        <Box style={{fontWeight:'600',paddingRight:'10px'}}> ID: </Box> {data.result.response.organisations.orgName}
                    </Typography>

                    {/* Access profile details from the role object */}
                    <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize:'14px',padding:'10px 0',display:'flex'}}>
                    <Box style={{fontWeight:'600',paddingRight:'10px'}}>Categories:   </Box> {data.result.response.framework.board}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize:'14px',padding:'10px 0',display:'flex'}}>
                    <Box style={{fontWeight:'600',paddingRight:'10px'}}> Sub-Categories:  </Box>  {data.result.response.framework.gradeLevel}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize:'14px',padding:'10px 0',display:'flex'}}>
                    <Box style={{fontWeight:'600',paddingRight:'10px'}}> Language:   </Box> {data.result.response.framework.board}
                    </Typography>
                    <Button
            style={{
              background: "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "4px 10px",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            Edit
          </Button>
                  </CardContent>

                  

                </Box>
          </Card>

    <Grid container spacing={2} style={{padding:'10px 0'}}>
        <Grid item xs={12} md={6}>
        <Card sx={{marginTop:'10px', padding:'10px',boxShadow: '0px 4px 4px 0px #00000040' ,display:'flex',alignItems:'baseline'}}>
          <Box style={{background:'#004367',color:'#fff', padding:'40px',margin:'-10px',borderTopRightRadius:'250px',borderBottomRightRadius:'250px'}}>
            <LibraryAddCheckOutlinedIcon/>
        </Box>

          <Box style={{paddingLeft:'20px'}}>
          {t("CONTINUE_LEARNNG")}
          </Box>
                 
    </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card sx={{marginTop:'10px', padding:'10px',boxShadow: '0px 4px 4px 0px #00000040' ,display:'flex',alignItems:'baseline'}}>
          <Box style={{background:'#004367',color:'#fff', padding:'40px',margin:'-10px',borderTopRightRadius:'250px',borderBottomRightRadius:'250px'}}>
            <ReceiptLongOutlinedIcon/>
        </Box>

          <Box style={{paddingLeft:'20px'}}>
          {t("DOWNLOAD_CERTIFICATES")}
          </Box>
                 
    </Card>
        </Grid>
       
      </Grid>

    <Card sx={{marginTop:'10px', padding:'10px' }}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
          <Box style={{display:'flex',alignItems:'center'}}><TimelapseOutlinedIcon style={{paddingRight:'10px'}}/>{t("LEARNING_TIME")}</Box>
        </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row',padding:'20px 10px', fontSize:'14px',color:'#484848'}}>
            <Box style={{background:'#A7E0FF',padding:'20px 50px',borderRadius:'20px',marginRight:'20px'}}>
              {t("COURSES")}<br/>
              <Typography variant="h7"  style={{fontWeight:'700',margin:'9px 0',display:'block'}}>
       14h 20m
      </Typography>
            </Box>
            <Box style={{background:'#f7cfb6',padding:'20px 50px',borderRadius:'20px'}}>
            {t("WEBINARS")}<br/>
              <Typography variant="h7"   style={{fontWeight:'700',margin:'9px 0',display:'block'}}>
              10h 15m
      </Typography>
            </Box>
             
          </Box>
            
            
            </Box>
     
    </Card>

    <Card sx={{margin:'10px 0 40px 0', padding:'10px' }}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between',padding:'0 0 30px 0' }}>
          <Box style={{display:'flex',alignItems:'center'}}><EmojiEventsOutlinedIcon style={{paddingRight:'10px'}}/> {t("PERFORMANCE")}</Box>
        </Box>

        <Grid container spacing={2}>
        <Grid item xs={6} md={3} className="circular" style={{paddingRight:'0',textAlign:'right'}}>
        <CircularProgressWithLabel value={progressValue} className="crcular" style={{width:'80px',height:'80px'}} />
        </Grid>
        <Grid item xs={6} md={3} className="circular">

        <Typography variant="h7"   style={{margin:'9px 0',display:'block',textAlign:'left'}}>
        Certifications Received
            </Typography>
        </Grid>
        <Grid item xs={6} md={3} style={{paddingRight:'0',textAlign:'right'}}>
        <CircularProgressWithLabel value={progressValue} />
        </Grid>
        <Grid item xs={6} md={3}>

        <Typography variant="h7"   style={{margin:'9px 0',display:'block',textAlign:'left'}}>
        Courses than last month
            </Typography>
        </Grid>

</Grid>
            
            
            </Box>
     
    </Card>
      </Box>
      </Container>
      <FloatingChatIcon />

      <Footer/>

  </div>

  );
};

export default Profile;
