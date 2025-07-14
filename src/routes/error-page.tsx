import { useRouteError } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import { type RouteError } from "@/types/router";

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Container>
  );
} 