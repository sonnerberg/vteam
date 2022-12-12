import LayerButton from '../components/LayerButton';

function createAccordionUtils(args) {
    const handleClickChangeButton = () => {
        args.setShowFormCard(true);
        args.setActivateDraw(true);
    };

    const handleClickCancelButton = () => {
        args.setShowFormCard(false);
        args.setActivateDraw(false);
    };

    const handleClickSaveButton = () => {
        //
    };

    const handleClickDeleteButton = () => {};

    const editButton = (
        <LayerButton
            buttonText={'Ändra'}
            size={'small'}
            width={25}
            handleClick={handleClickChangeButton}
        />
    );

    const cancelButton = (
        <LayerButton
            buttonText={'Avbryt'}
            size={'small'}
            width={25}
            handleClick={handleClickCancelButton}
        />
    );

    const saveButton = (
        <LayerButton
            buttonText={'Spara'}
            size={'small'}
            width={25}
            handleClick={handleClickSaveButton}
        />
    );

    const deleteButton = (
        <LayerButton
            buttonText={'Ta bort'}
            size={'small'}
            width={25}
            handleClick={handleClickDeleteButton}
        />
    );

    return {
        editButton: editButton,
        cancelButton: cancelButton,
        saveButton: saveButton,
        deleteButton: deleteButton,
    };
}

export default createAccordionUtils;
