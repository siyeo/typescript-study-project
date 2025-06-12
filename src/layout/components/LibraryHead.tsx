import { Button, styled, Typography } from '@mui/material';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';


const StyledText = styled("div")(({theme})=>({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    gap:"20px",
    margin:"20px",
    color:theme.palette.text.primary,
}));

const StyledRightButton = styled(Button)(({theme})=>({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    marginLeft:"auto",
    gap:"20px",
    color:theme.palette.text.primary,
}));
const LibraryHead = () => {
  const {mutate:createPlaylist} = useCreatePlaylist()
  const { data: userProfile } = useGetCurrentUserProfile();
  const handleCreatePlaylist=()=>{
    if (userProfile) {
      createPlaylist({name : "나의 플레이리스트"});
    } else {
      if (confirm("이 기능은 로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?")) {
        getSpotifyAuthUrl();
      }
    }
  }
  return (
    <div>
        <StyledText>
          <LibraryMusicOutlinedIcon/>
          <Typography variant="h2" fontWeight={700}>Your Library</Typography>
          <StyledRightButton onClick={handleCreatePlaylist}>
            <PlaylistAddIcon/>
          </StyledRightButton>
        </StyledText>
    </div>
  )
}

export default LibraryHead
