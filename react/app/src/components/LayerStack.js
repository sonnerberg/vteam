import { Stack } from '@mui/material';

const LayerStack = (props) => {

    return (
        <Stack direction="column" spacing={2}>
            {props.components.map((component, index) =>
                <div key={index}>{component}</div>
            )}
        </Stack>
    );

}

export default LayerStack
