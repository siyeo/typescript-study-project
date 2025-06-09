import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery } from '@tanstack/react-query'
import React, { use } from 'react'
import { getCurrentUserPlaylists } from '../apis/playlistApi'
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from '../models/playlist'

const useGetCurrentUserPlaylists = ({limit, offset}:GetCurrentUserPlaylistRequest):UseInfiniteQueryResult<InfiniteData<GetCurrentUserPlaylistResponse, Error>, Error> => {
  return useInfiniteQuery({
    queryKey:["current-user-playlists"],
    queryFn:({pageParam = 0})=> {
        return getCurrentUserPlaylists({limit, offset: pageParam})
    },
    initialPageParam:0,
    getNextPageParam:(lastPage)=>{
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    }
  })
}

export default useGetCurrentUserPlaylists
