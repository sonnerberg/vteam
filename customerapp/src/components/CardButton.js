import { Button } from '@mui/material';

/**
 * A button
 * @param {object} props - Props for the function
 * @param {function} props.handleClick- Functon to execute when button is pressed
 * @param {string} props.size - The size of the button
 * @param {number} props.width - The width of the button
 * @returns {React.ReactElement} - The button
 */
const LayerButton = (props) => {
    return (
        <Button
            onClick={props.handleClick}
            size={props.size}
            sx={{ width: props.width }}
        >
            {props.buttonText}
        </Button>
    );
};

export default LayerButton;
