import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useState } from 'react';

interface CategoryCardProps {
  image: string;
  name: string;
}

// 스포티파이 스타일의 랜덤 색상 팔레트
const spotifyColors = [
  '#1db954', // Spotify Green
  '#ff6b6b', // Red
  '#4ecdc4', // Teal
  '#45b7d1', // Blue
  '#f9ca24', // Yellow
  '#f0932b', // Orange
  '#eb4d4b', // Dark Red
  '#6c5ce7', // Purple
  '#a29bfe', // Light Purple
  '#fd79a8', // Pink
  '#00b894', // Dark Teal
  '#fdcb6e', // Light Orange
  '#e17055', // Salmon
  '#74b9ff', // Light Blue
  '#0984e3', // Dark Blue
];

const CategoryCard = styled('div')<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  position: 'relative',
  width: '100%',
  height: '180px',
  borderRadius: '8px',
  backgroundColor: bgcolor,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
}));

const CategoryName = styled(Typography)({
  color: 'white',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '28px',
  maxWidth: '70%',
  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
});

const IconContainer = styled('div')({
  position: 'absolute',
  bottom: '-10px',
  right: '-10px',
  width: '150px',
  height: '150px',
  transform: 'rotate(25deg)',
  borderRadius: '6px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
});

const CategoryIcon = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Card = ({ image, name }: CategoryCardProps) => {
    // 카테고리 이름을 기반으로 일관된 색상 선택
    const [backgroundColor] = useState(() => 
        spotifyColors[Math.floor(Math.random() * spotifyColors.length)]
    );

    return (
        <CategoryCard bgcolor={backgroundColor}>
        <CategoryName variant="h2" noWrap>
            {name}
        </CategoryName>
        <IconContainer>
            <CategoryIcon 
            src={image} 
            alt={name}
            loading="lazy"
            />
        </IconContainer>
        </CategoryCard>
    );
};

export default Card;