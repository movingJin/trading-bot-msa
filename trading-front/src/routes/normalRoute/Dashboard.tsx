import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from "@material-ui/core/Badge";
import Container from '@material-ui/core/Container';
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Link from "@material-ui/core/Link";
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MainListItems } from '@components/layout/listLtems';
import ContentsRouter from '@routes/ContentsRouter';
import Modal from '@mui/material/Modal';
import { logoutActions, privateKeyActions } from '@redux/reducers/authReducer';
import { RootState } from '@redux/reducers';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { endInit } from '@redux/reducers/websocketReducer';

import { CommonButtonContainer } from '../../containers/common/ButtonContainer';
import 'animate.css';
import { usersActions } from '../../redux/reducers/authReducer';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
    position: 'relative',
    height: '100vh',
    flexDirection: 'column',
    background: '#43335',
  },
  toolbar: {
    // paddingRight: 24, // keep right padding when drawer closed
    color: '#170f8b',
    // height: '5rem',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `100%`,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    // flexGrow: 6,
    color: '#170f8b',
    fontFamily: 'sleig',
    fontSize: '30px',
  },
  menuWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    margin: '0rem 0rem 0rem 1rem',
    color: '#000000',
    fontFamily: 'sleig',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  loginIcon: {
    // flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    zIndex: 0,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
export const Balloon = styled.div`
  position: absolute;
  top: 14.5rem;
  left: calc(100%-50px);
  z-index: 4;
  width: 15rem;
  height: 6rem;
  background: #ffffff;
  border-radius: 15px;
  animation: 'bounce';
  animation-duration: 3s;
  font-family: 'sleig';
  /* :after {
    border-top: 15px solid #c1c6ce;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 7px;
    left: -13px;
  } */
`;
export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [settingOpen, setSettingOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [search, setsearch] = useState('');
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.auth.apiKey);
  useEffect(() => {
    dispatch(privateKeyActions.request());
  }, []);
  useEffect(() => {
    if (!apiKey?.length) {
      setToast(true);
    }
  }, [apiKey]);

  const handleSettingOpen = () => setSettingOpen(true);
  const handleSettingClose = () => setSettingOpen(false);
  const handleToastClose = () => setToast(false);
  const handleLogout = () => {
    dispatch(logoutActions.request());
    dispatch(endInit());
  };
  useEffect(() => {
    dispatch(usersActions.request());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          style={{ background: '#FFFFFF' }}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.menuWrapper}>
              <Link to="dashboard" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h1"
                  variant="h6"
                  noWrap
                  className={classes.title}
                >
                  Tradingbot
                </Typography>
              </Link>
              <Link to="trading-bot" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h3"
                  variant="h6"
                  noWrap
                  className={classes.menu}
                >
                  트레이딩 봇
                </Typography>
              </Link>
              <Link to="portfolio" style={{ textDecoration: 'none' }}>
                <Typography
                  component="h3"
                  variant="h6"
                  noWrap
                  className={classes.menu}
                >
                  포트폴리오
                </Typography>
              </Link>
              <Typography
                component="h3"
                variant="h6"
                noWrap
                className={classes.menu}
                onClick={handleSettingOpen}
              >
                설정
              </Typography>
            </div>

            {/* <IconButton color="inherit" className={classes.loginIcon}>
            <AccountCircleIcon />
          </IconButton> */}
            {/* <Button variant="contained" color="primary">
            Login
          </Button> */}
            <CommonButtonContainer
              title="LOGOUT"
              color="#170F8B"
              onClick={handleLogout}
            />
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.appBarSpacer} />
      <main className={classes.content}>
        <ContentsRouter />
      </main>
      <Dialog
        open={settingOpen}
        onClose={handleSettingClose}
        style={{ overflowX: 'hidden' }}
      >
        <PrivateSetting handleClose={handleSettingClose} />
      </Dialog>
      <Snackbar
        open={toast}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message="설정에서 API Key를 등록해야만 진행이 가능합니다."
      />
    </div>
  );
}
