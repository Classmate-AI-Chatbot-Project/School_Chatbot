import React from "react";

interface DrawingResultProps {
  imageUrl: string;
}

const DrawingResult: React.FC<DrawingResultProps> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Drawing Result" />;
};

export default DrawingResult; 
