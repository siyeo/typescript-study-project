import { styled, Typography } from '@mui/material'
import React from 'react'
import theme from '../../theme';
import PlayButton from './PlayButton';

interface CardProps {
    name:string;
    image:string;
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

const Card = ({image, name, artistName}:CardProps) => {
  return (
    <AlbumCard>
        <ImageContainer>
          <Image src={image} alt={name} />
          <PlayButtonWrapper className="play-button">
              <PlayButton />
          </PlayButtonWrapper>
        </ImageContainer>
        <Text>
          <Typography variant='h2' fontWeight={700} noWrap>{name}</Typography>
          <Typography color={theme.palette.text.secondary} noWrap>{artistName}</Typography>
        </Text>
    </AlbumCard>
  )
}

export default Card
