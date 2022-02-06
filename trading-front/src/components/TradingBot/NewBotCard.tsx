import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import { Bot } from '@redux/reducers/botReducer';
import icons from '@assets/images';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface OnOffChipProps {
  on: boolean;
  main?: boolean;
}

function OnOffChip({ on, main = false }: OnOffChipProps): JSX.Element {
  return (
    <Chip
      label={on ? 'ON' : 'OFF'}
      color={on ? 'success' : 'error'}
      sx={{ cursor: main ? 'default' : 'pointer' }}
    />
  );
}

interface ProfitProps {
  profit: number | undefined;
}

function Profit({ profit = 0 }: ProfitProps): JSX.Element {
  let profitText = '';
  let color = 'black';
  let arrow = null;
  if (profit > 0) {
    color = 'red';
    arrow = <ArrowUpwardIcon sx={{ mb: 0.4 }} />;
  } else if (profit < 0) {
    color = 'blue';
    arrow = <ArrowDownwardIcon sx={{ mb: 0.4 }} />;
  } else {
    arrow = '─';
  }
  profitText = `${profit}%`;
  return (
    <Typography
      sx={{ color, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
    >
      수익률 {profitText}&nbsp;{arrow}
    </Typography>
  );
}

interface NewBotCardProps {
  botInfo: Bot;
  isLoading: boolean;
  main?: boolean;
}

export default function NewBotCard({
  botInfo,
  isLoading = false,
  main = false,
}: NewBotCardProps): JSX.Element {
  const [icon, setIcon] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const flexCenter = { display: 'flex', justifyContent: 'center' };
  useEffect(() => {
    setIcon(icons[botInfo.coinName]);
  }, []);
  return (
    <>
      <Card
        sx={{
          cursor: main ? 'default' : 'pointer',
          width: '14rem',
          borderRadius: '16px',
          backgroundColor: '#FCFCFC',
          boxShadow: '4',
        }}
        onClick={handleOpen}
      >
        <CardContent>
          <Stack spacing={2}>
            <Box sx={flexCenter}>
              {isLoading ? (
                <Skeleton variant="circular" width={70} height={70}>
                  <Avatar />
                </Skeleton>
              ) : (
                <Box
                  sx={{
                    ...flexCenter,
                    alignItems: 'center',
                    // backgroundColor: '#E9E9E9',
                    borderRadius: '16px',
                    width: '85px',
                    height: '85px',
                  }}
                >
                  <img src={icon} alt="coin" width="70" height="70" />
                </Box>
              )}
            </Box>
            <Box sx={flexCenter}>
              {isLoading ? (
                <Skeleton width="100%">
                  <Typography>##########################</Typography>
                </Skeleton>
              ) : (
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                  {botInfo.botName}
                </Typography>
              )}
            </Box>
            <Box sx={flexCenter}>
              {isLoading ? (
                <Skeleton width="100%">
                  <Typography>##########################</Typography>
                </Skeleton>
              ) : (
                <Profit profit={botInfo?.profit} />
              )}
            </Box>
            <Box sx={flexCenter}>
              {isLoading ? (
                <Skeleton width="100%">
                  <Typography>##########################</Typography>
                </Skeleton>
              ) : (
                <OnOffChip on={botInfo.isActive} main={main} />
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {!main && (
        <Dialog open={open} onClose={handleClose}>
          <TradingBotAdd botInfo={botInfo} handleClose={handleClose} />
        </Dialog>
      )}
    </>
  );
}
