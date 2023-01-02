import { FormControl, FormLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import CardButton from "./CardButton";

/**
 * A form for editing user information
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const UserFormCard = (props) => {
  const rows = [];

  const [newUserObject, setNewUserObject] = useState(props.content);

  //console.log('formcard props.content', props.content);

  for (const property in props.content) {
    if (property !== "pass")
      rows.push({
        name: property,
        value: props.content[property],
      });
  }

  const cancelButton = (
    <CardButton
      buttonText={"Avbryt"}
      size={"small"}
      width={25}
      handleClick={props.handleClickCancelButton}
    />
  );

  const saveButton = (
    <CardButton
      buttonText={"Spara"}
      size={"small"}
      width={25}
      handleClick={() => props.handleClickSaveButton(newUserObject)}
    />
  );

  function changeHandler(event) {
    let newObject = { ...newUserObject };
    newObject[event.target.name] = event.target.value;

    setNewUserObject({ ...newUserObject, ...newObject });
  }

  return (
    <>
      <FormControl sx={{ margin: 2 }}>
        <FormLabel id="prepaid-radio-buttons-group-label" sx={{ fontSize: 18 }}>
          Ändra dina uppgifter
        </FormLabel>

        {rows.map((row) => (
          <TextField
            disabled={
              row.name === "username"
                ? true
                : row.name === "balance"
                ? true
                : row.name === "id"
                ? true
                : false
            }
            required={true}
            variant="outlined"
            key={row.name}
            label={row.name}
            name={row.name}
            defaultValue={row.value}
            onChange={changeHandler}
            sx={{ m: 1 }}
          />
        ))}

        <div>{cancelButton}</div>
        <div>{saveButton}</div>
      </FormControl>
    </>
  );
};

export default UserFormCard;
