import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { Box, styled, TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';

export const SpotifyTableRow = styled(TableRow)({
  backgroundColor: '#121212',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#282828',
  },
  '& .MuiTableCell-body': {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 400,
  },
});

const MobileHiddenCell = styled(TableCell)(({ theme }) => ({
  color: '#b3b3b3',
  // 모바일에서 숨김
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ResponsiveTableCell = styled(TableCell)(({ theme }) => ({
  // 데스크톱에서의 너비
  width: '37%',
  // 모바일에서는 더 넓게
  [theme.breakpoints.down('sm')]: {
    width: '65%', // 앨범명과 날짜가 숨겨지므로 더 넓게
  },
}));

interface DeskTopPlaylistItemProps {
	index:number;
	item:PlaylistTrack;
}

function formatDateToYYYYMMDD(dateString: string | null | undefined): string {
	// null이나 빈 문자열 처리
	if (!dateString) {
		return '-'; // 또는 원하는 기본값
	}
	
	try {
		const date = new Date(dateString);
		
		// 유효한 날짜인지 확인
		if (isNaN(date.getTime())) {
		return 'Invalid Date';
		}
		
		// ISO 문자열에서 날짜 부분만 추출 (가장 간단한 방법)
		return date.toISOString().split('T')[0];
	} catch (error) {
		return 'Invalid Date';
	}
}

function formatDurationToMMSS(duration: number | undefined): string {
	// undefined나 유효하지 않은 값 체크
	if (duration === undefined || duration === null || duration <= 0) {
		return '00:00';
	}
	
	try {
		// 밀리초를 초로 변환
		const totalSeconds = Math.floor(duration / 1000);
		
		// 분과 초 계산
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		
		// mm:ss 형식으로 포맷팅
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	} catch (error) {
		return '00:00';
	}
}

const DeskTopPlaylistItem = ({item, index}: DeskTopPlaylistItemProps) => {
	const isEpisode = (track:Track|Episode):track is Episode=> {
		return track.type === "episode";
	}
	 return (
		<SpotifyTableRow>
			<TableCell 
				sx={{ 
				color: '#b3b3b3', 
				textAlign: 'center',
				width: '5%' 
				}}
			>
				{index}
			</TableCell>
		
			<ResponsiveTableCell>
				<Box>
				<Box sx={{ 
					fontWeight: 400, 
					color: '#ffffff',
					marginBottom: '4px'
				}}>
					{item.track?.name || "NO NAME"}
				</Box>
				<Box sx={{ 
					fontSize: '12px', 
					color: '#b3b3b3' 
				}}>
					{/* 아티스트 정보 표시 */}
					{isEpisode(item.track) ? "Unknown Artist" : item.track.artists?.[0]?.name}
				</Box>
				</Box>
			</ResponsiveTableCell>
		
			{/* 앨범명 - 모바일에서 숨김 */}
			<MobileHiddenCell 
				sx={{ 
				width: '38%' 
				}}
			>
				{isEpisode(item.track) ? "N/A" : item.track?.album?.name}
			</MobileHiddenCell>
		
			{/* 날짜 - 모바일에서 숨김 */}
			<MobileHiddenCell 
				sx={{ 
				width: '10%' 
				}}
			>
				{formatDateToYYYYMMDD(item.added_at) || "Unknown"}
			</MobileHiddenCell>
			
			<TableCell 
				sx={{ 
				color: '#b3b3b3', 
				textAlign: 'center',
				fontSize: '12px',
				width: '10%'
				}}
			>
				{formatDurationToMMSS(item.track?.duration_ms) || "Unknown"}
			</TableCell>
		</SpotifyTableRow>
	);
}

export default DeskTopPlaylistItem