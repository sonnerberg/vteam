import { FormControl, FormLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import CardButton from "./CardButton";

/**
 * A form for editing user balance information
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const BalanceForm = (props) => {
  const rows = [];

  const [amount, setAmount] = useState(0);
  const [errorAmount, setErrorAmount] = useState(false);
  const [errorCreditCard, setErrorCreditCard] = useState(false);

  //console.log('formcard props.content', props.content);

  rows.push({ name: "credit card", value: "" });
  rows.push({ name: "amount", value: amount });

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
      handleClick={() => props.handleClickSaveButton(amount, props.username)}
    />
  );

  function changeHandler(event) {
    if (event.target.name === "amount") {
      setErrorAmount(false);
      setAmount(event.target.value);

      if (!Number(event.target.value)) {
        setErrorAmount(true);
        setAmount(0);
      }
      if (Number(event.target.value) < 0) {
        setErrorAmount(true);
        setAmount(0);
      }
    }

    if (event.target.name === "credit card") {
      setErrorCreditCard(false);
      if (!Number(event.target.value)) {
        setErrorCreditCard(true);
      }
    }
  }

  return (
    <FormControl sx={{ margin: 2 }}>
      <FormLabel id="balance-form-label" sx={{ fontSize: 18 }}>
        Sätt in pengar på saldo
      </FormLabel>

      {rows.map((row) => (
        <TextField
          error={
            row.name === "credit card" && !errorCreditCard
              ? false
              : row.name === "amount" && !errorAmount
              ? false
              : true
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
  );
};

export default BalanceForm;
