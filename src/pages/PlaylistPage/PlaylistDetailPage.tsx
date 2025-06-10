import React from 'react'
import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../../hooks/useGetPlaylist';
import PlaylistDetailHeader from './components/PlaylistDetailHeader';

const PlaylistDetailPage = () => {
  const {id} = useParams<{ id:string }>();
  if (id === undefined) return <Navigate to="/"/>;
  const {data:playlist} = useGetPlaylist({playlist_id:id});
  console.log(playlist);
  return (
    <div>
      <PlaylistDetailHeader playlist={playlist}/>
    </div>
  )
}

export default PlaylistDetailPage
