import React, { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      let lastItem = history.pop();
      history.splice(history.length-1);
      history.push(lastItem);
      setMode(lastItem)
    }
    setMode(newMode);
    setHistory(newMode);
  };


  /// ????
  const back = function() {
    console.log("typeof history>>>>>>>>>>>>>>>>>>>>>>>>>>", typeof history)
    console.log(" history>>>>>>>>>>>>>>>>>>>>>>>>>>", history)
    if (history.length > 1) {
      history.splice(history.length-1);
      setMode(history[history.length - 1]);
    }
  };
  /// ????

  const obj = { mode, transition, back };
  return obj;

}

