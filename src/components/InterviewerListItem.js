import React from 'react';
import classnames from "classnames";
import "components/InterviewerListItem.scss";

// Render interviewer instance
export default function InterviewerListItem(props) {

  const interviewerClass = classnames("interviewers__item", { "interviewers__item--selected": props.selected });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

