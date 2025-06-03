import { styled, Typography } from '@mui/material';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import React from 'react'
import { NavLink } from 'react-router';
import Library from './Library';


const StyledText = styled("div")(({theme})=>({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    gap:"20px",
    margin:"20px",
    color:theme.palette.text.primary,
}));

const StyledRightButton = styled(NavLink)(({theme})=>({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    marginLeft:"auto",
    gap:"20px",
    color:theme.palette.text.primary,
}));
const LibraryHead = () => {
  return (
    <div>
        <StyledText><LibraryMusicOutlinedIcon/><Typography variant="h2" fontWeight={700}>Your Library</Typography><StyledRightButton to="/"><PlaylistAddIcon/></StyledRightButton></StyledText>
        <Library/>
    </div>
  )
}

export default LibraryHead
