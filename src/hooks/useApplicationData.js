import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment

    };

    const dayFinder = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === dayFinder.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days
        });

      });

  };

  const cancelInterview = function(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayFinder = state.days.find((day) => day.appointments.includes(id));
    const newDays = (prev) => prev.days.map((day, index) => {

      if (day.id === dayFinder.id) {

        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {

        setState((prev) => {
          const days = newDays(prev);
          return {
            ...prev,
            appointments,
            days
          };
        });

        // setState((prev) => {
        //   ...prev,
        //   appointments,
        //   days(prev)
        // });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;