import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// Test data
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },

  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

// Test that appointments for a day are returned in an array
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

// Test the returned appointments array length
test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

// Test that the returned appointment is in the appointments array
test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments[4]);
  expect(second).toEqual(state.appointments[5]);
});

// Test that appointments array is empty when there are no interview on a day
test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

// Test that appointments array is empty for non-existent days
test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// getInterviewersForDay
// Test that interviewers array is returned for a given day
test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});
// Test that interviewers array length is the same as the number of interviewers for a given day
test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(2);
});

// Test that the interviewers array has the correct interviewer for a given day
test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const [first, second] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers[1]);
  expect(second).toEqual(state.interviewers[2]);
});

// Test that interviewers array is empty when no interviews are booked for the day
test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

// Test that interviewers array is empty for non-existent days
test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// getInterview
// Interview object has the interviewer information
test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

// Interview object is null if there are no interviews
test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});