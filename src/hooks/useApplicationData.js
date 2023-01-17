import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`api/interviewers`)
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  const setDay = day => setState({ ...state, day });

  let currentDay = state.day;
  console.log("state.day = currentDay++++++++        ++++++++", currentDay);
  console.log("State=======", state);
  console.log("State.days=======", state.days);

  for (let key in state.days) {
    if (state.days[key].name === currentDay) {
      console.log("item ---------------", state.days[key]);
      console.log("item.name ---------------", state.days[key].name);
      console.log("item.spots ---------------", state.days[key].spots);



      let newSpots = state.days[key].spots - 1;
      console.log("newSpots ---------------", newSpots);
      const setNewDaySpots = state.days.map((day) => {
        return { ...day, spots: newSpots}
      })

      
      // let currDay = state.days[key]
      // currDay.spots = newSpots
      // // setState({ ...state, days: currDay });
      // // setState({...state.days[key], currDay})


      // const currDay = {
      //   ...state.days[key],
      //   spots: { state.days[key].spots }
      // };

      const newCurrDay = {
        ...state.days[key],
        spots: newSpots
      };

      // setState({ ...state.days[key], newCurrDay });
      // setState({key: {...state.days[key], spots: newSpots}})
      console.log("state.days[key] ---------------", state.days[key]);
      console.log("new item.spots ---------------", state.days[key].spots);
    }
  }

  // myArray.filter(item => item.type === 'beta').map(item => item.name)

  // console.log("State.day.spots=======", State.day.spot);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        console.log("Inside Axios PUT request");
        // const setNewDaySpots;

        // for (let key in state.days) {
        //   if (state.days[key].name === currentDay) {
        //     // console.log("item ---------------", state.days[key]);
        //     // console.log("item.name ---------------", state.days[key].name);
        //     // console.log("item.spots ---------------", state.days[key].spots);
      
      
      
        //     let newSpots = state.days[key].spots - 1;
        //     console.log("newSpots ---------------", newSpots);
        //     setNewDaySpots = state.days.map((day) => {
        //       return { ...day, spots: newSpots}
        //     })
        //     console.log("new item.spots ---------------", state.days[key].spots);
        //   }
        // }



        setState({ ...state, appointments });
        // setState({ ...state, appointments, days: setNewDaySpots });
        console.log("application response >>>", response);
      });
  }


  const cancelInterview = function(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  };


  return { state, setDay, bookInterview, cancelInterview };
};


export default useApplicationData;