import React from 'react'
import { Track } from '../../../models/track';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, MusicNote } from '@mui/icons-material';
import { addPlaylistItems } from '../../../apis/playlistApi';
import useAddPlaylistItems from '../../../hooks/useAddPlaylistItems';

interface SearchResultListProps {
    list:Track[];
    keyword:string;
    playlistId:string;
}

// 각각의 스타일을 별도 변수로 분리
const containerStyle = {
  maxHeight: '800px',
  overflowY: 'auto',
  backgroundColor: '#121212',
  padding: 2,
  borderRadius: 1,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#282828',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#535353',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#727272',
    },
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
};

const trackItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 1.5,
  borderRadius: 0.5,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  mb: 1,
  '&:hover': {
    backgroundColor: '#282828',
  },
};

const albumImageContainerStyle = {
  width: 56,
  height: 56,
  borderRadius: 0.5,
  marginRight: 2,
  backgroundColor: '#282828',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const albumImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const trackInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.3,
  minWidth: 0,
  flex: '0 0 250px',
};

const albumInfoStyle = (theme: any) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  flex: 1,
  marginLeft: 3,
  // 모바일에서는 앨범명 숨김
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
});

const addButtonContainerStyle = {
  marginLeft: 'auto',
};

const trackNameStyle = {
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
};

const artistNameStyle = {
  color: '#b3b3b3',
  fontSize: '14px',
};

const albumNameStyle = {
  color: '#b3b3b3',
  fontSize: '14px',
};

const addButtonStyle = {
  color: '#b3b3b3',
  '&:hover': {
    color: '#1db954',
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
};

const musicIconStyle = {
  color: '#b3b3b3',
  fontSize: '24px',
};

const emptyContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 4,
  minHeight: '200px',
  backgroundColor: '#121212',
  borderRadius: 1,
};

const emptyTextStyle = {
  color: '#b3b3b3',
  fontSize: '16px',
  textAlign: 'center',
  marginBottom: 1,
};

const SearchResultList = ({list, keyword, playlistId}:SearchResultListProps) => {
  const addTrackMutation = useAddPlaylistItems(true);
  return (
    <div>
      {list.length > 0 ?
      <Box sx={containerStyle}>
        {list.map((track, index) => {
          return (
            <Box 
              key={track.id || index}
              sx={trackItemStyle}
            >
              {/* 앨범 이미지 */}
              <Box sx={albumImageContainerStyle}>
                {track.album?.images?.[0]?.url ? (
                  <Box
                    component="img"
                    src={track.album.images[0].url}
                    alt={track.album?.name}
                    sx={albumImageStyle}
                  />
                ) : null}
                <MusicNote sx={{...musicIconStyle, display: track.album?.images?.[0]?.url ? 'none' : 'block'}} />
              </Box>

              {/* 트랙 정보 (노래명, 가수명) */}
              <Box sx={trackInfoStyle}>
                <Typography 
                  variant='body1' 
                  sx={trackNameStyle}
                  noWrap
                >
                  {track.name}
                </Typography>
                <Typography 
                  variant='body2' 
                  sx={artistNameStyle}
                  noWrap
                >
                  {track.artists?.[0]?.name}
                </Typography>
              </Box>

              {/* 앨범명 - 모바일에서는 숨김 */}
              <Box sx={(theme) => albumInfoStyle(theme)}>
                <Typography 
                  variant='body2' 
                  sx={albumNameStyle}
                  noWrap
                >
                  {track.album?.name}
                </Typography>
              </Box>

              {/* 추가 버튼 */}
              <Box sx={addButtonContainerStyle}>
                <IconButton
                  sx={addButtonStyle}
                  size="small"
                  onClick={() => {
                    addTrackMutation.mutate({
                      playlistId: playlistId,
                      params: {
                        position: 0,
                        uris: [`spotify:track:${track.id}`]
                      }
                  })}}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>
          )
        })}
      </Box>
      :
        <Box sx={emptyContainerStyle}>
          <Typography sx={emptyTextStyle}>
            "{keyword}" 에 대한 검색 결과가 없습니다
          </Typography>
        </Box>
      }
    </div>
  )
}

export default SearchResultList