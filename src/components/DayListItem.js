import React from 'react';
import classnames from "classnames";
import "components/DayListItem.scss";

// List interviews and interview spots for days
export default function DayListItem(props) {
  let spotsText = '';

  // Format text for number of spots remaining
  const formatSpots = () => {
    if (props.spots === 0) {
      spotsText = 'no spots remaining';
      return spotsText;
    }
    if (props.spots === 1) {
      spotsText = '1 spot remaining';
      return spotsText;
    }
    if (props.spots > 1) {
      spotsText = `${props.spots} spots remaining`;
      return spotsText;
    }
  };

  const dayClass = classnames('day-list__item', { "day-list__item--selected": props.selected }, { "day-list__item--full": props.spots === 0 });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}