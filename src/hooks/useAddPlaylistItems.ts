import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { addPlaylistItems } from '../apis/playlistApi'
import { AddPlaylistRequest } from '../models/playlist'

const useAddPlaylistItems = (playlistId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ params }: { params: AddPlaylistRequest }) => {
        const result = addPlaylistItems(playlistId, params);
        return result;
    },
    onSuccess: async () => {
        const result1 = await queryClient.refetchQueries({
            queryKey: ["current-user-playlists"]
        });
        const result2 = await queryClient.refetchQueries({
            queryKey: ["playlist-detail", playlistId]
        });
        const result3 = await queryClient.refetchQueries({
            queryKey: ["playlist-items", { playlist_id: playlistId }]
        });
    },
    onError: (error) => {
        console.error('Failed to add playlist items:', error);
    }
  });
};

export default useAddPlaylistItems
