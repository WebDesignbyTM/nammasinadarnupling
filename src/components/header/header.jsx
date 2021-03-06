import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import HomeIcon from '@material-ui/icons/Home';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';

import Popper from '@material-ui/core/Popper';

import User from '../../cards/user/user.jsx';
import SearchRoute from '../searchroute/searchroute.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: theme.drawer.rightMargin,
    color:theme.palette.secondary.main,
  },
  userButton: {
    position: 'absolute',
    right: theme.drawer.rightMargin,
    color: theme.palette.secondary.dark,
  },
  searchButton: {
    position:'absolute',
    right:theme.drawer.rightMargin*3,
    color:theme.palette.secondary.dark
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: theme.drawer.width,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: theme.drawer.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerListItem: {
    paddingLeft:theme.drawer.rightMargin
  },
  drawerIcon: {
    color:theme.palette.secondary.main
  },
  drawerIconSelected: {
    color:theme.palette.secondary.dark
  },
  drawerText: {
    position:'relative',
    color:theme.palette.secondary.main
  },
  drawerTextSelected: {
    color:theme.palette.secondary.dark
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration:'none',
  },
  paper: {
    background: theme.palette.primary.light,

  },
  title: {
    color: theme.palette.secondary.main,
  },
  chevIcon: {
    color:theme.palette.secondary.main
  },
  popper: {
    zIndex: theme.zIndex.drawer+2
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [popperAnchor, setPopperAnchor] = React.useState(null);
  const [whichPopper, setWhichPopper] = React.useState('');
  const title=props.title;
  const pages=[
    {name:'Home', icon: HomeIcon, link:'/home'},
    {name:'Transport', icon: DirectionsBusIcon, link:'/transport'},
    {name:'Companies', icon:BusinessIcon, link:'/companies'}];

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePopperClick = (event, component) => {
    setPopperAnchor(event.currentTarget);
    if (component == whichPopper)
      setPopperOpen((prev)=>!prev);
    else {
      setWhichPopper(component);
      setPopperOpen(true);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            {title}
          </Typography>

          <IconButton className={classes.userButton} onClick={(evt)=>{handlePopperClick(evt, 'user');}}>
            <AccountCircleIcon />
          </IconButton>

          <IconButton className={classes.searchButton} onClick={(evt)=>{handlePopperClick(evt, 'search');}}>
            <SearchIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Popper open={popperOpen} anchorEl={popperAnchor} placement='bottom-end' className={classes.popper}>
        <Paper>
          {whichPopper=='user'&&<User/>}
          {whichPopper=='search'&&<SearchRoute hide={title=='transport'} searchButton={true}/>}
        </Paper>
      </Popper>


      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.paper]: true,
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton className={classes.chevIcon} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.map((page, index) => (
            <Link to={page.link} className={classes.link} key={index}>
              <ListItem className={classes.drawerListItem} button key={page.name}>
                <ListItemIcon className={clsx({
                  [classes.drawerIcon]:(page.link!=window.location.pathname),
                  [classes.drawerIconSelected]:(window.location.pathname.indexOf(page.link) != -1),
                })}>
                  <page.icon/>
                 </ListItemIcon>
                <ListItemText className={clsx({
                  [classes.drawerText]:(page.link!=window.location.pathname),
                  [classes.drawerTextSelected]:(window.location.pathname.indexOf(page.link) != -1),
                })} primary={page.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
