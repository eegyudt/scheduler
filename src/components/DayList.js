import React from "react";
import DayListItem from "./DayListItem";

// List days with available appointments
export default function DayList(props) {

  const listDays = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {listDays}
    </ul>
  );
}