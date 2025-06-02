import React from 'react'
import './AppLayout.css';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
        <div className="app-layout">
            SideBar
            {/* 사이드바 */}
            <div className="app-layout__sidebar">
            </div>
            {/* 페이지 콘텐츠 */}
            <main className="app-layout__content">
            <Outlet />
            </main>
        </div>
  )
}

export default AppLayout
