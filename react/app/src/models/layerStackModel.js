import LayerAccordion from '../components/LayerAccordion';
import LayerButton from '../components/LayerButton';
import LayerButtonGroup from '../components/LayerButtonGroup';
import LayerSwitch from '../components/LayerSwitch';
import LayerGrid from '../components/LayerGrid';

const layerStackBuilder = (props) => {
    console.log('layerstackbuilder props', props);
    const cityAccordion = (
        <LayerAccordion
            title={'Städer'}
            event={'cityClicked'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
        />
    );

    const parkingAccordion = (
        <LayerAccordion
            title={'Parkeringar'}
            event={'parkingLotClicked'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
        />
    );

    const chargingAccordion = (
        <LayerAccordion
            title={'Laddstationer'}
            event={'chargingStationClicked'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
        />
    );

    const zoneAccordion = (
        <LayerAccordion
            title={'Zoner'}
            event={'zoneClicked'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
        />
    );

    const bikeAccordion = (
        <LayerAccordion
            title={'Cyklar'}
            event={'bikeClicked'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
        />
    );

    const showCitiesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowCities}
            showLayer={props.showCities}
            checked={props.showCities}
        />
    );

    const showParkingsSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowParkings}
            showLayer={props.showParkings}
            checked={props.showParkings}
        />
    );

    const showChargingStationsSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowChargingStations}
            showLayer={props.showChargingStations}
            checked={props.showChargingStations}
        />
    );

    const showZonesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowZones}
            showLayer={props.showZones}
            checked={props.showZones}
        />
    );

    const showBikesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowBikes}
            showLayer={props.showBikes}
            checked={props.showBikes}
        />
    );

    const editButton = (
        <LayerButton
            buttonText={'Ny'}
            size={'small'}
            width={25}
            setActivateDraw={'props.setActivateDraw'}
            drawnItems={'props.drawnItems'}
        />
    );

    const searchButton = (
        <LayerButton buttonText={'Sök'} size={'small'} width={25} />
    );

    const buttonGroup = (
        <LayerButtonGroup buttons={[editButton, searchButton]} />
    );

    const container = (
        <LayerGrid
            title={'Städer'}
            switch={showCitiesSwitch}
            accordion={cityAccordion}
            buttonGroup={buttonGroup}
        />
    );
    const container2 = (
        <LayerGrid
            title={'Parkering'}
            switch={showParkingsSwitch}
            accordion={parkingAccordion}
            buttonGroup={buttonGroup}
        />
    );
    const container3 = (
        <LayerGrid
            title={'Ladd'}
            switch={showChargingStationsSwitch}
            accordion={chargingAccordion}
            buttonGroup={buttonGroup}
        />
    );
    const container4 = (
        <LayerGrid
            title={'Zoner'}
            switch={showZonesSwitch}
            accordion={zoneAccordion}
            buttonGroup={buttonGroup}
        />
    );
    const container5 = (
        <LayerGrid
            title={'Cyklar'}
            switch={showBikesSwitch}
            accordion={bikeAccordion}
            buttonGroup={buttonGroup}
        />
    );

    const containerArray = [
        container,
        container2,
        container3,
        container4,
        container5,
    ];

    return containerArray;
};

export default layerStackBuilder;
