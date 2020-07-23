import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function Date(props) {
  const handleDateChange = (date) => {
    props.handleDateChange(date);
  };

  if (!props || !props.selected) {
    return null;
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid item xs={5}>
        <KeyboardDatePicker
          style={{ backgroundColor: "white" }}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={props.selected}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
