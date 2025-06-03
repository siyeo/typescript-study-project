import { Button, styled, Typography  } from '@mui/material';
import React from 'react'

const StyledText = styled("div")(({theme})=>({
    textDecoration:"none",
    gap:"20px",
    margin:"20px",
    color:theme.palette.text.primary,
}));

const StyledTitleText = styled("div")(({theme})=>({
    textDecoration:"none",
    gap:"20px",
    margin:"10px",
    color:theme.palette.text.primary,
}));

const StyledSubText = styled("div")(({theme})=>({
    textDecoration:"none",
    gap:"20px",
    margin:"10px",
    color:theme.palette.text.primary,
}));

const StyledButton = styled(Button)({
  marginTop: "10px",
  gap: "8px",
});

const EmptyPaylist = () => {
  return (
    <div>
        <StyledText>
          <StyledTitleText><Typography variant="h2" fontWeight={700}>Create your first playlist</Typography></StyledTitleText>
          <StyledSubText><Typography variant="h2" fontWeight={300}>lt's easy, we'll help you</Typography></StyledSubText>
          <StyledButton variant="contained" color="secondary" size="large">Create playlist</StyledButton>
        </StyledText>
    </div>
  )
}

export default EmptyPaylist
