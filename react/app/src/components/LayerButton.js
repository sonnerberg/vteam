import { Button } from '@mui/material';

const LayerButton = (props) => {
    return (
        <Button onClick={props.handleClick} size={props.size}>{props.buttonText}</Button>
    );
}

export default LayerButton;
