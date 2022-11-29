import ButtonGroup from '@mui/material/ButtonGroup';


/**
 * A button
 * @param {object} props - Props for the function
 * @param {React.ReactElement[]} props.buttons Array with buttons to add to the group
 * @returns {React.ReactElement} - The buttongroup
 */

const LayerButtonGroup = (props) => {
    return (
        <ButtonGroup
            orientation="vertical"
            aria-label="button group"
        >
            {props.buttons.map((button, index) =>
                <div key={index}>{button}</div>
            )}
        </ButtonGroup>
    );
}

export default LayerButtonGroup;
