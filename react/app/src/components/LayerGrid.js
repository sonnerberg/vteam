import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';


/**
 * A grid to display a switch, an accordion and a button group
 * @param {object} props - Props for the function
 * @param {React.ReactElement} props.switch The switch
 * @param {React.ReactElement} props.accordion The accordion
 * @param {React.ReactElement} props.buttonGroup The button group
 * @returns {React.ReactElement} - The grid
 */
const LayerGrid = (props) => {
    console.log(props)
    return(
        <Paper elevation={3}>
                <Grid container spacing={1} direction="row"  margin={2}>
                    <Grid >
                        <div>{props.switch}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="row"  >
                    <Grid item xs={10}  margin={1}>
                            <div>{props.accordion}</div>
                    </Grid>
                    <Grid item xs={1} mt={0.5} mb={0.5}>
                        <div>{props.buttonGroup}</div>
                    </Grid>
                </Grid>
        </Paper>
    );
}

export default LayerGrid;
