import Grid from '@mui/material/Grid';

const LayerGrid = (props) => {

    return(
        <Grid container spacing={4}>

            <Grid item xs={2}>
                <div>{props.switch}</div>
            </Grid>

            <Grid item xs={9}>
                <div>{props.accordion}</div>
            </Grid>
            <Grid item xs={2}>
                <div>{props.buttonGroup}</div>
            </Grid>
        </Grid>
    );
}

export default LayerGrid;
