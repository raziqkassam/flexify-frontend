import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import { useNavigate, Link } from 'react-router-dom';

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CalendarTodayOutlined, NoteAltOutlined } from '@mui/icons-material';
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
        style={{ backgroundColor: colors.primary[800], height: '80px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                justifyContent: 'center', alignItems: 'center', }}
        >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography variant="h2" fontWeight={'bold'} fontStyle='italic' 
                color={colors.grey[100]} margin='0 20px'>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    R.O.M.E.T.
                </Link>
            </Typography>

            <Box sx={{ flexGrow: 1 }} /> {/* This Box pushes the Buttons to the right */}

                <Button onClick={handlePatientMgmtClick} 
                style={{ color: '#ffffff', width: '12em', height: '2.5em', fontSize:'15px', 
                fontWeight:'bold', borderRadius: "12px", textTransform: 'none' }}>
                    Patient Management
                    <ArrowDropDownIcon sx={{ ml: '2px', }} />
                </Button>
                    <Menu id="simple-menu" anchorEl={anchorElPatientMgmt} keepMounted 
                    open={Boolean(anchorElPatientMgmt)} onClose={handlePatientMgmtClose}
                    >
                        <MenuItem onClick={() => handlePatientMgmtNavigation('/create-patient')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'15px', mr: '8px',
                        fontWeight:'bold', borderRadius: "12px", justifyItems:"center" }} > 
                            <ContactsOutlinedIcon sx={{  mr: '8px', }} />
                            Create New Patient
                        </MenuItem>
                        <MenuItem onClick={() => handlePatientMgmtNavigation('/all-patients')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'15px', 
                        fontWeight:'bold', borderRadius: "12px" }} > 
                            <PeopleOutlinedIcon sx={{  mr: '8px', }} />
                            View All Patients
                        </MenuItem>
                    </Menu>

                <Button onClick={handleResourceClick} 
                style={{ color: '#ffffff', width: '12em', height: '2.5em', fontSize:'15px', 
                fontWeight:'bold', borderRadius: "12px", textTransform: 'none', mr: '80px', }}>
                    Resources
                    <ArrowDropDownIcon sx={{ ml: '2px', }} />
                </Button>
                    <Menu id="simple-menu" anchorEl={anchorElResource} keepMounted 
                    open={Boolean(anchorElResource)} onClose={handleResourceClose}
                    >
                        <MenuItem onClick={() => handleResourceNavigation('/manual')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'15px', mr: '8px',
                        fontWeight:'bold', borderRadius: "12px", justifyItems:"center" }} > 
                            <NoteAltOutlined sx={{  mr: '8px', }} />
                            Manual and FAQ
                        </MenuItem>
                        <MenuItem onClick={() => handleResourceNavigation('/calendar')}
                        style={{ color: '#ffffff', width: '15em', height: '3em', fontSize:'15px', 
                        fontWeight:'bold', borderRadius: "12px" }} > 
                            <CalendarTodayOutlined sx={{  mr: '8px', }} />
                            Calendar
                        </MenuItem>
                    </Menu>

            <Box sx={{ flexGrow: 0, m:"0 20px" }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="John Cena" src="../../assets/user.png" />
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
  );
}
export default Menubar;