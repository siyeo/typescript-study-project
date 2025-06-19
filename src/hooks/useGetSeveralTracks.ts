import React from 'react'
import useClientCredentialToken from './useClientCredentialToken';
import { useQuery } from '@tanstack/react-query';
import { getSeveralTracks } from '../apis/playlistApi';

const useGetSeveralTracks = () => {
  const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey:["several-tracks"],
        queryFn:async() => {
            if (!clientCredentialToken) {
                throw new Error("No token available");
            }
            return getSeveralTracks(clientCredentialToken);
        },
    });
}

export default useGetSeveralTracks
