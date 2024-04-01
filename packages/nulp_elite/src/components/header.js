import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';
import DevicesIcon from '@mui/icons-material/Devices';
import WebIcon from '@mui/icons-material/Web';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next";
import{changeLanguage} from "i18next";



const pages = ['Content', 'Connections', 'Profile'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar( ) {
  const [age, setAge] = React.useState('');
  const { t } = useTranslation();


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
<>
<Box className='xs-hide' style={{background:'#fff',borderBottom:'solid 1px #ccc', display:'flex', justifyContent:'flex-end',alignItems:'center'}}>
       <Box style={{padding:'10px'}}><DevicesIcon style={{padding:'0 10px',verticalAlign:'middle',color:'#424242' }}/><Link href="#" underline="none" style={{color:'#424242',fontSize:'16px', borderRight:'solid 1px #424242',paddingRight:'10px'}}>Main Content  </Link></Box>  
        <Box style={{padding:'0 10px',color:'#424242',fontSize:'16px', borderRight:'solid 1px #424242'}}><Link href="#" underline="none" style={{color:'#424242',fontSize:'16px',paddingRight:'10px'}}> +A</Link> <Link href="#" underline="none" style={{color:'#424242',fontSize:'16px',paddingRight:'10px'}}>A - </Link><Link href="#" underline="none" style={{color:'#424242',fontSize:'16px',paddingRight:'10px'}}>A</Link> </Box>
        <Box style={{padding:'0 10px',color:'#424242',fontSize:'14px', borderRight:'solid 1px #424242'}}><WebIcon style={{padding:'0 10px',verticalAlign:'middle'}}/><Link href="#" underline="none" style={{color:'#424242',fontSize:'16px'}}>Screen Reader </Link></Box>
        <Box style={{padding:'0 10px',color:'#424242',fontSize:'16px'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="language-select-label"> {t("LANGUAGE")}</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        className='language'
        style={{border:'none'}}
        startIcon={<LanguageIcon />}
        trigger={(triggerProps) => {
          return (
            <Button
              alignSelf="center"
              variant="solid"
              {...triggerProps}
            >
              {t("LANGUAGE")}
            </Button>
          );
          // }}>
        }}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        <MenuItem onPress={(item) => changeLanguage('en')} value="English">{t("ENGLISH")}</MenuItem>
        <MenuItem onPress={(item) => changeLanguage('hi')} value="Hindi">{t("HINDI")}</MenuItem>
      </Select>
    </FormControl>
        </Box>
      </Box>

    <AppBar position="sticky" style={{background:'#fff'}}>
      
      <Container maxWidth="xl" style={{paddingLeft:'0', paddingTop:'10px', paddingBottom:'8px'}}>
        <Toolbar disableGutters>
        <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              className='lg-hide'

            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1,paddingLeft:'20px'}}>

        <img src={require("../assets/logo.png")} style={{maxWidth:'100%'}} />
        </Box>
       
          <Box sx={{ flexGrow: 3, display: { xs: 'flex', md: 'none' } }}>
            
            <Menu
              id="menu-appbar"

              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className="xs-hide" style={{ display: 'flex', alignItems: 'center',flexGrow: 3, paddingLeft:'40px' }}>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
        

          <Box className="xs-hide" sx={{ flexGrow: 1 , display:'flex', justifyContent:'flex-end'}}>
          <Link href="#" underline="none" style={{ my: 2, color: '#484848', display: 'block',margin:'0 20px' }}><EditNoteOutlinedIcon style={{padding:'0 10px',verticalAlign:'middle'}} />Content</Link>
          <Link href="#" underline="none" style={{ my: 2, color: '#484848', display: 'block',margin:'0 20px' }}><GroupsOutlinedIcon style={{padding:'0 10px',verticalAlign:'middle'}} />Connections</Link>
          {/* <Link href="#" style={{ my: 2, color: 'black', display: 'block' }}> <AccountCircleOutlinedIcon />Profile</Link> */}

          
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleOutlinedIcon style={{padding:'0 10px',verticalAlign:'middle'}} /> Profile
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default ResponsiveAppBar;