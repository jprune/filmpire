import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import { useGetActorQuery } from '../../services/TMDB';
import useStyles from './styles';

// useParams to get ID from actor I'm on
// define new query via redux-toolkit --> getActorDetails --> research tmdb api docs..
// use the created hook useGetActorQuery --> to get info to component
// display it with mui
// reuse movieinformation recommended movies part

/*
Bild: data.profile_path --> /XXXX.jpg
Name: data.name
Born: data.birthday --> format
Description: data.biography
IMDB link: data.imdb_id
*/

function Actors() {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong. Go back!</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={5}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h2" align="left" gutterBottom>{data?.name}</Typography>
        <Typography variant="h5" gutterBottom>Born: {data?.birthday}</Typography>
        <Typography variant="string" gutterBottom align="justify" style={{ marginRight: '10px' }}>{data?.biography}</Typography>
      </Grid>
    </Grid>
  );
}

export default Actors;
