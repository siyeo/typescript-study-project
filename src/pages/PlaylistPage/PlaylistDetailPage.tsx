import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../../hooks/useGetPlaylist';
import PlaylistDetailHeader from './components/PlaylistDetailHeader';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import { Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeskTopPlaylistItem from './components/DeskTopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import Loading from '../../common/components/Loading';
import { useInView } from 'react-intersection-observer';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';

const SpotifyTableContainer = styled(TableContainer)<{ component?: React.ElementType }>(({ theme }) => ({
  backgroundColor: '#121212',
  borderRadius: '8px',
  border: 'none',
  overflow: 'auto',
  
  // 스크롤바 숨기기
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
}));

// Spotify 스타일 Table
const SpotifyTable = styled(Table)({
  backgroundColor: '#121212',
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    padding: '8px 16px',
    fontSize: '14px',
  },
});

// Spotify 스타일 TableHead
const SpotifyTableHead = styled(TableHead)({
  backgroundColor: '#121212',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  '& .MuiTableCell-head': {
    backgroundColor: '#121212',
    color: '#b3b3b3',
    fontWeight: 500,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '1px solid #2a2a2a',
    padding: '16px',
  },
});


const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [tableHeight, setTableHeight] = useState(400);
  
  if (id === undefined) return <Navigate to="/" />;
  
  const { data: playlist } = useGetPlaylist({ playlist_id: id });
  const { 
    data: playlistItems, 
    isLoading: playlistItemsLoading, 
    error: playlistItemsError, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });
  
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 동적 높이 계산
  useEffect(() => {
    const calculateHeight = () => {
      const headerHeight = 300; // PlaylistDetailHeader 높이
      const footerHeight = 80; // 하단 여백
      const padding = 40; // 여백
      
      const availableHeight = window.innerHeight - headerHeight - footerHeight - padding;
      setTableHeight(Math.max(300, availableHeight));
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  // const 변수로 Spotify 스타일 테이블 정의
  const spotifyPlaylistTable = (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh' }} >
      <PlaylistDetailHeader playlist={playlist} />
      
      {(!playlistItems?.pages?.[0]?.items?.length) ? (
        <EmptyPlaylistWithSearch id={id}/>
      ) : (
        <Box sx={{ padding: 2, paddingTop: 0 }}>
          <SpotifyTableContainer
            sx={{ 
              height: tableHeight,
              maxWidth: '100%',
              boxShadow: 'none'
            }}
          >
            <SpotifyTable stickyHeader>
              <SpotifyTableHead>
                <TableRow>
                  <TableCell sx={{ width: '40px', textAlign: 'center' }}>
                    #
                  </TableCell>
                  <TableCell sx={{ width: '40%' }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ width: '25%' }}>
                    Album
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    Date added
                  </TableCell>
                  <TableCell sx={{ width: '80px', textAlign: 'center' }}>
                    Duration
                  </TableCell>
                </TableRow>
              </SpotifyTableHead>
              <TableBody>
                {playlistItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemIndex) => {
                    const globalIndex = pageIndex * PAGE_LIMIT + itemIndex + 1;
                    return (
                      <DeskTopPlaylistItem 
                        item={item} 
                        key={globalIndex} 
                        index={globalIndex}
                      />
                    );
                  })
                )}
                {/* 무한 스크롤 트리거 */}
                <TableRow>
                  <TableCell 
                    colSpan={5} 
                    sx={{ 
                      border: 'none', 
                      padding: 0,
                      backgroundColor: 'transparent'
                    }}
                  >
                    <div ref={ref} style={{ minHeight: '1px' }}>
                      {isFetchingNextPage && (
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          padding: 2 
                        }}>
                          <Loading show={true} />
                        </Box>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </SpotifyTable>
          </SpotifyTableContainer>
        </Box>
      )}
    </Box>
  );

  return spotifyPlaylistTable;
};

export default PlaylistDetailPage
