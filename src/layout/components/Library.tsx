import React, { useEffect } from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import { Box, styled } from '@mui/material';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import Playlist from './Playlist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';
import Loading from '../../common/components/Loading';


const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.default,
    color:theme.palette.text.primary,
    width:"100%",
    padding:"8px",
}));

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const {data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetCurrentUserPlaylists({limit:15, offset:0});

  const {data:user} = useGetCurrentUserProfile();
  useEffect(()=>{
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView]);
  if (!user) return <EmptyPlaylist/>;
  return (
    <div>
      <ContentBox>
        {data && data?.pages.length > 0 ? (
          <PlaylistContainer>
            {data.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    <Playlist playlistData={page.items || []} />
                </React.Fragment>
            ))}
            <div ref={ref} style={{ minHeight: '1px' }}>{isFetchingNextPage && <Loading show={true}/>}</div>
          </PlaylistContainer>
        ) : <EmptyPlaylist/>
        }
        </ContentBox>
    </div>
  )
}

export default Library
