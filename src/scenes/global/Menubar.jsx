import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import { useNavigate, Link } from 'react-router-dom';

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CalendarTodayOutlined, NoteAltOutlined } from '@mui/icons-material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const settings = ['Profile', 'Account', 'Log Out'];

function Menubar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

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

    // Navigation
    const handleMenu = (path) => {
        navigate(path);
    };

    // Patient Management
    const [anchorElPatientMgmt, setAnchorElPatientMgmt] = React.useState(null);
    const handlePatientMgmtClick = (event) => {
        setAnchorElPatientMgmt(event.currentTarget);
    };
    const handlePatientMgmtClose = () => {
        setAnchorElPatientMgmt(null);
    };
    const handlePatientMgmtNavigation = (path) => {
        handlePatientMgmtClose();
        navigate(path);
    };

    // Resources
    const [anchorElResource, setAnchorElResource] = React.useState(null);
    const handleResourceClick = (event) => {
        setAnchorElResource(event.currentTarget);
    };
    const handleResourceClose = () => {
        setAnchorElResource(null);
    };
    const handleResourceNavigation = (path) => {
        handleResourceClose();
        navigate(path);
    };

    return (
        <AppBar position="sticky"
        style={{ backgroundColor: colors.primary[800], height: '100px',  
                justifyContent: 'center', alignItems: 'center', }}
        >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography fontWeight={'900'}  fontSize={45} letterSpacing={2}
                color={colors.primary[100]} margin='0 0px' style={{ fontFamily: 'Verdana' }} >
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/assets/logo_white.png" alt="logo" style={{ height: '70px', margin:'0 20px 0 20px' }} />
                    ROMET
                </Link>
            </Typography>

            <Box sx={{ flexGrow: 1 }} /> {/* This Box pushes the Buttons to the right */}
                <Button onClick={handlePatientMgmtClick} 
                style={{ color: '#ffffff', width: '12em', height: '2.5em', fontSize:'20px', 
                fontWeight:'bold', borderRadius: "12px", textTransform: 'none', 
                '&:active': {
                    backgroundColor: '#95e2ea', // replace 'desiredColor' with the color you want for the active background
                  },
                }}>
                    Patient Management
                    <ArrowDropDownIcon sx={{ ml: '3px', }} />
                </Button>
                    <Menu id="simple-menu" anchorEl={anchorElPatientMgmt} keepMounted 
                    open={Boolean(anchorElPatientMgmt)} onClose={handlePatientMgmtClose}
                    >
                        <MenuItem onClick={() => handlePatientMgmtNavigation('/create-patient')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'20px', mr: '8px',
                        fontWeight:'bold', borderRadius: "12px", justifyItems:"center" }} > 
                            <ContactsOutlinedIcon sx={{  mr: '10px', }} />
                            Create New Patient
                        </MenuItem>
                        <MenuItem onClick={() => handlePatientMgmtNavigation('/all-patients')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'20px', 
                        fontWeight:'bold', borderRadius: "12px" }} > 
                            <PeopleOutlinedIcon sx={{  mr: '10px', }} />
                            View All Patients
                        </MenuItem>
                    </Menu>

                <Button onClick={handleResourceClick} 
                style={{ color: '#ffffff', width: '10em', height: '2.5em', fontSize:'20px', 
                fontWeight:'bold', borderRadius: "12px", textTransform: 'none', mr: '80px', }}>
                    Resources
                    <ArrowDropDownIcon sx={{ ml: '3px', }} />
                </Button>
                    <Menu id="simple-menu" anchorEl={anchorElResource} keepMounted 
                    open={Boolean(anchorElResource)} onClose={handleResourceClose}
                    >
                        <MenuItem onClick={() => handleResourceNavigation('/manual')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'20px', mr: '8px',
                        fontWeight:'bold', borderRadius: "12px", justifyItems:"center" }} > 
                            <NoteAltOutlined sx={{  mr: '10px', }} />
                            Instructional Manual
                        </MenuItem>
                        <MenuItem onClick={() => handleResourceNavigation('/about')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'20px', mr: '8px',
                        fontWeight:'bold', borderRadius: "12px", justifyItems:"center" }} > 
                            <Diversity2Icon sx={{  mr: '10px', }} />
                            About Us
                        </MenuItem>
                        {/* <MenuItem onClick={() => handleResourceNavigation('/calendar')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'20px', 
                        fontWeight:'bold', borderRadius: "12px" }} > 
                            <CalendarTodayOutlined sx={{  mr: '8px', }} />
                            Calendar
                        </MenuItem> */}
                    </Menu>

            <Box sx={{ flexGrow: 0, m:"0 20px" }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Box
                        sx={{
                            backgroundColor: colors.grey[200], // white background color
                            borderRadius: '50%', // ensures it's a circle
                            //padding: '2px', // padding for the Avatar
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px', // adjust the size of the Avatar
                            height: '40px', // adjust the size of the Avatar
                        }}
                    >
                        <Avatar alt="John Cena" src="../../assets/logo_color.png" sx={{ width: '100%', height: 'auto' }}  />
                    </Box>
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
                    <MenuItem key={setting} onClick={() => { 
                        handleCloseUserMenu(); 
                        if (setting === 'Log Out') {
                            navigate('/'); 
                        }
                    }}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
    </AppBar>
  );
}
export default Menubar;