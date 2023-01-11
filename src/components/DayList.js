import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days

  const listDays = days.map((day, index) => {
    return (
      <DayListItem
        key={props.days[index].id}
        name={props.days[index].name}
        spots={props.days[index].spots}
        selected={props.days[index].name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {listDays}
    </ul>
  );
}