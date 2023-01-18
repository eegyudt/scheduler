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

  // const updateSpots = function (state, appointments) {
    
  //   const dayObj= state.days.find(d => d.name === state.day)
  //   let spots  =  0;
  //   for (const id of dayObj.appointments) {
  //     const appointment = appointments[id];
  //     if (appointment.interview === null) {
  //       spots++;
  //     }
  //   }

  //   const day = {...dayObj, spots}
  //   return state.days.map(d => d.name === state.day ? day : d);
  // }

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      const updateSpots = function (state, appointments) {
    
        const dayObj= state.days.find(d => d.name === state.day)
        let spots  =  5;
        for (const id of dayObj.appointments) {
          const appointment = appointments[id];
          if (appointment.interview) {
            spots--;
          }
        } 
        const day = {...dayObj, spots}
        return state.days.map(d => d.name === state.day ? day : d);
      }
  
      return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments)
        setState(prev => ({
          ...prev,
          appointments,
          days
          }));
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
  
      console.log("state>>>>>>", state)
      const updateSpots = function (state, appointments) {
        const dayObj= state.days.find(d => d.name === state.day)
        let spots  =  0;
        for (const id of dayObj.appointments) {
          const appointment = appointments[id];
          console.log("appointments>>>", appointments)
          console.log("appointments[id]----", appointments[id])
          if (!appointment.interview) {
            spots++;
          }
        }
    
        const day = {...dayObj, spots}
        return state.days.map(d => d.name === state.day ? day : d);
      }
  
  
      return axios.delete(`/api/appointments/${id}`)
        .then(() => {
          const days = updateSpots(state, appointments)
          setState(prev => ({
            ...prev,
            appointments,
            days
            }));
        });
    };
    return { state, setDay, bookInterview, cancelInterview };

  }
  
  
  export default useApplicationData;

























// const dayFinder = state.days.find((day) => day.appointments.includes(id));
      // const days = state.days.map((day, index) => {
      //   if (day.name === dayFinder.name && state.appointments[id].interview === null) {
      //     return { ...day, spots: day.spots + 1 };
      //   } else {
      //     return day;
      //   }
      // });
  
  



// const useApplicationData = () => {

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });

//   useEffect(() => {
//     Promise.all([
//       axios.get(`/api/days`),
//       axios.get(`/api/appointments`),
//       axios.get(`api/interviewers`)
//     ])
//       .then((all) => {
//         setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//       });
//   }, []);

//   const setDay = day => setState({ ...state, day });



//   // let currentDay = state.day;

//   // for (let key in state.days) {
//   //   if (state.days[key].name === currentDay) {
//   //     let newSpots = state.days[key].spots - 1;
//   //       return { ...day, spots: newSpots}
//   //     }

//   //   }
  





//   // let currentDay = state.day;
//   // console.log("state.day = currentDay++++++++        ++++++++", currentDay);
//   // console.log("State=======", state);
//   // console.log("State.days=======", state.days);

//   // for (let key in state.days) {
//   //   if (state.days[key].name === currentDay) {
//   //     console.log("item ---------------", state.days[key]);
//   //     console.log("item.name ---------------", state.days[key].name);
//   //     console.log("item.spots ---------------", state.days[key].spots);



//   //     let newSpots = state.days[key].spots - 1;
//   //     console.log("newSpots ---------------", newSpots);
//   //     const setNewDaySpots = state.days.map((day) => {
//   //       return { ...day, spots: newSpots}
//   //     })

      
//   //     // let currDay = state.days[key]
//   //     // currDay.spots = newSpots
//   //     // // setState({ ...state, days: currDay });
//   //     // // setState({...state.days[key], currDay})


//   //     // const currDay = {
//   //     //   ...state.days[key],
//   //     //   spots: { state.days[key].spots }
//   //     // };

//   //     const newCurrDay = {
//   //       ...state.days[key],
//   //       spots: newSpots
//   //     };

//   //     // setState({ ...state.days[key], newCurrDay });
//   //     // setState({key: {...state.days[key], spots: newSpots}})
//   //     console.log("state.days[key] ---------------", state.days[key]);
//   //     console.log("new item.spots ---------------", state.days[key].spots);
//   //   }
//   // }

//   // myArray.filter(item => item.type === 'beta').map(item => item.name)

//   // console.log("State.day.spots=======", State.day.spot);


//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     return axios.put(`/api/appointments/${id}`, { interview })
//       .then((response) => {
//         console.log("Inside Axios PUT request");
//         // const setNewDaySpots;

//         // for (let key in state.days) {
//         //   if (state.days[key].name === currentDay) {
//         //     // console.log("item ---------------", state.days[key]);
//         //     // console.log("item.name ---------------", state.days[key].name);
//         //     // console.log("item.spots ---------------", state.days[key].spots);
      
      
      
//         //     let newSpots = state.days[key].spots - 1;
//         //     console.log("newSpots ---------------", newSpots);
//         //     setNewDaySpots = state.days.map((day) => {
//         //       return { ...day, spots: newSpots}
//         //     })
//         //     console.log("new item.spots ---------------", state.days[key].spots);
//         //   }
//         // }

//         let currentDay = state.day;

//         for (let key in state.days) {
//           if (state.days[key].name === currentDay) {
//             let newSpots = state.days[key].spots - 1;
//               return { ...day, spots: newSpots}
//             }
      
//           }

//         setState({ ...state, appointments, day });
//         // setState({ ...state, appointments, days: setNewDaySpots });
//         console.log("application response >>>", response);
//       });
//   }


//   const cancelInterview = function(id) {

//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     return axios.delete(`/api/appointments/${id}`)
//       .then(() => {
//         setState({
//           ...state,
//           appointments
//         });
//       });
//   };


//   return { state, setDay, bookInterview, cancelInterview };
// };


// export default useApplicationData;