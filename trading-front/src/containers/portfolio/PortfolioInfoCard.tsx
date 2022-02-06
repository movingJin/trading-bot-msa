import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    topGrid: {},
    card: {
        marginLeft: '20px',
        marginRight: '20px',
    },
    topGridCard: {
        marginLeft: '20px',
        marginRight: '20px',
    },
}));

const PortfolioInfoCard = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={3} className={classes.card}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            주문 가능 수량
                        </Typography>
                        <Typography variant="body2">
                            --
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} className={classes.card}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            총 보유 자산
                        </Typography>
                        <Typography variant="body2">
                            --원
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} className={classes.card}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            수익률
                        </Typography>
                        <Typography variant="body2">
                            --%
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default PortfolioInfoCard;

