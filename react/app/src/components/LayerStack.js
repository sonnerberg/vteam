import { Stack } from '@mui/material';


/**
 * A stack with React components
 * @param {object} props - Props for the function
 * @param {React.ReactElement[]} props.components - The components which should be added to the stack
 * @returns {React.ReactElement} - The stack
 */
const LayerStack = (props) => {

    return (
        <Stack direction="column" spacing={0}>
            {props.components.map((component, index) =>
                <div key={index}>{component}</div>
            )}
        </Stack>
    );

}

export default LayerStack
