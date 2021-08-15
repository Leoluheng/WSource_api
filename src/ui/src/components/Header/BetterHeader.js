import React from 'react';
import {withRouter} from "react-router-dom";
import {ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import ForumIcon from '@material-ui/icons/Forum';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import frame from './../../assets/frame.svg';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: 'white',
        color: '#FFB931'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#FFB931',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    signup: {
        margin: theme.spacing(3, 0, 2),
        background: '#FFC100',
        color: 'white',
        borderRadius: 10,
        height: '40px',
        '&:hover': {
          backgroundColor: 'white',
          color: '#ffbf00',
          },
    },
    login: {
        margin: theme.spacing(3, 0, 2),
        color: '#ffbf00',
        borderRadius: 10,
        height: '40px',
        '&:hover': {
            backgroundColor: 'white',
            color: '#BD871D',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.warning.light, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.warning.light, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function BetterHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        drawer: false
        }
    )
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, ['drawer']: open });
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    function handleToHome(){
        props.history.push('/')
    }
    function handleToService(){
        props.history.push('/service')
    }
    function handleToOfficial(){
        props.history.push('/official')
    }
    function handleToCommunity(){
        props.history.push('/community')
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    function handleLogin() {
        props.history.push('/login')
    }

    function handleRegister() {
        props.history.push('/register')
    }

    function handleToHome() {
        props.history.push('/')
    }
    function handleToUserHome() {
        props.history.push('/home')
    }

    function handleToProfile() {
        handleMenuClose();
    }

    function handleToManagePost() {
        handleMenuClose();
        props.history.push('/managePost')
    }

    function renderSearchBar() {
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        )
    }

    function renderLogin() {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) {
            return (
                <Box>
                    <Button className={classes.login} onClick={handleLogin}>Login</Button>
                    <Button className={classes.signup}  onClick={handleRegister}>Sign up</Button>
                </Box>
            )
        }
    }

    function renderAccountCircle(){
        if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
            return (
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            )
        }
    }

    function renderLogout() {
        if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
            return (
                <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
            )
        }
    }

    function renderDrawer() {
        return (<Drawer open={state['drawer']} onClose={toggleDrawer(false)}>
            <div
                className={classes.drawer}
                role="presentation"
                onClick={toggleDrawer( false)}
                onKeyDown={toggleDrawer( false)}
            >
                <List>
                    <Divider />
                    <ListItem button key={"Home"} onClick={handleToUserHome}>
                        <ListItemIcon> <HomeIcon /> </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <Divider />
                    <ListItem button key={"Services"} onClick={handleToService}>
                        <ListItemIcon> <SchoolIcon/> </ListItemIcon>
                        <ListItemText primary={"Services"} />
                    </ListItem>
                    <Divider />
                    <ListItem button key={"University Resources"} onClick={handleToOfficial}>
                        <ListItemIcon> <BusinessIcon/> </ListItemIcon>
                        <ListItemText primary={"University Resources"} />
                    </ListItem>
                    <Divider />
                    <ListItem button key={"Community"} onClick={handleToCommunity}>
                        <ListItemIcon> <ForumIcon/> </ListItemIcon>
                        <ListItemText primary={"Community"} />
                    </ListItem>
                </List>
                <Divider />
            </div>
        </Drawer>)
    }

    function renderProfileMenu(){
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleToProfile}>Profile</MenuItem>
                <MenuItem onClick={handleToManagePost}>Manage Posts</MenuItem>
            </Menu>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header} elevation={2}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.title}>
                        <img src={frame} onClick={() => handleToHome()}/>
                    </div>
                    {/* <Typography align='left' variant='h4' className={classes.title} onClick={handleToHome} > */}
                        {/* <Typography variant="button" color='primary'> */}
                            {/* WSource */}
                        {/* </Typography> */}
                    {/* </Typography> */}
                    {renderSearchBar()}
                    {renderLogin()}
                    {renderLogout()}
                    {renderAccountCircle()}
                </Toolbar>
            </AppBar>
            {renderDrawer()}
            {renderProfileMenu()}
        </div>
    );
}

export default withRouter(BetterHeader);