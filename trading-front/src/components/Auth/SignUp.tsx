import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { SignUpContainerProps } from '../../containers/AuthContainer/SignUpContainer';

interface SignUpProps extends SignUpContainerProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handlePasswordConfirm: React.ChangeEventHandler<HTMLInputElement>;
  handleSignUp: () => void;
  localMsg: string;
}

export default function SignUp({
  open,
  handleClose,
  handleChange,
  handlePasswordConfirm,
  handleSignUp,
  localMsg,
}: SignUpProps): JSX.Element {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회원 가입</DialogTitle>
        <DialogContent>
          <Box component="form">
            <Grid container alignItems="center">
              <Grid item xs={12}>
                {localMsg ? <Alert severity="warning">{localMsg}</Alert> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  required
                  margin="normal"
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  id="passwordConfirm"
                  label="PasswordConfirm"
                  name="passwordConfirm"
                  type="password"
                  onChange={handlePasswordConfirm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  id="username"
                  label="Name"
                  name="username"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp}>가입</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
