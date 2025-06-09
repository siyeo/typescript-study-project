import { Avatar, Box, styled } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import PersonIcon from '@mui/icons-material/Person';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "45px",
  height: "45px",
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

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
  const {data:userProfile} = useGetCurrentUserProfile();
  return (
    <Box 
      display="flex" 
      justifyContent="flex-end" 
      alignItems="center" 
      height="64px"
    >
      {userProfile ? (
        <StyledAvatar 
          src={userProfile.images?.[0]?.url} 
          alt={userProfile.display_name}
        >
          <PersonIcon/>
        </StyledAvatar>
      ) : (
        <LoginButton/>
      )}
    </Box>
  )
}

export default Navbar
