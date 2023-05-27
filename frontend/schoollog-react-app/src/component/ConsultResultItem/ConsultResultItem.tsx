import React from "react";

interface ResultItem {
  keywords: string;
  date: string;
}

function ConsultResultItem() {
  const dummyData: ResultItem[] = [
    {
      'keywords' : '친구, 매점',
      'date' : '2023-05-04'
    },
    {
      'keywords' : '농구, 연습',
      'date' : '2023-03-04'
    },
    {
      'keywords' : '방학, 공부',
      'date' : '2023-01-04'
    },
  ]
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Loop through the dummyData array */}
      {dummyData.map((item, index) => (
        <div key={index}>
          <p>{item.keywords}</p>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );
}

export default ConsultResultItem;