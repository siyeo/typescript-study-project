import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useNavigate, useParams } from 'react-router';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { PlayArrow, FavoriteBorder, MoreHoriz } from '@mui/icons-material';
import Loading from '../../common/components/Loading';
import React from 'react';


const MainContainer = styled(Box)({
  backgroundColor: '#121212',
  minHeight: '100vh',
  borderRadius: 1,
  padding: '24px',
  color: 'white',
});

const HeaderContainer = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '40vh',
  textAlign: 'center',
});

const SectionTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'white',
});

const GridContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '32px',
  marginBottom: '48px',
  '@media (min-width: 1024px)': {
    gridTemplateColumns: '4fr 6fr',
  },
});

const TopResultCard = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: '24px',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

const TopResult = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '16px',
});

const TopResultImage = styled('img')({
  width: '120px',
  height: '120px',
  borderRadius: '8px',
  objectFit: 'cover',
});

const TopResultInfo = styled(Box)({
  width: '100%',
});

const TopResultTitle = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: 'white',
});

const TopResultSubtitle = styled(Typography)({
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 0.7)',
});

const ActionButton = styled(IconButton)({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    color: 'white',
  },
});

const TracksContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const TrackItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '& .track-number': {
      display: 'none',
    },
    '& .play-button': {
      display: 'block',
    },
    '& .track-actions': {
      display: 'flex',
    },
  },
});

const TrackNumber = styled(Typography)({
  width: '40px',
  textAlign: 'center',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.7)',
});

const TrackPlayButton = styled(IconButton)({
  width: '16px',
  height: '16px',
  display: 'none',
  color: 'white',
  padding: 0,
});

const TrackImage = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  objectFit: 'cover',
});

const TrackInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const TrackTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: '500',
  color: 'white',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TrackArtist = styled(Typography)({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.7)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TrackActions = styled(Box)({
  display: 'none',
  alignItems: 'center',
  gap: '8px',
});

const TrackDuration = styled(Typography)({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.7)',
  width: '48px',
  textAlign: 'right',
});

const ArtistAlbumGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // 기본: 1개
  gridAutoRows: '1fr',
  gap: '16px',
  marginBottom: '48px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)', // 중간: 3개
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(6, 1fr)', // 큰 화면: 6개
  },
  '& > *': {
    width: '100%',
    minWidth: 0,
  },
});

const ArtistAlbumCard = styled(Box)({
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minWidth: 0,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '& .hover-play-button': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

const ArtistAlbumImageContainer = styled(Box)({
  position: 'relative',
  marginBottom: '12px',
  width: '100%',
  aspectRatio: '1',
  flexShrink: 0,
});

const ArtistImage = styled('img')({
  width: '100%',
  aspectRatio: '1',
  borderRadius: '50%',
  objectFit: 'cover',
});

const AlbumImage = styled('img')({
  width: '100%',
  aspectRatio: '1',
  borderRadius: '8px',
  objectFit: 'cover',
});

const HoverPlayButton = styled(IconButton)({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  width: '48px',
  height: '48px',
  backgroundColor: '#1DB954',
  color: 'black',
  opacity: 0,
  transform: 'translateY(8px)',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translateY(0) scale(1.05)',
  },
});

const ArtistAlbumTitle = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  fontSize: '14px', // 기본 크기
  flexShrink: 0,
  '@media (min-width: 768px)': {
    fontSize: '15px',
  },
  '@media (min-width: 1200px)': {
    fontSize: '16px',
  },
});

const ArtistAlbumSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  fontSize: '12px', // 기본 크기
  marginTop: 'auto',
  '@media (min-width: 768px)': {
    fontSize: '13px',
  },
  '@media (min-width: 1200px)': {
    fontSize: '14px',
  },
});

const SearchResultPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  if (!keyword) {
    navigate(`/search`);
    return null;
  }
  const {data,  
  isLoading, 
  error, 
  hasNextPage, 
  isFetchingNextPage, 
  fetchNextPage } = useSearchItemsByKeyword({
    q:keyword,
    type:[SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: PAGE_LIMIT,
    offset: 0
  });

  const searchData = data?.pages?.[0] || {};
  const tracks = searchData.tracks?.items || [];
  const artists = searchData.artists?.items || [];
  const albums = searchData.albums?.items || [];

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getDisplayCount = () => {
    if (windowWidth >= 1200) return 6; // 데스크톱: 6개
    if (windowWidth >= 768) return 3;  // 태블릿: 3개
    return 2; // 모바일: 2개
  };
  const displayCount = getDisplayCount();
  const displayArtists = artists.slice(0, displayCount);
  const displayAlbums = albums.slice(0, displayCount);

  const formatDuration = (ms?: number) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  if (isLoading) {
    return (
      <Loading show={true}/>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <MainContainer>
        <HeaderContainer>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
            검색 중 오류가 발생했습니다.
          </Typography>
        </HeaderContainer>
      </MainContainer>
    );
  }

  // 검색 결과가 없는 경우
  if (tracks.length === 0 && artists.length === 0 && albums.length === 0) {
    return (
      <MainContainer>
        <HeaderContainer>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
            검색 결과가 없습니다.
          </Typography>
        </HeaderContainer>
      </MainContainer>
    );
  }

  const topResult = tracks[0]; // 첫 번째 트랙을 상위 결과로 사용

  return (
    <MainContainer>
      {/* 상위 결과와 노래 섹션 */}
      <GridContainer>
        {/* 상위 결과 - 트랙이 있을 때만 표시 */}
        {topResult && (
          <Box>
            <SectionTitle>Top result</SectionTitle>
            <TopResultCard>
              <TopResult>
                <TopResultImage 
                  src={topResult.album?.images?.[0]?.url || '/api/placeholder/80/80'} 
                  alt={topResult.name}
                />
                <TopResultInfo>
                  <TopResultTitle>{topResult.name}</TopResultTitle>
                  <TopResultSubtitle>
                    Song · {topResult.artists?.map(artist => artist.name).join(', ')}
                  </TopResultSubtitle>
                </TopResultInfo>
              </TopResult>
            </TopResultCard>
          </Box>
        )}

        {/* 노래 섹션 - 트랙이 있을 때만 표시 */}
        {tracks.length > 0 && (
          <Box>
            <SectionTitle>Songs</SectionTitle>
            <TracksContainer>
              {tracks.slice(0, 4).map((track, index) => (
                <TrackItem key={track.id}>
                  <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TrackNumber className="track-number">
                      {index + 1}
                    </TrackNumber>
                    <TrackPlayButton className="play-button">
                      <PlayArrow style={{ width: '20px', height: '20px', fill: 'currentColor' }} />
                    </TrackPlayButton>
                  </Box>
                  <TrackImage 
                    src={track.album?.images?.[0]?.url || '/api/placeholder/40/40'} 
                    alt={track.name}
                  />
                  <TrackInfo>
                    <TrackTitle>{track.name}</TrackTitle>
                    <TrackArtist>
                      {track.artists?.map(artist => artist.name).join(', ')}
                    </TrackArtist>
                  </TrackInfo>
                  <TrackActions className="track-actions">
                    <ActionButton size="small">
                      <FavoriteBorder style={{ width: '16px', height: '16px' }} />
                    </ActionButton>
                    <ActionButton size="small">
                      <MoreHoriz style={{ width: '16px', height: '16px' }} />
                    </ActionButton>
                  </TrackActions>
                  <TrackDuration>
                    {formatDuration(track.duration_ms)}
                  </TrackDuration>
                </TrackItem>
              ))}
            </TracksContainer>
          </Box>
        )}
      </GridContainer>

      {/* 아티스트 섹션 - 아티스트가 있을 때만 표시 */}
      {artists.length > 0 && (
        <Box>
          <SectionTitle>Artists</SectionTitle>
          <ArtistAlbumGrid>
            {displayArtists.map((artist) => (
              <ArtistAlbumCard key={artist.id}>
                <ArtistAlbumImageContainer>
                  <ArtistImage 
                    src={artist.images?.[0]?.url || '/api/placeholder/160/160'} 
                    alt={artist.name}
                  />
                  <HoverPlayButton className="hover-play-button">
                    <PlayArrow style={{ width: '20px', height: '20px', fill: 'currentColor', marginLeft: '2px' }} />
                  </HoverPlayButton>
                </ArtistAlbumImageContainer>
                <ArtistAlbumTitle>{artist.name}</ArtistAlbumTitle>
                <ArtistAlbumSubtitle>Artist</ArtistAlbumSubtitle>
              </ArtistAlbumCard>
            ))}
          </ArtistAlbumGrid>
        </Box>
      )}

      {/* 앨범 섹션 - 앨범이 있을 때만 표시 */}
      {albums.length > 0 && (
        <Box>
          <SectionTitle>Albums</SectionTitle>
          <ArtistAlbumGrid>
            {displayAlbums.map((album) => (
              <ArtistAlbumCard key={album.id}>
                <ArtistAlbumImageContainer>
                  <AlbumImage 
                    src={album.images?.[0]?.url || '/api/placeholder/160/160'} 
                    alt={album.name}
                  />
                  <HoverPlayButton className="hover-play-button">
                    <PlayArrow style={{ width: '20px', height: '20px', fill: 'currentColor', marginLeft: '2px' }} />
                  </HoverPlayButton>
                </ArtistAlbumImageContainer>
                <ArtistAlbumTitle>{album.name}</ArtistAlbumTitle>
                <ArtistAlbumSubtitle>
                  {new Date(album.release_date).getFullYear()} · {album.artists?.map(artist => artist.name).join(', ')}
                </ArtistAlbumSubtitle>
              </ArtistAlbumCard>
            ))}
          </ArtistAlbumGrid>
        </Box>
      )}
    </MainContainer>
  );
}

export default SearchResultPage
