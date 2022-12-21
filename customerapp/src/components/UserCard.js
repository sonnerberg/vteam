import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CardButton from "./CardButton";

/**
 * A card with content
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The card
 */
const UserCard = (props) => {
  const rows = [];

  for (const property in props.content) {
    rows.push({
      name: property,
      value: props.content[property],
    });
  }

  const editButton = (
    <CardButton
      buttonText={"Ändra uppgifter"}
      width={200}
      handleClick={props.handleClickEditButton}
    />
  );

  const editBalanceButton = (
    <CardButton
      buttonText={"Fyll på saldo"}
      width={200}
      handleClick={props.handleClickEditBalanceButton}
    />
  );

  const editPrePaidButton = (
    <CardButton
      buttonText={"Välj betaltjänst"}
      width={200}
      handleClick={props.handleClickEditPaymentServiceButton}
    />
  );

  return (
    <Card sx={{ minWidth: 200, margin: 2 }}>
      <CardContent sx={{ fontSize: 22 }}>
        Dina uppgifter
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <div>{editButton}</div> <div>{editBalanceButton}</div>
        <div>{editPrePaidButton}</div>
      </CardActions>
    </Card>
  );
};

export default UserCard;
