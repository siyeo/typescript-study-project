import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { 
  AddCircleOutline, 
  Login, 
  MusicNote,
  ErrorOutline 
} from '@mui/icons-material';
import { Track } from '../../models/track';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';
import useAddPlaylistItems from '../../hooks/useAddPlaylistItems';
import { SimplifiedPlaylist } from '../../models/playlist';

// 플레이리스트 버튼 컴포넌트
interface PlaylistButtonProps {
  track: Track;
}

// 플레이리스트 드롭다운 스타일
const PlaylistDropdownStyle = styled(Box)({
  position: 'absolute',
  backgroundColor: '#282828',
  color: 'white',
  width: '250px',
  maxHeight: '400px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  top: '100%',
  right: 0,
  marginTop: '4px',
    display: 'flex',
  flexDirection: 'column',
  
  // 커스텀 스크롤바
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '&::-webkit-scrollbar-thumb:active': {
    background: 'rgba(255, 255, 255, 0.7)',
  },
});

const PlaylistItem = styled(Box)({
  padding: '12px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
});

const PlaylistImage = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  objectFit: 'cover',
  marginRight: '12px',
});

const PlaylistInfo = styled(Box)({
  minWidth: 0,
  flex: 1,
});

const PlaylistName = styled(Typography)({
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginBottom: '2px',
  fontSize: '14px',
});

const PlaylistTracks = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const ActionButton = styled(IconButton)({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    color: 'white',
  },
});

const IconContainer = styled(Box)({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
});

const LoadingContainer = styled(Box)({
  padding: '20px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

const ErrorContainer = styled(Box)({
  padding: '16px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

const EmptyContainer = styled(Box)({
  padding: '16px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const ScrollableContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
  
  // 커스텀 스크롤바 (내용 영역)
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.4)',
    },
  },
});

const LoadMoreTrigger = styled(Box)({
  height: '1px',
  width: '100%',
});

const InfiniteLoadingContainer = styled(Box)({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
});

const PlaylistDropdown: React.FC<PlaylistButtonProps> = ({ track }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [isManualLoading, setIsManualLoading] = useState(false); // 수동 로딩 제어
    const addTrackMutation = useAddPlaylistItems(false);
    
    // 무한 스크롤 트리거를 위한 ref
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.1,
        rootMargin: '20px',
        triggerOnce: false,
    });
    
    const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
        limit: 15,
        offset: 0
    });
    
    const { data: user } = useGetCurrentUserProfile();
    
    // 무한 스크롤 로직
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && !isManualLoading && isOpen && shouldFetch) {
            setIsManualLoading(true);
        
            fetchNextPage().finally(() => {
                // 로딩 완료 후 1초 대기 (중복 로딩 방지)
                setTimeout(() => {
                setIsManualLoading(false);
                }, 1000);
            });
        }
    }, [inView, hasNextPage, isFetchingNextPage, isManualLoading, fetchNextPage, isOpen]);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
        if (!shouldFetch) {
            setShouldFetch(true);
        }
    };

    const handlePlaylistSelect = (playlistId: string, trackId:string) => {
        addTrackMutation.mutate({
            playlistId: playlistId,
            params: {
            position: 0,
            uris: [`spotify:track:${trackId}`]
            }
        })
        setIsOpen(false);
    };

    const handleLoginRequired = () => {
        setIsOpen(false);
        window.location.href = '/login-required';
    };

    // 모든 페이지의 플레이리스트를 합치기
    const allPlaylists = React.useMemo(() => {
        if (!data?.pages) return [];
        
        const combined = data.pages.flatMap(page => {
        if (Array.isArray(page.items)) {
            return page.items;
        }
        if (Array.isArray(page)) {
            return page;
        }
        return [];
        });
        
        return combined;
    }, [data?.pages]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('.playlist-dropdown-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <Box className="playlist-dropdown-container" sx={{ position: 'relative' }}>
        <ActionButton size="medium" onClick={handleClick}>
            <AddCircleOutline />
        </ActionButton>

        {isOpen && shouldFetch && (
            <PlaylistDropdownStyle>
            {/* 초기 로딩 상태 */}
            {isLoading && allPlaylists.length === 0 && (
                <LoadingContainer>
                <Box
                    sx={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(29, 185, 84, 0.3)',
                    borderTop: '2px solid #1DB954',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                    }}
                />
                <Typography variant="body2">플레이리스트 불러오는 중...</Typography>
                </LoadingContainer>
            )}

            {/* 로그인 필요 */}
            {!user && !isLoading && (
                <PlaylistItem onClick={handleLoginRequired}>
                <IconContainer sx={{ backgroundColor: 'rgba(29, 185, 84, 0.2)' }}>
                    <Login sx={{ color: '#1DB954', fontSize: '20px' }} />
                </IconContainer>
                <PlaylistInfo>
                    <PlaylistName>로그인이 필요합니다</PlaylistName>
                    <PlaylistTracks>클릭하여 로그인하기</PlaylistTracks>
                </PlaylistInfo>
                </PlaylistItem>
            )}

            {/* 에러 상태 */}
            {error && user && (
                <ErrorContainer>
                <ErrorOutline sx={{ color: '#ff6b6b', fontSize: '24px' }} />
                <Typography variant="body2" sx={{ color: '#ff6b6b' }}>
                    플레이리스트를 불러올 수 없습니다
                </Typography>
                </ErrorContainer>
            )}

            {/* 플레이리스트 목록 */}
            {!error && user && allPlaylists.length > 0 && (
                <>
                <ScrollableContent>
                {allPlaylists.map((playlist: SimplifiedPlaylist, index: number) => (
                    <PlaylistItem 
                    key={`${playlist.id}-${index}`} 
                    onClick={() => handlePlaylistSelect(playlist.id!, track.id!)}
                    >
                    {playlist.images?.[0]?.url ? (
                        <PlaylistImage 
                        src={playlist.images[0].url} 
                        alt={playlist.name || 'Playlist'}
                        />
                    ) : (
                        <IconContainer sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <MusicNote sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '20px' }} />
                        </IconContainer>
                    )}
                    <PlaylistInfo>
                        <PlaylistName>
                        {playlist.name || '이름 없는 플레이리스트'}
                        </PlaylistName>
                    </PlaylistInfo>
                    </PlaylistItem>
                ))}

                {/* 무한 스크롤 트리거 */}
                {hasNextPage && (
                    <LoadMoreTrigger ref={loadMoreRef} />
                )}

                {/* 추가 로딩 표시 - 드롭다운 내부의 작은 로딩 */}
                {(isFetchingNextPage || isManualLoading) && (
                    <InfiniteLoadingContainer>
                    <Box
                        sx={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(29, 185, 84, 0.3)',
                        borderTop: '2px solid #1DB954',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                        },
                        }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        더 불러오는 중...
                    </Typography>
                    </InfiniteLoadingContainer>
                )}
                </ScrollableContent>
                </>
            )}

            {/* 플레이리스트가 없는 경우 */}
            {!isLoading && !error && user && allPlaylists.length === 0 && shouldFetch && (
                <EmptyContainer>
                <MusicNote sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '32px' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    플레이리스트가 없습니다
                </Typography>
                </EmptyContainer>
            )}
            </PlaylistDropdownStyle>
        )}
        </Box>
    );
};

export default PlaylistDropdown;