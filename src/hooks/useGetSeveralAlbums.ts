import React from 'react'
import useClientCredentialToken from './useClientCredentialToken';
import { useQuery } from '@tanstack/react-query';
import { getSeveralAlbums } from '../apis/albumApi';

const useGetSeveralAlbums = () => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey:["several-albums"],
        queryFn:async() => {
            if (!clientCredentialToken) {
                throw new Error("No token available");
            }
            return getSeveralAlbums(clientCredentialToken);
        },
    });
}

export default useGetSeveralAlbums
