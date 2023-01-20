import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";


// Appointment component
const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then((res) => {

      transition(SHOW);
    }).catch(error => transition(ERROR_SAVE, true));
  };

  // Cancel interview
  const remove = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm message="Confirm"
        onCancel={back}
        onConfirm={remove} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error
        message="Appointment could not be saved"
        onClose={() => transition(CREATE)} />}
      {mode === ERROR_DELETE && <Error
        message="Appointment could not be deleted"
        onClose={back} />}
    </article>
  );
};

export default Appointment;