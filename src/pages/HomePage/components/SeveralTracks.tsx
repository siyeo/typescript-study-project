import React from 'react'
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';
import useGetSeveralTracks from '../../../hooks/useGetSeveralTracks';

const SeveralTracks = () => {
    const {data, error, isLoading} = useGetSeveralTracks();
    if (isLoading) {
        return <Loading show={true}/>;
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message}/>;
    }
    const tracks = data?.tracks || [];
    return (
        <div>
            <Typography variant='h1' paddingLeft="8px" paddingTop="8px" marginBottom="20px">
                Tracks
            </Typography>
            {tracks.length > 0  ? (
                <Grid container spacing={2}>
                    {tracks.map((track)=>(
                        <Grid size={{xs:6, sm:4, md:2}} key={track.id}>
                            <Card image={track.album?.images[0].url} name={track.name} artistName={track?.artists?.[0].name}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant='h2'>No Data</Typography>
            )}
        </div>
    );
}

export default SeveralTracks
