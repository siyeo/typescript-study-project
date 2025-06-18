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

// 스타일 상수
const styles = {
  container: {
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
  },
  trackItem: {
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
  },
  albumImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 0.5,
    marginRight: 2,
    backgroundColor: '#282828',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  trackInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.3,
    minWidth: 0,
    flex: '0 0 250px',
  },
  albumInfo: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    flex: 1,
    marginLeft: 3,
  },
  addButtonContainer: {
    marginLeft: 'auto',
  },
  trackName: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 500,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: '14px',
  },
  albumName: {
    color: '#b3b3b3',
    fontSize: '14px',
  },
  addButton: {
    color: '#b3b3b3',
    '&:hover': {
      color: '#1db954',
      backgroundColor: 'rgba(29, 185, 84, 0.1)',
    },
  },
  musicIcon: {
    color: '#b3b3b3',
    fontSize: '24px',
  },
};

const emptyStyles = {
 emptyContainer: {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   padding: 4,
   minHeight: '200px',
   backgroundColor: '#121212',
   borderRadius: 1,
 },
 emptyText: {
   color: '#b3b3b3',
   fontSize: '16px',
   textAlign: 'center',
   marginBottom: 1,
 },
 emptyIcon: {
   color: '#535353',
   fontSize: '48px',
   marginBottom: 2,
 },
};


const SearchResultList = ({list, keyword, playlistId}:SearchResultListProps) => {
  const addTrackMutation = useAddPlaylistItems(true);
  return (
    <div>
      {list.length > 0 ?
      <Box sx={styles.container}>
        {list.map((track, index) => {
          return (
            <Box 
              key={track.id || index}
              sx={styles.trackItem}
            >
              {/* 앨범 이미지 */}
              <Box sx={styles.albumImageContainer}>
                {track.album?.images?.[0]?.url ? (
                  <Box
                    component="img"
                    src={track.album.images[0].url}
                    alt={track.album?.name}
                    sx={styles.albumImage}
                  />
                ) : null}
                <MusicNote sx={{...styles.musicIcon, display: track.album?.images?.[0]?.url ? 'none' : 'block'}} />
              </Box>

              {/* 트랙 정보 (노래명, 가수명) */}
              <Box sx={styles.trackInfo}>
                <Typography 
                  variant='body1' 
                  sx={styles.trackName}
                  noWrap
                >
                  {track.name}
                </Typography>
                <Typography 
                  variant='body2' 
                  sx={styles.artistName}
                  noWrap
                >
                  {track.artists?.[0]?.name}
                </Typography>
              </Box>

              {/* 앨범명 */}
              <Box sx={styles.albumInfo}>
                <Typography 
                  variant='body2' 
                  sx={styles.albumName}
                  noWrap
                >
                  {track.album?.name}
                </Typography>
              </Box>

              {/* 추가 버튼 */}
              <Box sx={styles.addButtonContainer}>
                <IconButton
                  sx={styles.addButton}
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
        <Box sx={emptyStyles.emptyContainer}>
          <Typography sx={emptyStyles.emptyText}>
            "{keyword}" 에 대한 검색 결과가 없습니다
          </Typography>
        </Box>
      }
    </div>
  )
}

export default SearchResultList
