import React, { Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './common/components/Common.css';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/Loading';
import useExchangeToken from './hooks/useExchangeToken';
import LoginRequiredPage from './pages/LoginPage/LoginRequiredPage';
// import AppLayout from './layout/AppLayout';
// import HomePage from './pages/HomePage/HomePage';
// import SearchPage from './pages/SearchPage/SearchPage';
// import SearchResultPage from './pages/SearchPage/SearchResultPage';
// import PlaylistDetailPage from './pages/PlaylistPage/PlaylistDetailPage';

const AppLayout = React.lazy(()=>import('./layout/AppLayout'))
const HomePage = React.lazy(()=>import('./pages/HomePage/HomePage'))
const CallbackPage = React.lazy(()=>import('./pages/LoginPage/CallbackPage'))
const SearchPage = React.lazy(()=>import('./pages/SearchPage/SearchPage'))
const SearchResultPage = React.lazy(()=>import('./pages/SearchPage/SearchResultPage'))
const PlaylistDetailPage = React.lazy(()=>import('./pages/PlaylistPage/PlaylistDetailPage'))


// login spotify 에서 제공하는 부분 따로 디자인 구현은 필요 없음음
// + side bar (플레이리스트, 메뉴)
// 1. home 홈페이지 [/]
// 2. search 검색 [/search]
// 3. search result 검색 결과 [/search/:keyword]
// 4. list 플레이리스트 ( + 모바일 버전까지) [/playlist]
// 5. list detail 플레이리스트  [/playlist/:id]

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const {mutate : exchangeToken} = useExchangeToken();

  useEffect(()=>{
    if (code && codeVerifier) {
      exchangeToken({code, codeVerifier});
    }
  }, [code, codeVerifier, exchangeToken]);
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path="search" element={<SearchPage/>}></Route>
        <Route path="search/:keyword" element={<SearchResultPage/>}></Route>
        {/* <Route path="playlist" element={<PlaylistPage/>}></Route> */}
        <Route path="playlist/:id" element={<PlaylistDetailPage/>}></Route>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/login-required" element={<LoginRequiredPage />} />
      </Route>
    </Routes>
  );
}

export default App;
