import { Switch } from '@mui/material';
import { useRef } from 'react';


/**
 * A switch
 * @param {object} props - Props for the function
 * @param {function} props.setShowLayer - Function to call when switch i switched
 * @param {boolean} props.showLayer - Calling the setShow function sets this to !value when passed in
 * @returns {React.ReactElement} - The switch
 */

const LayerSwitch = (props) => {
    const showLayer = useRef(props.showLayer);

    function setShowLayer () {
        showLayer.current = !showLayer.current;
        props.setShowLayer(showLayer.current);
    }
    return (
        <Switch onChange={setShowLayer} defaultChecked={true}></Switch>
    );
}

export default LayerSwitch;
