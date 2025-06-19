import React from 'react'
import NewReleases from './components/NewReleases'
import SeveralAlbums from './components/SeveralAlbums'
import SeveralTracks from './components/SeveralTracks'

const HomePage = () => {
  return (
    <div>
      <NewReleases/>
      <SeveralTracks/>
      <SeveralAlbums/>
    </div>
  )
}

export default HomePage
