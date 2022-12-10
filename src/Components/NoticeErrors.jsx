import React, { useState } from "react";
import Error from "../assets/errors.json";
const NoticeErrors = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const errorData = Error.data;
  //------All Notice are unique
  const noticeLevelArray = errorData.filter((e) => e.level === "Notice");
  //----
  let finalNoticeArray = [];
  let counter = 0;
  let updatedi;
  for (let i = 0; i < noticeLevelArray.length; i = updatedi) {
    finalNoticeArray.push(
      noticeLevelArray.filter(
        (err) =>
          err.timeStamp === noticeLevelArray[i].timeStamp &&
          err.facility === noticeLevelArray[i].facility
      )
    );
    if (counter == 0) {
      updatedi = finalNoticeArray[counter].length;
    } else {
      updatedi = 0;
      for (let j = 0; j < finalNoticeArray.length; j++) {
        updatedi = updatedi + finalNoticeArray[j].length;
      }
    }

    counter++;
  }
  //--- merging related objects

  const displayNoticeArray = [];
  const accumulatorFunction = (arr) => {
    return arr.reduce((accumulator, currentValue) => {
      return {
        message: `${accumulator.message} \n ${currentValue.message}`,
        facility: currentValue.facility,
        level: currentValue.level,
        timeStamp: currentValue.timeStamp,
      };
    });
  };

  for (let i = 0; i < finalNoticeArray.length; i++) {
    displayNoticeArray.push(accumulatorFunction(finalNoticeArray[i]));
  }

  return (
    <div className="wrapper">
      <div className="accordion">
        {displayNoticeArray.map((item, i) => (
          <div className="item">
            <div className="title" onClick={() => toggle(i)}>
              <h2>Time: {item.timeStamp}</h2>
              <span>{selected === i ? "-" : "+"}</span>
            </div>
            <div className={selected === i ? "content show" : "content"}>
              {`Facility - ${item.facility}`}
              <h3>Description</h3>
              {item.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeErrors;
