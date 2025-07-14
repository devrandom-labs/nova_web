import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import Header from '@/components/Header';

function Root() {
    const { user, logout } = useAuth0();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header user={user} logout={logout} />
            <Container component="main" sx={{ mt: 4, mb: 4 }}>
                {/* All your agent management components go here */}
                <Typography variant="h4" component="h2" gutterBottom>
                    Your Agents
                </Typography>
                {/* ... */}
            </Container>
        </Box>
    );
}

export default Root;