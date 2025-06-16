import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react'
import { getSeveralBrowseCategories } from '../apis/categoryApi';
import { GetSeveralBrowseCategoriesRequest } from '../models/category';
import useClientCredentialToken from './useClientCredentialToken';

const useGetSeveralBrowseCategories = ({locale, limit, offset}:GetSeveralBrowseCategoriesRequest) => {
    const clientCredentialToken = useClientCredentialToken()
    return useInfiniteQuery({
        queryKey:["get-several-browse-categorise"],
        queryFn:({pageParam = 0})=> {
            return getSeveralBrowseCategories(clientCredentialToken!, {locale, limit, offset: pageParam})
        },
        initialPageParam:0,
        getNextPageParam:(lastPage)=>{
          if (lastPage.categories.next) {
            const url = new URL(lastPage.categories.next);
            const nextOffset = url.searchParams.get("offset");
            return nextOffset ? parseInt(nextOffset) : undefined;
          }
          return undefined;
        }
      })
}

export default useGetSeveralBrowseCategories
