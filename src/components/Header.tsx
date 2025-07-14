import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, Toolbar, Box, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { useNovaDispatch, useNovaSelector, setColorMode } from '@/state';
import { selectColorMode } from '@/state/settings';
import { Brightness4, Brightness7, LogoutOutlined, PersonOutlined, SmartToy } from '@mui/icons-material';
import { useState } from 'react';

type HeaderProps = {
    user: ReturnType<typeof useAuth0>['user'];
    logout: ReturnType<typeof useAuth0>['logout'];
};

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
    const dispatch = useNovaDispatch();
    const mode = useNovaSelector(selectColorMode);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleThemeChange = () => {
        dispatch(setColorMode(mode === 'light' ? 'dark' : 'light'));
        setAnchorEl(null);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar sx={{ py: { xs: 0.5, sm: 1 }, px: { xs: 2, sm: 3 } }}>
                {/* Logo/Brand Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SmartToy sx={{ 
                        fontSize: '2rem', 
                        color: 'primary.main'
                    }} />
                </Box>
                
                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />
                
                {/* Avatar with user name and dropdown - using Button with proper clickaway */}
                <Button
                    onClick={handleAvatarClick}
                    color="inherit"
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        padding: '4px 8px',
                        borderRadius: '50px',
                        textTransform: 'none',
                        minWidth: 'auto',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                    }}
                >
                    {/* Avatar */}
                    <Avatar 
                        src={user?.picture} 
                        sx={{ 
                            width: { xs: 32, sm: 36 }, 
                            height: { xs: 32, sm: 36 }
                        }}
                    >
                        <PersonOutlined />
                    </Avatar>
                    
                    {/* User name - visible on larger screens, now on the right */}
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontWeight: 500,
                            display: { xs: 'none', sm: 'block' },
                            maxWidth: { sm: 120, md: 180 },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {user?.name || user?.email}
                    </Typography>
                </Button>
                
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    sx={{
                        '& .MuiPaper-root': {
                            mt: 1.5,
                            minWidth: 200,
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                        }
                    }}
                >
                    {/* User info - shown in dropdown for mobile */}
                    <MenuItem 
                        disabled 
                        sx={{ 
                            opacity: 1,
                            cursor: 'default',
                            '&:hover': { backgroundColor: 'transparent' },
                            display: { xs: 'flex', sm: 'none' }
                        }}
                    >
                        <ListItemIcon>
                            <Avatar 
                                src={user?.picture} 
                                sx={{ width: 24, height: 24 }}
                            >
                                <PersonOutlined />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                            primary={user?.name || user?.email}
                            primaryTypographyProps={{ 
                                variant: 'body2', 
                                fontWeight: 500,
                                noWrap: true
                            }}
                        />
                    </MenuItem>
                    
                    <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
                    
                    {/* Theme toggle */}
                    <MenuItem 
                        onClick={handleThemeChange}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <ListItemIcon>
                            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </ListItemIcon>
                        <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
                    </MenuItem>
                    
                    <Divider />
                    
                    {/* Logout */}
                    <MenuItem 
                        onClick={handleLogout}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <ListItemIcon>
                            <LogoutOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 