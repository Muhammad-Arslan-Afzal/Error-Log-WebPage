import React, { useState } from "react";
import NoticeErrors from "./NoticeErrors";
import DebugErrors from "./DebugErrors";
import DummyErrorPage from "./DummyErrorPage";
import { Fragment } from "react";
import classes from "./ViewAllErrors.module.css";

const ViewAllErrors = () => {
  const [noticeErrors, setNoticeErrors] = useState(false);
  const [debugErrors, setDebugErrors] = useState(false);

  const noticeErrorsHandler = () => {
    if (debugErrors) {
      setDebugErrors(false);
    }
    setNoticeErrors((preVal) => {
      return !preVal;
    });
  };

  const debugErrorsHandler = () => {
    if (noticeErrors) {
      setNoticeErrors(false);
    }
    setDebugErrors((preVal) => {
      return !preVal;
    });
  };

  return (
    <Fragment>
      <div className={classes.buttonDiv}>
        <button onClick={noticeErrorsHandler}>Notice Level Errors</button>
        <button onClick={debugErrorsHandler}>Debug Level Errors</button>
      </div>
      {!noticeErrors && !debugErrors && <DummyErrorPage />}
      {noticeErrors && <NoticeErrors />}
      {debugErrors && <DebugErrors />}
    </Fragment>
  );
};

export default ViewAllErrors;
