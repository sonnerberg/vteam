import { Switch } from '@mui/material';

/**
 * A switch
 * @param {object} props - Props for the function
 * @param {function} props.setShowLayer - Function to call when switch i switched
 * @param {boolean} props.showLayer - Calling the setShow function sets this to !value when passed in
 * @returns {React.ReactElement} - The switch
 */

const ToplevelSwitch = (props) => {
    function handleShowUser() {
        props.setShowUser(!props.showUser);
    }
    return <Switch onChange={handleShowUser} defaultChecked={false}></Switch>;
};

export default ToplevelSwitch;
