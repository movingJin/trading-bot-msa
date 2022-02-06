import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { Bot } from '@redux/reducers/botReducer';
import icons from '@assets/images';

interface BotCardProps {
  botInfo: Bot;
  width?: number;
  isLoading: boolean;
}

export default function BotCard({
  botInfo,
  width = 380,
  isLoading = false,
}: BotCardProps): JSX.Element {
  const [icon, setIcon] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setIcon(icons[botInfo.coinName]);
  }, []);
  return (
    <>
      <Card sx={{ width, cursor: 'pointer' }} onClick={handleOpen}>
        <CardContent>
          <Stack spacing={1}>
            <Stack spacing={2.5} direction="row">
              {isLoading ? (
                <Skeleton variant="circular" width={70} height={70}>
                  <Avatar />
                </Skeleton>
              ) : (
                <img src={icon} alt="coin" width="70" height="70" />
              )}
              <Stack spacing={1.5}>
                {isLoading ? (
                  <Skeleton width="100%">
                    <Typography>##########################</Typography>
                  </Skeleton>
                ) : (
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                    {botInfo.botName}
                  </Typography>
                )}
                {isLoading ? (
                  <Skeleton width="100%">
                    <Typography>##########################</Typography>
                  </Skeleton>
                ) : (
                  <Typography>수익률 {`${botInfo?.profit || 0}%`}</Typography>
                )}
              </Stack>
              {isLoading ? null : (
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h3" align="center">
                    {botInfo.isActive ? 'ON' : 'OFF'}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd botInfo={botInfo} handleClose={handleClose} />
      </Dialog>
    </>
  );
}
