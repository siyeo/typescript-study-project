import { Box, styled, Typography } from '@mui/material'
import { MusicNote } from '@mui/icons-material'
import React, { useState } from 'react'
import theme from '../../theme';
import PlayButton from './PlayButton';

interface CardProps {
    name?:string;
    image?:string;
    artistName:string|undefined;
}

const AlbumCard = styled("div")(({theme})=>({
    width:"100%",
    height:"100%", //100vh ->layout  height
    margin:"5px",
    padding:"5px"
}));

const ImageContainer = styled("div")({
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    borderRadius: "4px",
    overflow: "hidden",
    "&:hover .play-button": {
        opacity: 1,
        transform: "translateY(0)"
    }
});

const Image = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover"
});

const PlayButtonWrapper = styled("div")({
    position: "absolute",
    bottom: "8px",
    right: "8px",
    opacity: 0,
    transform: "translateY(10px)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "scale(1.05) translateY(0)"
    }
});

const Text = styled("div")({
    flex: 1, // 나머지 40%
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "8px 0"
});

const ImagePlaceholder = styled(Box)({
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.7)"
});

const Card = ({image, name, artistName}:CardProps) => {
    const [imageError, setImageError] = useState(false);
    
    // 기본값 설정
    const safeName = name || "제목 없음";
    const safeArtistName = artistName || "아티스트 정보 없음";
    const hasValidImage = image && !imageError;
    
    const handleImageError = () => {
        setImageError(true);
    };
  return (
    <AlbumCard>
        <ImageContainer>
            {hasValidImage ? (
                <Image 
                    src={image} 
                    alt={safeName}
                    onError={handleImageError}
                />
            ) : (
                <ImagePlaceholder>
                    <MusicNote sx={{ fontSize: '48px' }} />
                </ImagePlaceholder>
            )}
            <PlayButtonWrapper className="play-button">
                <PlayButton />
            </PlayButtonWrapper>
        </ImageContainer>
        <Text>
            <Typography variant='h2' fontWeight={700} noWrap>
                {safeName}
            </Typography>
            <Typography color={theme.palette.text.secondary} noWrap>
                {safeArtistName}
            </Typography>
        </Text>
    </AlbumCard>
  )
}

export default Card
