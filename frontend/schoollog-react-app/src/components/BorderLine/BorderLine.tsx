import React from 'react';

function BorderLine({ width, height, marginLeft }: { width: string; height: string; marginLeft?: string }) {
  return (
    <div
      style={{
        backgroundColor: '#E3E3E3',
        width: width,
        height: height,
        marginLeft: marginLeft,
      }}
    ></div>
  );
}

export default BorderLine;
