// import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  CardActions,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// assets
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    // marginLeft: '20px',
    // marginRight: '20px',
    marginBottom: '12px',
  },
  cardAction: {
    padding: '10px',
    paddingTop: 0,
    justifyContent: 'center',
  },
  primaryLight: {
    // color: theme.palette.primary[200],
    cursor: 'pointer',
  },
  divider: {
    marginTop: '12px',
    marginBottom: '12px',
  },
  avatarSuccess: {
    width: '16px',
    height: '16px',
    borderRadius: '5px',
    // backgroundColor: theme.palette.success.light,
    // color: theme.palette.success.dark,
    marginLeft: '15px',
  },
  successDark: {
    // color: theme.palette.success.dark
  },
  avatarError: {
    width: '16px',
    height: '16px',
    borderRadius: '5px',
    // backgroundColor: theme.palette.orange.light,
    // color: theme.palette.orange.dark,
    marginLeft: '15px',
  },
  errorDark: {
    // color: theme.palette.orange.dark
  },
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue',
  },
}));

// ===========================|| DASHBOARD DEFAULT - POPULAR CARD ||=========================== //
interface Data {
  id: string;
  timeTag: string;
  coinName: string;
  uuid: string;
  price: number;
  quantity: number;
  isBid: boolean;
}
interface arrayProps {
  rows: Data[];
}

export const PortfolioListCard: React.FC<arrayProps> = ({ rows }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignContent="center" justifyContent="space-between">
            <Grid item>
              <div style={{ fontFamily: 'sleig', fontSize: '25px' }}>
                거래내역
              </div>
            </Grid>
            <Grid item>
              <MoreHorizOutlinedIcon
                fontSize="small"
                className={classes.primaryLight}
                aria-controls="menu-popular-card"
                aria-haspopup="true"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 ? (
            rows.map((e, i) => {
              return (
                <Grid
                  key={e.id}
                  container
                  direction="column"
                  className={classes.card}
                >
                  <Card>
                    <CardContent>
                      <Grid item>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              <span
                                className={
                                  e.isBid ? classes.redText : classes.blueText
                                }
                              >
                                {' '}
                                {e.isBid ? '매수' : '매도'}
                              </span>{' '}
                              {e.coinName}
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {e.isBid}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> */}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          className={classes.successDark}
                        >
                          거래일시 {e.timeTag.substring(0, 10)}{' '}
                          {e.timeTag.substring(11, 19)}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.successDark}
                        >
                          주문금액 {(e.price * e.quantity).toFixed(2)}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.successDark}
                        >
                          거래단가 {e.price}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.successDark}
                        >
                          채결수량 {e.quantity}
                        </Typography>
                      </Grid>
                      {/* <Divider className={classes.divider} /> */}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid container direction="column" className={classes.card}>
              <Card>
                <CardContent>
                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          거래내역이 존재하지 않습니다.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

// export default PortfolioListCard;
