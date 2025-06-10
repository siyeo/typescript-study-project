import { styled, Typography } from '@mui/material';
import React from 'react'
import { SimplifiedPlaylist } from '../../models/playlist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Navigate, useNavigate, useParams } from 'react-router';

interface PlaylistItemProps {
  isActive?: boolean;
}

// 추가: 각 플레이리스트 내부 레이아웃
const PlaylistItem = styled("button")<PlaylistItemProps>(({theme, isActive})=>({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "15px",
	padding: "10px",
	cursor: "pointer",
	width: "100%",
	textAlign: "left",
	borderRadius: "8px",
	border: "none",
	backgroundColor: isActive 
    ? theme.palette.background.paper 
    : theme.palette.background.default,
  
	"& .play-icon": {
		opacity: isActive ? 1 : 0
	},
	"&:hover": {
		backgroundColor: theme.palette.background.paper,
		"& .play-icon": {
			opacity: 1
		}
	}
}));

// 텍스트들을 묶을 컨테이너
const TextContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "5px"
});

const StyledTitleText = styled("div")(({theme})=>({
	textDecoration:"none",
	gap:"15px",
	fontSize: "12px",
	color:theme.palette.text.primary,
}));

const StyledSubText = styled("div")(({theme})=>({
	textDecoration:"none",
	gap:"10px",
	fontSize: "12px",
	color:theme.palette.text.secondary,
}));

const ImageContainer = styled("div")(({theme})=>({
	width: "50px", // 고정 너비
	aspectRatio: "1 / 1", // 1:1 비율로 정사각형 유지
	backgroundColor: theme.palette.background.paper,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "4px",
	flexShrink: 0, // 이것이 핵심! 이미지 영역이 줄어들지 않게 함
	flexGrow: 0,    // 이것도 추가하면 더 안전
	position: "relative", // 아이콘 절대 위치를 위해 필요
	overflow: "hidden"    // 이미지가 컨테이너를 벗어나지 않게
}));


const PlayIcon = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	opacity: 0, // 기본적으로 숨김
	transition: "opacity 0.2s ease",
	zIndex: 2,
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	width: "50px",
	height: "50px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
});

const Image = styled("img")({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "4px"
});

interface PlaylistProps {
	playlistData: SimplifiedPlaylist[];
}

const Playlist = ({ playlistData }: PlaylistProps) => {
	if (!playlistData || !Array.isArray(playlistData)) {
		return <div>No playlists available</div>;
	}
	const navigate = useNavigate();
	const handleClick=(id:string|undefined)=>{
		if (id) {
			navigate(`/playlist/${id}`);
		}
	}
	const {id} = useParams<{ id:string }>();
  return (
	<>
		{playlistData.map((item: SimplifiedPlaylist) => (
			<PlaylistItem key={item.id} onClick={()=>handleClick(item.id)} isActive={id === item.id}>
				<ImageContainer>
					{item.images?.[0]?.url ? (
						<Image src={item.images[0].url} alt={item.name} />
					) : (
						<MusicNoteIcon sx={{ color: 'white' }}/>
					)}
					<PlayIcon className="play-icon">
						<PlayArrowRoundedIcon sx={{ color: 'white', fontSize: '30px' }}/>
					</PlayIcon>
				</ImageContainer>
				<TextContainer>
					<StyledTitleText>
						<Typography fontWeight={700}>{item.name}</Typography>
					</StyledTitleText>
					<StyledSubText>
						<Typography>
							{item.type}ㆍ{item.owner?.display_name}
						</Typography>
					</StyledSubText>
				</TextContainer>
			</PlaylistItem>
		))}
	</>
  )
}

export default Playlist
