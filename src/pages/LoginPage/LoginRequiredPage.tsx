import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getSpotifyAuthUrl } from '../../utils/auth';
import theme from '../../theme';

// 스포티파이 스타일 컨테이너
const SpotifyContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  fontFamily: 'CircularSp, Helvetica, Arial, sans-serif'
}));

// 메인 컨텐츠 박스
const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  padding: '48px',
  textAlign: 'center',
  maxWidth: '450px',
  width: '100%'
}));

// 스포티파이 로고 컨테이너
const LogoContainer = styled(Box)({
  marginBottom: '32px',
  '& svg': {
    width: '56px',
    height: '56px',
    color: '#1db954'
  }
});

// 메인 타이틀
const MainTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: '700',
  margin: '0 0 16px 0',
  color: '#ffffff'
});

// 서브타이틀
const SubTitle = styled(Typography)({
  fontSize: '1rem',
  color: '#a7a7a7',
  lineHeight: '1.5',
  margin: '0 0 32px 0'
});

// 스포티파이 그린 로그인 버튼
const SpotifyLoginButton = styled(Button)({
  backgroundColor: '#1db954',
  color: '#000000',
  border: 'none',
  borderRadius: '500px',
  padding: '16px 48px',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  width: '100%',
  transition: 'all 0.15s ease',
  textTransform: 'none',
  marginBottom: '24px',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'scale(1.04)'
  }
});

// 구분선 컨테이너
const DividerContainer = styled(Box)({
  position: 'relative',
  margin: '24px 0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: '#282828'
  }
});

// 구분선 텍스트
const DividerText = styled(Typography)({
  backgroundColor: '#000000',
  color: '#a7a7a7',
  padding: '0 16px',
  fontSize: '0.875rem',
  display: 'inline-block'
});

// 둘러보기 버튼
const BrowseButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#a7a7a7',
  border: '1px solid #727272',
  borderRadius: '500px',
  padding: '16px 48px',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  width: '100%',
  transition: 'all 0.15s ease',
  textTransform: 'none',
  marginBottom: '32px',
  '&:hover': {
    backgroundColor: '#282828',
    transform: 'scale(1.04)',
    borderColor: '#727272'
  }
});

// 회원가입 텍스트
const SignupText = styled(Typography)({
  fontSize: '1rem',
  color: '#a7a7a7',
  margin: '0',
  '& a': {
    color: '#ffffff',
    textDecoration: 'underline',
    marginLeft: '4px'
  }
});

const LoginRequiredPage = () => {
  const handleLoginClick = () => {
    getSpotifyAuthUrl();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <SpotifyContainer>
      <ContentBox>
        {/* 스포티파이 로고 */}
        <LogoContainer>
          <svg viewBox="0 0 168 168" fill="currentColor">
            <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"/>
          </svg>
        </LogoContainer>

        {/* 메인 콘텐츠 */}
        <MainTitle>
          로그인해서 음악을 시작하세요
        </MainTitle>
        
        <SubTitle>
          플레이리스트, 좋아요 표시한 음악, 팔로우한 팟캐스트 등<br />
          모든 음악을 무료로 이용하세요.
        </SubTitle>

        <SpotifyLoginButton onClick={handleLoginClick}>
          Spotify로 로그인
        </SpotifyLoginButton>

        <DividerContainer>
          <DividerText>또는</DividerText>
        </DividerContainer>

        <BrowseButton onClick={handleGoHome}>
          로그인 없이 둘러보기
        </BrowseButton>

      </ContentBox>
    </SpotifyContainer>
  );
};

export default LoginRequiredPage;