export default function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];

  for (let element of state.days) {
    if (day === element.name) {
      for (let id of element.appointments) {
        if (id === state.appointments[id].id)
          appointmentsArray.push(state.appointments[id]);
      }
    }
  }
  return appointmentsArray;
}