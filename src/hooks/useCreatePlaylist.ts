import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createPlaylist } from '../apis/playlistApi'
import useGetCurrentUserProfile from './useGetCurrentUserProfile'
import { CreatePlaylistRequest } from '../models/playlist'

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const {data:user} = useGetCurrentUserProfile();
    return useMutation({
        mutationFn:(params:CreatePlaylistRequest) => {
            if (user && user.id) {
                return createPlaylist(user.id, params)
            }
            return Promise.reject(new Error("user is not defined"));
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["current-user-playlists"]})
        }
    })

}

export default useCreatePlaylist
