import React from 'react'
import './AppLayout.css';
import { NavLink, Outlet } from 'react-router';
import { Box, styled, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import Navbar from './components/Navbar';


const Layout = styled("div")({
    display:"flex",
    height:"100vh",
    padding:"8px",
});
const SideBar = styled("div")(({theme})=>({
    width:"331px",
    height:"100%", //100vh ->layout  height
    display:"flex",
    flexDirection:"column",
    [theme.breakpoints.down("sm")]:{
        display:"none",
    },
    marginRight:"5px",
}));
const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.paper,
    color:theme.palette.text.primary,
    width:"100%",
    padding:"8px",
    marginBottom:"8px",
    marginRight:"8px"
}));
const Navlist = styled("ul")({
    listStyle:"none",
    padding:0,
    margin:0
});
const StyledNavLink = styled(NavLink)(({theme})=>({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    gap:"20px",
    margin:"20px",
    color:theme.palette.text.secondary,
    "&:hover":{
        color:theme.palette.text.primary,
    },
    "&.active":{
        color:theme.palette.text.primary,
    },
}));


const AppLayout = () => {
  return (
        <Layout>
            <SideBar>
                <ContentBox>
                    <Navlist>
                        <StyledNavLink to="/"><HomeIcon/><Typography variant="h2" fontWeight={700}>Home</Typography></StyledNavLink>
                        <StyledNavLink to="/search"><SearchIcon/><Typography variant="h2" fontWeight={700}>Search</Typography></StyledNavLink>
                    </Navlist>
                </ContentBox>
                <ContentBox height="100%">
                    <Navlist>
                        <LibraryHead/>
                        <Library/>
                    </Navlist>
                </ContentBox>
            </SideBar>
            <ContentBox>
                <Navbar/>
                <Outlet />
            </ContentBox>
        </Layout>
  )
}

export default AppLayout
