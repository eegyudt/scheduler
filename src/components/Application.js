import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors.js";


export default function Application(props) {



  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    // interviewer: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = days => setState(prev => ({ ...prev, appointments }));
  // const setInterviewer = days => setState(prev => ({ ...prev, interviewer }));
  // const setInterviewers = days => setState(prev => ({ ...prev, interviewers }));

  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
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


  // console.log("state.interviewers", state.interviewers)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          <Appointment/>{schedule}<Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}




// </section>
//       <section className="schedule">
//         {(dailyAppointments).map(appointment =>
//           <Appointment
//             key={appointment.id}
//             {...appointment}
//           />)}
//         <Appointment key="last" time="5pm" />
//       </section>