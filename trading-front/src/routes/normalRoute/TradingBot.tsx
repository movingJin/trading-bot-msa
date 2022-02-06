import React, { useState, useEffect } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Grid from '@mui/material/Grid';
import BotCard from '@components/TradingBot/BotCard';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Bot, getBotsActions } from '@redux/reducers/botReducer';
import { RootState } from '@redux/reducers';
import NewBotCard from '@components/TradingBot/NewBotCard';

const NoData = (): JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Stack spacing={1}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddCircleIcon sx={{ color: green[500], fontSize: 70 }} />
      </Box>
      <Typography variant="h4" align="center">
        트레이딩봇을 추가해주세요!
      </Typography>
    </Stack>
  </Box>
);

const TradingBot = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const bots = useSelector((state: RootState) => state.bot.bots);
  const isLoading = useSelector((state: RootState) => state.bot.isLoading);
  useEffect(() => {
    dispatch(getBotsActions.request());
  }, [dispatch]);

  return (
    <>
      <ContentWrapper title="트레이딩 봇" addButton handleOpen={handleOpen}>
        {bots.length > 0 ? (
          <Grid container spacing={1}>
            {bots.map((bot: Bot) => (
              <Grid key={bot.id} item xl={2} lg={2} md={3} sm={5} xs={12}>
                <NewBotCard botInfo={bot} isLoading={isLoading} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoData />
        )}
      </ContentWrapper>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd handleClose={handleClose} />
      </Dialog>
    </>
  );
};
export default TradingBot;
