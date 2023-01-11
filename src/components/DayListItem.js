import React from 'react';
import classNames from "classnames";

export default function DayListItem(props) {

  const textClass = classNames('text--regular ', { "selected": props.selected });

  let counterClass;
  if (props.spots === 0) {
    counterClass = classNames("text--light full");
  }
  if (props.spots > 0) {
    counterClass = classNames("text--light");
  }

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={textClass}>{props.name}</h2>
      <h3 className={counterClass}>{props.spots} spots remaining</h3>
    </li>
  );
}