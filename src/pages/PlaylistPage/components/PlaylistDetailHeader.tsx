import React from 'react';
import { Typography, Box, Link, Avatar } from '@mui/material';
import { MusicNote as MusicNoteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Playlist } from '../../../models/playlist';
import Loading from '../../../common/components/Loading';

interface PlaylistComponentProps {
  playlist?: Playlist;
}

const PlaylistContainer = styled(Box)({
  background: 'linear-gradient(180deg, rgba(29, 185, 84, 0.2) 0%, rgba(18, 18, 18, 1) 100%)',
  padding: '24px',
  borderRadius:'8px',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '24px',
  color: 'white',
});

const CoverImage = styled('img')({
  width: '232px',
  height: '232px',
  borderRadius: '4px',
  boxShadow: '0 4px 60px rgba(0, 0, 0, 0.5)',
  objectFit: 'cover',
});

const PlaceholderIcon = styled(Box)({
  width: '232px',
  height: '232px',
  backgroundColor: '#282828',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 60px rgba(0, 0, 0, 0.5)',
});

const ContentSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
});

const PlaylistType = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'capitalize',
  marginBottom: '4px',
});

const PlaylistTitle = styled(Typography)({
  fontSize: '30px',
  fontWeight: 900,
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '@media (max-width: 768px)': {
    fontSize: '48px',
    lineHeight: '48px',
  },
});

const PlaylistDescription = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#b3b3b3',
  marginBottom: '8px',
});

const MetaInfo = styled(Box)({
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
});

const OwnerButton = styled('button')({
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
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "20px",
  height: "20px",
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
          <MusicNoteIcon sx={{ fontSize: '64px', color: '#7f7f7f' }} />
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
        {description  && description !== "null" && description.trim() !== "" && (
          <PlaylistDescription variant="body2">
            {decodeHtmlEntities(description)}
          </PlaylistDescription>
        )}

        {/* 메타 정보 (소유자, 팔로워 수, 곡 수) */}
        <MetaInfo>
          {owner?.display_name && (
            <>
              <StyledAvatar src="https://upload.wikimedia.org/wikipedia/commons/7/75/Spotify_icon.png"/>
              <OwnerButton onClick={handleOwnerClick}>
                {owner.display_name}
              </OwnerButton>
              <span className="separator">•</span>
            </>
          )}
          
          {followers?.total !== undefined && (
            <>
              <span>{followers.total.toLocaleString()} followers</span>
              <span className="separator">•</span>
            </>
          )}
          
          <span>
            {tracks?.total || 0} songs
          </span>
        </MetaInfo>
      </ContentSection>
    </PlaylistContainer>
  );
};

export default PlaylistDetailHeader;