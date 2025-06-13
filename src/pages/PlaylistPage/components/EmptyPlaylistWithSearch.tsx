import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SEARCH_TYPE } from '../../../models/search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import SearchResultList from './SearchResultList';
import { PAGE_LIMIT } from '../../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import { Search } from '@mui/icons-material';

const searchStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#121212',
  },
  searchField: {
    width: '100%',
    maxWidth: '600px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#242424',
      borderRadius: '25px',
      height: '48px',
      fontSize: '16px',
      color: 'white',
      '& fieldset': {
        border: '2px solid transparent',
      },
      '&:hover fieldset': {
        border: '2px solid #535353',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #1db954',
      },
      '& input': {
        padding: '12px 16px',
        '&::placeholder': {
          color: '#b3b3b3',
          opacity: 1,
        },
      },
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '12px',
    },
  },
  searchIcon: {
    color: '#b3b3b3',
    fontSize: '24px',
  },
};

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {data,  
  isLoading, 
  error, 
  hasNextPage, 
  isFetchingNextPage, 
  fetchNextPage } = useSearchItemsByKeyword({
    q:keyword,
    type:[SEARCH_TYPE.Track],
    limit: PAGE_LIMIT,
    offset: 0
  });
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  console.log(data);
  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) =>{
      setKeyword(event.target.value);
  }
  return (
    <div>
      <div>
          <Box sx={searchStyles.container}>
            <TextField
              value={keyword}
              onChange={handleSearchKeyword}
              placeholder="플레이리스트에 추가할 음악을 검색해보세요"
              variant="outlined"
              sx={searchStyles.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={searchStyles.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {data?.pages.map((item)=>{
            if (!item.tracks) return false
            return <SearchResultList list={item.tracks?.items} keyword={keyword}></SearchResultList>;
          })}
      </div>
      <div ref={ref} style={{ minHeight: '1px' }}>
        {isFetchingNextPage && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: 2 
          }}>
            <Loading show={true} />
          </Box>
        )}
      </div>
    </div>
  )
}

export default EmptyPlaylistWithSearch
