import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, IconButton, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { useNovaDispatch, useNovaSelector, setColorMode } from '@/state';
import { selectColorMode } from '@/state/settings';
import { Brightness4, Brightness7, LogoutOutlined, PersonOutlined } from '@mui/icons-material';

type HeaderProps = {
    user: ReturnType<typeof useAuth0>['user'];
    logout: ReturnType<typeof useAuth0>['logout'];
};

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
    const dispatch = useNovaDispatch();
    const mode = useNovaSelector(selectColorMode);

    const handleThemeChange = () => {
        dispatch(setColorMode(mode === 'light' ? 'dark' : 'light'));
    };

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar sx={{ py: 1, px: 3 }}>
                <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                        flexGrow: 1, 
                        fontWeight: 600,
                        letterSpacing: '-0.02em'
                    }}
                >
                    Nova Agent Management
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                            src={user?.picture} 
                            sx={{ width: 32, height: 32 }}
                        >
                            <PersonOutlined />
                        </Avatar>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 500,
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            {user?.name || user?.email}
                        </Typography>
                    </Box>
                    
                    <IconButton 
                        onClick={handleThemeChange} 
                        color="inherit"
                        sx={{ 
                            ml: 1,
                            p: 1.5,
                            borderRadius: 2
                        }}
                    >
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    
                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<LogoutOutlined />}
                        onClick={() =>
                            logout({ logoutParams: { returnTo: window.location.origin } })
                        }
                        sx={{
                            ml: 1,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            '&:hover': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 