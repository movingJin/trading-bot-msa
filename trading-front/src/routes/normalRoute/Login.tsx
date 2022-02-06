import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '@redux/reducers/authReducer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { TextField } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import SignUpContainer from '@containers/AuthContainer/SignUpContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router';
import { RootState } from '@redux/reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles/';

const loginTitleFont = createTheme({
  typography: {
    fontFamily: 'sleig',
  },
});

const useStyles = makeStyles((theme) => ({
  realRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fafafa',
    // backgroundColor: '#A2A5A2',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appBar: {},
  appBarTitle: {
    flexGrow: 1,
    fontFamily: 'sleig',
  },
  card: {},
  title: {
    paddingTop: '10px',
    paddingBottom: '10px',
    fontFamily: 'sleig',
  },
}));

export default function Login(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const handleClickSignUp = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    dispatch(loginActions.request(user));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/main/dashboard');
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Box
        sx={{ display: 'flex', justifyContent: 'cneter', alignItems: 'center' }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Container component="main" maxWidth="xs">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: '20PX',
                  width: '400px',
                  boxShadow: 4,
                }}
                className={classes.card}
              >
                <CardContent>
                  <ThemeProvider theme={loginTitleFont}>
                    <Typography
                      variant="h4"
                      align="center"
                      color="text.primary"
                      className={classes.title}
                      gutterBottom
                    >
                      TradingBot
                    </Typography>
                  </ThemeProvider>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <MailOutlineIcon
                        sx={{ color: 'action.active', mr: 1, mb: 1.5 }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        variant="standard"
                      />
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}
                    >
                      <LockIcon
                        sx={{ color: 'action.active', mr: 1, mb: 1.5 }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={handleChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 15,
                      }}
                    >
                      {/* <FormControlLabel
                        control={
                          <Checkbox
                            value="remember"
                            color="primary"
                            size="small"
                          />
                        }
                        label="로그인 상태 유지"
                      /> */}
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: 'rgb(41, 76, 96)' }}
                    >
                      Login
                    </Button>
                  </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button size="large" onClick={handleClickSignUp}>
                    회원가입
                  </Button>
                  <SignUpContainer open={open} handleClose={handleClose} />
                </CardActions>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
