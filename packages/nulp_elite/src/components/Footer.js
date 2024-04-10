import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useTranslation } from "react-i18next";
import { useParams,useNavigate } from "react-router-dom";

// const styles = {
//   BottomNavigation: {
//     width: '100%',
//     position: 'fixed',
//     bottom: 0,
//   },
// };

export default function Footer() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const pages = ['Content', 'Connections', 'Profile'];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  return (
    <>
    <Container maxWidth="xl" className='lg-hide'>
    <Box sx={{  position: 'fixed', bottom: 0, left: 0, right: 0 ,width:'100%',zIndex:'9999' }}>
  <BottomNavigation
    sx={{ width: '100%', display: 'flex', position: 'relative',paddingTop:'10px' }}
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
 <BottomNavigationAction onPress={() => { alert("EEEE"); navigate('/search/domainList') }} label={t("SEARCH")} className='navigateActive' icon={<SearchSharpIcon />} />
    <BottomNavigationAction onPress={() => { navigate('/view-all/:category') }} label={t("CONTENTS")} icon={<EditNoteOutlinedIcon />} />
    <BottomNavigationAction onPress={() => { navigate('/connections/myConnections') }} label={t("CONNECTION")} icon={<GroupsOutlinedIcon />} />
    <BottomNavigationAction onPress={() => { navigate('/profile/profile') }} label={t("PROFILE")} icon={<AccountCircleOutlinedIcon />} />
  </BottomNavigation>
</Box>

</Container>
<Container className='xs-hide' maxWidth="xl" style={{background:'#2D2D2D', color:'#fff',padding:'30px 15px 20px 15px'}}>
  {/* <Box>dfgdfgsg */}
  

<Grid container spacing={2} className='footer'>
  <Grid item xs={8} md={3} style={{fontSize:'14px', lineHeight:'2.4',fontWeight:'400'}}>
  <Link underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>NIUA</Link>
    <Link underline="none" href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>MoHUA</Link><br/>
    <Link  underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>About Us</Link>
    <Link underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>Contact Us</Link>
    <Link underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>FAQs</Link>
    <Link underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff',margin:'0 8px'}}>Log Out</Link>

  </Grid>
  <Grid item xs={4} md={3} style={{fontSize:'14px', lineHeight:'2.4',fontWeight:'400'}}>
  <Link underline="none"  href="#" style={{padding:'10px 0 2px',color:'#fff', fontSize:'14px'}}>Center for Digital Governance</Link><br/>
    <Link  underline="none" href="#" style={{padding:'10px 0 2px',color:'#fff', fontSize:'14px'}}>National Urban Digital Mission</Link>
</Grid>
  <Grid item xs={4} md={3} style={{fontSize:'14px', lineHeight:'1.5', fontWeight:'400'}}>
  <Box style={{fontSize:'14px',fontWeight:'700'}}>Nodal Ministry:</Box>
  Ministry of Housing and Urban Affairs, Government of India<br/>
  Nirman Bhawan, New Delhi- 110001, INDIA
</Grid>
      <Grid item xs={8} md={3} style={{fontSize:'14px', lineHeight:'1.5',fontWeight:'400'}}>
         <Box style={{fontSize:'14px',fontWeight:'700'}}> Anchor Institute:</Box>
        National Institute of Urban Affairs<br/>
        1st Floor, Core 4B, India Habitat Centre, Lodhi Road, New Delhi - 110003, INDIA<br/>

        Phone: (+91 11) 24617517, 24617543, 24617595
    </Grid>
</Grid>
</Container>

</>
  );
}