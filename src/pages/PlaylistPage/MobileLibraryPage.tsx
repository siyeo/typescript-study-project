import React, { useEffect } from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import Loading from '../../common/components/Loading';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { getSpotifyAuthUrl } from '../../utils/auth';

// 페이지 컨테이너
const PageContainer = styled(Box)({
  height: '100vh',
  backgroundColor: '#121212',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

// 헤더 영역
const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid #282828',
  backgroundColor: '#121212',
  flexShrink: 0,
});

// 제목 스타일
const PageTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: 'white',
});

// 추가 버튼 스타일
const AddButton = styled(IconButton)({
  color: '#b3b3b3',
  backgroundColor: 'transparent',
  padding: '8px',
  '&:hover': {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

// 콘텐츠 영역 (스크롤 가능)
const ContentArea = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '0 20px',
  paddingBottom: '80px', // 하단 네비게이션 공간 확보
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
});

// 플레이리스트 컨테이너
const PlaylistListContainer = styled(Box)({
  paddingTop: '16px',
});

// 모바일용 플레이리스트 아이템 (기존보다 조금 더 큰 크기)
const MobilePlaylistItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 0',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

// 플레이리스트 이미지 컨테이너 (모바일용 - 조금 더 큰 크기)
const MobileImageContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  flexShrink: 0,
  overflow: 'hidden',
}));

// 플레이리스트 이미지
const PlaylistImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
});

// 텍스트 정보 컨테이너
const TextInfo = styled(Box)({
  flex: 1,
  minWidth: 0, // 텍스트 오버플로우 방지
});

// 플레이리스트 제목
const PlaylistTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: 'white',
  marginBottom: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 플레이리스트 부제목
const PlaylistSubtitle = styled(Typography)({
  fontSize: '14px',
  color: '#b3b3b3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 빈 상태 컴포넌트
const EmptyStateContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  textAlign: 'center',
  minHeight: '300px',
});

const EmptyStateText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: 'white',
  marginBottom: '8px',
});

const EmptyStateSubText = styled(Typography)({
  fontSize: '14px',
  color: '#b3b3b3',
  marginBottom: '20px',
});

// 로딩 컨테이너
const LoadingContainer = styled(Box)({
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
});

const MobileLibraryPage = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 20, offset: 0 });
  const { data: user } = useGetCurrentUserProfile();
  const navigate = useNavigate();
  const {mutate:createPlaylist} = useCreatePlaylist()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddPlaylist = () => {
    if (user) {
        createPlaylist({name : "나의 플레이리스트"});
    } else {
        if (confirm("이 기능은 로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?")) {
            getSpotifyAuthUrl();
        }
    }
  };

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const EmptyState = () => (
    <EmptyStateContainer>
      <MusicNoteIcon sx={{ fontSize: '64px', color: '#535353', marginBottom: '16px' }} />
      <EmptyStateText>Create your first playlist</EmptyStateText>
      <EmptyStateSubText>It's easy, we'll help you</EmptyStateSubText>
      <IconButton
        onClick={handleAddPlaylist}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          padding: '12px 24px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Create playlist
      </IconButton>
    </EmptyStateContainer>
  );

  if (!user) {
    return (
      <PageContainer>
        <HeaderContainer>
          <PageTitle>My Library</PageTitle>
        </HeaderContainer>
        <ContentArea>
          <EmptyState />
        </ContentArea>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 헤더 */}
      <HeaderContainer>
        <PageTitle>My Library</PageTitle>
        <AddButton onClick={handleAddPlaylist}>
          <AddIcon sx={{ fontSize: '24px' }} />
        </AddButton>
      </HeaderContainer>

      {/* 콘텐츠 */}
      <ContentArea>
        {data && data?.pages.length > 0 ? (
          <PlaylistListContainer>
            {data.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.items?.map((playlist) => (
                  <MobilePlaylistItem 
                    key={playlist.id}
                    onClick={() => handlePlaylistClick(playlist.id)}
                  >
                    <MobileImageContainer>
                      {playlist.images?.[0]?.url ? (
                        <PlaylistImage 
                          src={playlist.images[0].url} 
                          alt={playlist.name} 
                        />
                      ) : (
                        <MusicNoteIcon sx={{ color: '#b3b3b3', fontSize: '32px' }} />
                      )}
                    </MobileImageContainer>
                    
                    <TextInfo>
                      <PlaylistTitle>
                        {playlist.name}
                      </PlaylistTitle>
                      <PlaylistSubtitle>
                        {playlist.type} • {playlist.owner?.display_name}
                      </PlaylistSubtitle>
                    </TextInfo>
                  </MobilePlaylistItem>
                ))}
              </React.Fragment>
            ))}
            
            {/* 무한 스크롤 트리거 */}
            <div ref={ref} style={{ minHeight: '1px' }}>
              {isFetchingNextPage && (
                <LoadingContainer>
                  <Loading show={true} />
                </LoadingContainer>
              )}
            </div>
          </PlaylistListContainer>
        ) : (
          <EmptyState />
        )}
      </ContentArea>
    </PageContainer>
  );
};

export default MobileLibraryPage;