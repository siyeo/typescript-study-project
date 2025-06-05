import React from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import { Box, styled } from '@mui/material';


const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.default,
    color:theme.palette.text.primary,
    width:"100%",
    padding:"8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));


const Library = () => {
  return (
    <div>
      <ContentBox><EmptyPlaylist/></ContentBox>
    </div>
  )
}

export default Library
