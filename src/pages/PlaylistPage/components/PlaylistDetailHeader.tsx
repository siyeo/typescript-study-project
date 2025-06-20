import React from 'react';
import { Typography, Box, Link, Avatar } from '@mui/material';
import { MusicNote as MusicNoteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Playlist } from '../../../models/playlist';
import Loading from '../../../common/components/Loading';

interface PlaylistComponentProps {
  playlist?: Playlist;
}

const PlaylistContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(29, 185, 84, 0.2) 0%, rgba(18, 18, 18, 1) 100%)',
  padding: '24px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '24px',
  color: 'white',
  // 모바일에서는 세로 레이아웃
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    gap: '16px',
  },
}));

const CoverImage = styled('img')(({ theme }) => ({
  width: '232px',
  height: '232px',
  borderRadius: '4px',
  boxShadow: '0 4px 60px rgba(0, 0, 0, 0.5)',
  objectFit: 'cover',
  // 모바일에서는 더 작게
  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '200px',
  },
}));

const PlaceholderIcon = styled(Box)(({ theme }) => ({
  width: '232px',
  height: '232px',
  backgroundColor: '#282828',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 60px rgba(0, 0, 0, 0.5)',
  // 모바일에서는 더 작게
  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '200px',
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  // 모바일에서는 중앙 정렬
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    flex: 'none',
    width: '100%',
  },
}));

const PlaylistType = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'capitalize',
  marginBottom: '4px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    marginBottom: '8px',
  },
}));

const PlaylistTitle = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 900,
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  lineHeight: '1.2',
  // 모바일에서는 더 큰 타이틀
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '1.1',
    marginBottom: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
}));

const PlaylistDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#b3b3b3',
  marginBottom: '8px',
  // 모바일에서는 좀 더 작게
  [theme.breakpoints.down('md')]: {
    fontSize: '13px',
    lineHeight: '1.4',
    marginBottom: '12px',
  },
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 400,
  color: 'white',
  '& .separator': {
    margin: '0 4px',
    color: '#b3b3b3',
  },
  // 모바일에서는 중앙 정렬과 줄바꿈 허용
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: '13px',
    gap: '6px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    gap: '4px',
  },
}));

const OwnerButton = styled('button')(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: 'inherit',
  fontFamily: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "20px",
  height: "20px",
  [theme.breakpoints.down('sm')]: {
    width: "16px",
    height: "16px",
  },
}));

const MobileMetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}));

const PlaylistDetailHeader: React.FC<PlaylistComponentProps> = ({ playlist }) => {
  if (!playlist) {
    return <Loading show={true}/>;
  }

  const { 
    public: isPublic, 
    images, 
    name, 
    owner,
    description,
    followers,
    tracks 
  } = playlist;

  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const handleOwnerClick = () => {
    if (owner?.external_urls?.spotify) {
      window.open(owner.external_urls.spotify, '_blank');
    }
  };

  return (
    <PlaylistContainer>
      {/* 플레이리스트 커버 이미지 */}
      {images?.[0]?.url ? (
        <CoverImage src={images[0].url} alt={`${name} playlist cover`} />
      ) : (
        <PlaceholderIcon>
          <MusicNoteIcon sx={{ fontSize: { xs: '48px', md: '64px' }, color: '#7f7f7f' }} />
        </PlaceholderIcon>
      )}

      {/* 플레이리스트 정보 */}
      <ContentSection>
        {/* 플레이리스트 타입 */}
        <PlaylistType variant="body2">
          {isPublic ? '공개 플레이리스트' : '비공개 플레이리스트'}
        </PlaylistType>

        {/* 플레이리스트 제목 */}
        <PlaylistTitle variant="h1">
          {name ? decodeHtmlEntities(name) : ''}
        </PlaylistTitle>

        {/* 플레이리스트 설명 */}
        {description && description !== "null" && description.trim() !== "" && (
          <PlaylistDescription variant="body2">
            {decodeHtmlEntities(description)}
          </PlaylistDescription>
        )}

        {/* 메타 정보 (소유자, 팔로워 수, 곡 수) */}
        <MetaInfo>
          {owner?.display_name && (
            <MobileMetaItem>
              <StyledAvatar src="https://upload.wikimedia.org/wikipedia/commons/7/75/Spotify_icon.png"/>
              <OwnerButton onClick={handleOwnerClick}>
                {owner.display_name}
              </OwnerButton>
              <span className="separator">•</span>
            </MobileMetaItem>
          )}
          
          {followers?.total !== undefined && (
            <MobileMetaItem>
              <span>{followers.total.toLocaleString()} followers</span>
              <span className="separator">•</span>
            </MobileMetaItem>
          )}
          
          <MobileMetaItem>
            <span>{tracks?.total || 0} songs</span>
          </MobileMetaItem>
        </MetaInfo>
      </ContentSection>
    </PlaylistContainer>
  );
};

export default PlaylistDetailHeader;