import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import LoginButton from '../../common/components/LoginButton';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "45px",
  height: "45px",
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  cursor: 'pointer',

  // PersonIcon 스타일링
  '& .MuiSvgIcon-root': {
    fontSize: '2rem', // Avatar 크기의 약 80%
  },
  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 0.2s ease"
  }
}));


const Navbar = () => {
  // 실제로 useGetCurrentUserProfile 훅 사용
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // localStorage에서 access_token 제거
    localStorage.removeItem('access_token');
    
    // 메뉴 닫기
    handleClose();
    
    const personalPages = ['/playlist', '/profile'];
    const currentPath = window.location.pathname;
    
    if (personalPages.some(page => currentPath.startsWith(page))) {
      window.location.href = '/login-required';
    } else {
      // 검색, 탐색 페이지는 그대로 유지
      window.location.reload();
    }
  };

  const handleProfile = () => {
    // 프로필 페이지로 이동하는 로직
    console.log('프로필 페이지로 이동');
    handleClose();
  };

  const handleSettings = () => {
    // 설정 페이지로 이동하는 로직
    console.log('설정 페이지로 이동');
    handleClose();
  };

  return (
    <Box 
      display="flex" 
      justifyContent="flex-end" 
      alignItems="center" 
      height="64px"
    >
      {userProfile ? (
        <>
          <StyledAvatar 
            src={userProfile.images?.[0]?.url} 
            alt={userProfile.display_name}
            onClick={handleAvatarClick}
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <PersonIcon/>
          </StyledAvatar>
          
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                minWidth: 200,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* 사용자 정보 표시 */}
            <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {userProfile.display_name}
              </Typography>
              {userProfile.email && (
                <Typography variant="caption" color="text.secondary">
                  {userProfile.email}
                </Typography>
              )}
            </Box>

            {/* 메뉴 아이템들 */}
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>프로필</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>설정</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText>로그아웃</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;