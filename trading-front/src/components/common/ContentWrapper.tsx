import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';

interface ContentWrapperProps {
  title: string;
  addButton?: boolean;
  children: JSX.Element;
  overflow?: string;
  padding?: string;
  handleOpen?: () => void;
}

export default function ContentWrapper({
  title,
  addButton = false,
  children,
  overflow = 'auto',
  padding = '2rem',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleOpen = () => {},
}: ContentWrapperProps): JSX.Element {
  return (
    <Box
      sx={{
        flex: 1,
        padding,
        background: '#ffffff',
        fontFamily: 'sleig',
      }}
    >
      <Typography variant="h4" component="div" sx={{ fontFamily: 'sleig' }}>
        {title}
        {addButton ? (
          <IconButton
            aria-label="add"
            sx={{ marginLeft: '0.8rem', fontFamily: 'sleig' }}
            onClick={handleOpen}
          >
            <AddCircleIcon sx={{ color: green[500] }} />
            &nbsp;Add
          </IconButton>
        ) : null}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          padding: '1rem',
          overflow,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
