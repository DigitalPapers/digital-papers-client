import { Box, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const PageLoader = () => {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};
