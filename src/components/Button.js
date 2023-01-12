import React from "react";
import classNames from "classnames";

export default function Button(props) {
  console.log(classNames);

  const buttonClass = classNames('button ', { "button--confirm": props.confirm }, {"button--danger": props.danger} ); 

  return <button
    className={buttonClass}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>;
}
