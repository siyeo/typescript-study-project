import { Box, Card, Grid, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useGetSeveralBrowseCategories from '../../hooks/useGetSeveralBrowseCategories';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import CategoryCard from '../../common/components/CategoryCard';
import { useInView } from 'react-intersection-observer';


const CardContainer = styled(Box)({
  padding: '24px',
});

const SearchPage = () => {
  const { ref, inView } = useInView();
  const {data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetSeveralBrowseCategories({locale:"kr", limit:20, offset:0});
  useEffect(()=>{
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, [inView]);
  if (isLoading) {
    return <Loading show={true}/>;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message}/>;
  }
  return (
    <CardContainer>
      <Typography variant='h1' fontWeight='700' marginBottom="15px">
        Browse all
      </Typography>
      {data && data.pages.some(page => page.categories.items.length > 0) ? (
        <Grid container spacing={2}>
          {data.pages.map((page) =>
            page.categories.items.map((category) => (
              <Grid size={{xs:12, sm:6, md:4}} key={category.id}>
                <CategoryCard image={category.icons[0].url} name={category.name}/>
              </Grid>
            ))
          )}
        </Grid>
      ) : (
        <Typography variant='h2'>No Data</Typography>
      )}
      <div ref={ref} style={{ minHeight: '1px' }}>{isFetchingNextPage && <Loading show={true}/>}</div>
    </CardContainer>
  )
}

export default SearchPage
