// Helper function to list the appointments of a day
export function getAppointmentsForDay(state, day) {
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

// Helper function to get the interview information
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewerObject = state.interviewers[interview.interviewer];
  const interviewObj = {
    student: interview.student,
    interviewer: interviewerObject
  };

  return interviewObj;
}

// Helper function to list the interviewers of a day
export function getInterviewersForDay(state, day) {

  const foundDay = state.days.find(d => day === d.name);

  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }

  return foundDay.interviewers.map((id) => state.interviewers[id]);
}