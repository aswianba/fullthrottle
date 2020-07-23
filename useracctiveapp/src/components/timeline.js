import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

function createActiveTimeLine(time, active) {
  let style = null;
  if (active) style = { backgroundColor: "blue" };

  return (
    <>
      <TimelineItem style={{ minHeight: "40px" }}>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector style={style} />
        </TimelineSeparator>
        <TimelineContent>{time}</TimelineContent>
      </TimelineItem>
    </>
  );
}

function getTimelineConnector(i, active) {
  let style = null;
  let length = { minHeight: "2px" };
  if (active) {
    style = { backgroundColor: "blue" };
    length = { minHeight: "20px" };
  }
  return (
    <>
      <TimelineItem style={length}>
        <TimelineSeparator>
          <TimelineConnector style={style} />
        </TimelineSeparator>
        <TimelineContent>
          <Typography color="textSecondary">{}</Typography>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

function getNonActiveTimeLine(from, to) {
  let diff = to - from;
  return (
    <>
      {[...Array(diff + 1)].map((e, i) => {
        return getTimelineConnector(from + i);
      })}
    </>
  );
}

function getActivetimeline(from, to) {
  let diff = Math.floor(to) - Math.floor(from);

  return (
    <>
      {createActiveTimeLine(from, true)}
      {diff > 0 &&
        [...Array(diff)].map((e, i) => {
          let c = Math.floor(from) + (i + 1);
          if (Math.floor(to) === c && Math.floor(to) === to) return null;
          return getTimelineConnector(c, true);
        })}
      {createActiveTimeLine(to, false)}
    </>
  );
}

function convertTimeToFloat(timeString) {
  let startTime = moment(timeString, "MMM DD YYYY  LT")
    .format("LTS")
    .toString();
  let timeInString = startTime.split(":");
  let timeformat = timeInString[2].split(" ")[1];
  let hour = parseInt(timeInString[0]);
  let minutes = parseInt(timeInString[1]);
  if (timeformat === "PM") hour = hour + 12;
  let floatTime = parseFloat(hour + "." + minutes);
  return floatTime;
}

function createTimeLine(activityPeriodsList) {
  let starttme = 1;
  let startTime;
  let endTime;
  let activePeriods = activityPeriodsList.map((active) => {
    startTime = convertTimeToFloat(active.start_time);
    endTime = convertTimeToFloat(active.end_time);
    let newStarttime = starttme + 0;
    starttme = Math.floor(endTime) + 1;
    return (
      <>
        {Math.floor(startTime) !== startTime &&
          getNonActiveTimeLine(newStarttime, Math.floor(startTime))}
        {getActivetimeline(startTime, endTime)}
      </>
    );
  });

  return (
    <>
      {activePeriods}
      {getNonActiveTimeLine(Math.ceil(endTime), 23)}
    </>
  );
}

export default function BasicTimeline(props) {
  return (
    <div
      style={{
        width: "210px",
        minHeight: "400px",
        overflow: "auto",
        height: "400px",
      }}
    >
      <Timeline>
        <TimelineItem style={{ minHeight: "20px" }}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>00:00</TimelineContent>
        </TimelineItem>
        {props.activetimes &&
          props.activetimes.length !== 0 &&
          createTimeLine(props.activetimes)}
        <TimelineItem style={{ minHeight: "20px" }}>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>24:00</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
