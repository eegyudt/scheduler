import React from "react";
import "components/Appointment/styles.scss";


import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const DELETE = "EMPTY"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  
  const save = function(name, interviewer) {

    console.log("ABC>>>>>>>>>>>>>>>>>>")

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })

  };

  const delete = function() {
    
  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === CREATE &&
        <Form
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} />}
          {mode === SAVING && <Status message="SAVING"/>}
    </article>
  );
}

// {props.interview ? 
//   <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}