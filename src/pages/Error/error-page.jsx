import { useRouteError } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 9,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography varian="h1" component="h1">
          Oops!
        </Typography>
        <Typography variant="p" component="p">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>
          <i>{error.statusText || error.message}</i>
        </Typography>
        <iframe
          src="https://giphy.com/embed/kSud59PILe9ri"
          width="468"
          height="480"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/racoon-kSud59PILe9ri">via GIPHY</a>
        </p>
      </Box>
    </Container>
  );
}
