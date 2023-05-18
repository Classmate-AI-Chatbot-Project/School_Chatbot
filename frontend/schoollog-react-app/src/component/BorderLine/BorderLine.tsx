import React from 'react';


function BorderLine({width, height} : {width: number, height: number}) {
  return (
    <div style={{
      backgroundColor: "#E3E3E3",
      width: width,
      height: height
    }}></div>
  );
}

export default BorderLine;
