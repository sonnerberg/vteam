import { Switch } from '@mui/material';


/**
 * A switch
 * @param {object} props - Props for the function
 * @param {function} props.setShowLayer - Function to call when switch i switched
 * @param {boolean} props.showLayer - Calling the setShow function sets this to !value when passed in
 * @returns {React.ReactElement} - The switch
 */

const LayerSwitch = (props) => {
    function setShowLayer () {
        props.setShowLayer(!props.showLayer);
    }
    return (
        <Switch onChange={setShowLayer}></Switch>
    );
}

export default LayerSwitch;
