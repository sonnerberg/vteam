import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useState } from "react";
import CardButton from "./CardButton";

/**
 * A form for editing user prepaid information
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const PrePaidForm = (props) => {
  const rows = [];

  const [prePaid, setPrePaid] = useState("none");

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
      handleClick={() => props.handleClickSaveButton(prePaid, props.username)}
    />
  );

  function changeHandler(event) {
    console.log(event.target.value);
    setPrePaid(event.target.value);
  }

  return (
    <FormControl sx={{ margin: 2 }}>
      <FormLabel id="prepaid-radio-buttons-group-label" sx={{ fontSize: 18 }}>
        Välj betaltjänst
      </FormLabel>
      <RadioGroup
        aria-labelledby="prepaid-radio-buttons-group-label"
        defaultValue="none"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="none"
          control={<Radio onChange={changeHandler} />}
          label="Ingen"
        />
        <FormControlLabel
          value="paypal"
          control={<Radio onChange={changeHandler} />}
          label="PayPal"
        />
        <FormControlLabel
          value="klarna"
          control={<Radio onChange={changeHandler} />}
          label="Klarna"
        />
      </RadioGroup>
      {cancelButton} {saveButton}
    </FormControl>
  );
};

export default PrePaidForm;
