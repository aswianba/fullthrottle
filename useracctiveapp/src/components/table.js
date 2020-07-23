import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function MyRow(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{ cursor: "pointer" }}
        onClick={() => props.openModal(row.id)}
      >
        <TableCell component="th" scope="row">
          {row.real_name}
        </TableCell>
        <TableCell>{row.tz}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UsersTable(props) {
  return (
    <TableContainer
      component={Paper}
      style={{ position: "relative", top: "10px" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow
            style={{ backgroundColor: "darkgray", boxShadow: "2px 2px" }}
          >
            <TableCell>User Name</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ boxShadow: "2px 2px" }}>
          {props.users.map((row) => (
            <MyRow key={row.id} row={row} openModal={props.openModal} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
