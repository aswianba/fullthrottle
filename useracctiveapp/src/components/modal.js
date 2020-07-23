import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Header from "../components/header";
import moment from "moment";
import momenttz from "moment-timezone";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Date from "./date";
import BasicTimeline from "../components/timeline";

function getModalStyle() {
  const top = 50;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backGroundColor: "light-blue",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  doOpen,
  doClose,
  activetimesList,
  timeZone,
}) {
  let filteredRecord = [];
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [date, setDate] = React.useState(moment());

  function innerTable(timeDetails) {
    return (
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>From </b>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <b>To </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeDetails
            .filter((time1) => checkDate(date, time1.start_time))
            .map((time, idx) => {
              filteredRecord.push(time);

              let startTime = moment(time.start_time, "MMM DD YYYY  LT").format(
                "LT"
              );
              let endTime = moment(time.end_time, "MMM DD YYYY  LT").format(
                "LT"
              );
              return (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {startTime}
                  </TableCell>
                  <TableCell>
                    <b>-</b>
                  </TableCell>
                  <TableCell>{endTime}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }

  function checkDate(selectedDate, startTime) {
    var test = momenttz
      .tz(startTime, "MMM DD YYYY  LT", timeZone)
      .isSame(selectedDate, "day");
    return test;
  }

  const body = (
    <>
      <div
        style={{ ...modalStyle, position: "absolute", display: "flex" }}
        className={classes.paper}
      >
        <div>
          <Header>
            <Date
              selected={date}
              handleDateChange={(d) => setDate(moment(d))}
            />
          </Header>

          {activetimesList && innerTable(activetimesList)}
        </div>
        <SimpleModal />
        <BasicTimeline activetimes={filteredRecord} />
      </div>
    </>
  );

  return (
    <div>
      <Modal
        open={doOpen || false}
        onClose={doClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
