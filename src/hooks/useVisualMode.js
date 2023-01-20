import { useState } from "react";

// Helper function to transition between display modes on the Appointment component
export default function useVisualMode(initialMode) {

  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]);
  };

  const back = function() {

    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  };

  const obj = { mode: history[history.length - 1], transition, back };
  return obj;
}