import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { NavLink } from 'react-router';

const MobileNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: '0 16px',
  [theme.breakpoints.up('md')]: {
    display: 'none', // 데스크톱에서는 숨김
  },
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '8px',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease',
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.text.secondary,
  },
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const NavIcon = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: 1,
}));

const MobileNavbar = () => {
  return (
    <MobileNavContainer>
      <NavItem to="/">
        <NavIcon>
          <HomeIcon />
        </NavIcon>
        <NavText>Home</NavText>
      </NavItem>
      
      <NavItem to="/search">
        <NavIcon>
          <SearchIcon />
        </NavIcon>
        <NavText>Search</NavText>
      </NavItem>
      
      <NavItem to="/mobileLibrary">
        <NavIcon>
          <PlaylistPlayIcon />
        </NavIcon>
        <NavText>Library</NavText>
      </NavItem>
    </MobileNavContainer>
  );
};

export default MobileNavbar;