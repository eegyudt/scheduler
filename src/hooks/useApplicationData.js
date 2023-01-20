import { useState, useEffect } from "react";
import axios from "axios";

// Helper function to access the app's data from the API using axios
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // GET request for axios to retrieve app's data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // Book interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment

    };

    // Return day information for a day based on id search
    const dayFinder = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === dayFinder.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    // PUT request for axios to update database with booked interview
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days
        });

      });

  };

  // Cancel interview
  const cancelInterview = function(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Return day information for a day based on id search
    const dayFinder = state.days.find((day) => day.appointments.includes(id));
    const newDays = (prev) => prev.days.map((day, index) => {

      if (day.id === dayFinder.id) {

        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    // DELETE request for axios to update database with cancelled interview
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
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;