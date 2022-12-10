import React, { useState } from "react";

import Error from "../assets/errors.json";

const DynamicDebugErrors = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const errorData = Error.data;

  //------Debug are in 6 groups
  const debugLevelArray = errorData.filter((e) => e.level === "Debug");
  let finalDebugArray = [];
  let counter = 0;
  let updatedi;
  for (let i = 0; i < debugLevelArray.length; i = updatedi) {
    finalDebugArray.push(
      debugLevelArray.filter(
        (err) =>
          err.timeStamp === debugLevelArray[i].timeStamp &&
          err.facility === debugLevelArray[i].facility
      )
    );
    if (counter == 0) {
      updatedi = finalDebugArray[counter].length;
    } else {
      updatedi = 0;
      for (let j = 0; j < finalDebugArray.length; j++) {
        updatedi = updatedi + finalDebugArray[j].length;
      }
    }

    counter++;
  }
  //--- merging related objects

  const displayDebugArray = [];
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

  for (let i = 0; i < finalDebugArray.length; i++) {
    displayDebugArray.push(accumulatorFunction(finalDebugArray[i]));
  }

  return (
    <div className="wrapper">
      <div className="accordion">
        {displayDebugArray.map((item, i) => (
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

export default DynamicDebugErrors;

//--------------- Extra -------------------//
//-----------------------------------------//
// <div>
//   {console.log(finalDebugArray)}
//   {console.log(displayDebugArray)}
//   {displayDebugArray.map((error) => {
//     return (
//       <div key={Math.random()}>
//         <b> {error.level}</b>
//         <br />
//         {error.facility} <br />
//         {error.timeStamp} <br />
//         <br />
//         {error.message}
//       </div>
//     );
//   })}
// </div>

//   const time1DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:05.057Z"
//   );
//   const time2DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:05.058Z"
//   );
//   const time3DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:05.059Z"
//   );
//   const time4DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:05.060Z"
//   );
//   const time5DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:05.061Z"
//   );
//   const time6DebugLevel = errorData.filter(
//     (e) => e.timeStamp === "2019-02-05T20:52:12.705Z"
//   );

//   const accumulatorFunction = (arr) => {
//     return arr.reduce((accumulator, currentValue) => {
//       return {
//         message: `${accumulator.message} \n ${currentValue.message}`,
//         facility: currentValue.facility,
//         level: currentValue.level,
//         timeStamp: currentValue.timeStamp,
//       };
//     });
//   };
//   const finalTime1DebugLevel = accumulatorFunction(time1DebugLevel);
//   const finalTime2DebugLevel = accumulatorFunction(time2DebugLevel);
//   const finalTime3DebugLevel = accumulatorFunction(time3DebugLevel);
//   const finalTime4DebugLevel = accumulatorFunction(time4DebugLevel);
//   const finalTime5DebugLevel = accumulatorFunction(time5DebugLevel);
//   const finalTime6DebugLevel = accumulatorFunction(time6DebugLevel);
//   const finalTimeDebugLevel = [
//     finalTime1DebugLevel,
//     finalTime2DebugLevel,
//     finalTime3DebugLevel,
//     finalTime4DebugLevel,
//     finalTime5DebugLevel,
//     finalTime6DebugLevel,
//   ];

// return (
//   <div>
//     {finalTimeDebugLevel.map((error) => {
//       return (
//         <div key={Math.random()}>
//           <b> {error.level}</b>
//           <br />
//           {error.facility} <br />
//           {error.timeStamp} <br />
//           <br />
//           {error.message}
//         </div>
//       );
//     })}
//   </div>
// );

//   return (
//     <div className="wrapper">
//       <div className="accordion">
//         {finalTimeDebugLevel.map((item, i) => (
//           <div className="item">
//             <div className="title" onClick={() => toggle(i)}>
//               <h2>Time: {item.timeStamp}</h2>
//               <span>{selected === i ? "-" : "+"}</span>
//             </div>
//             <div className={selected === i ? "content show" : "content"}>
//               {`Facility - ${item.facility}`}
//               <h3>Description</h3>
//               {item.message}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
