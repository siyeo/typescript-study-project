import React from 'react'
import useGetSeveralAlbums from '../../../hooks/useGetSeveralAlbums';
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';

const SeveralAlbums = () => {
    const {data, error, isLoading} = useGetSeveralAlbums();
    if (isLoading) {
        return <Loading show={true}/>;
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message}/>;
    }
    return (
        <div>
            <Typography variant='h1' paddingLeft="8px" paddingTop="8px" marginBottom="20px">
                Albums
            </Typography>
            {data && data.albums.length > 0 ? (
                <Grid container spacing={2}>
                    {data.albums.map((album)=>(
                        <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
                            <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant='h2'>No Data</Typography>
            )}
        </div>
    );
}

export default SeveralAlbums
