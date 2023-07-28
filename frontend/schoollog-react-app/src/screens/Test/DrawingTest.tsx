import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./DrawingTest.css"
import {ReactComponent as DrawingBegin} from "../../assets/drawingtest.svg"

interface Point {
  x: number;
  y: number;
}

interface Line {
  startPoint: Point;
  endPoint: Point;
  color: string;
  width: number;
}

const DrawingTest: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.lineJoin = "round";
      context.lineCap = "round";

      lines.forEach((line) => {
        drawLine(context, line);
      });
    }
  }, [lines]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const currentPoint = getClientCoordinates(event);

    setLastPoint(currentPoint);
    setLines((prevLines) => [...prevLines, { startPoint: currentPoint, endPoint: currentPoint, color, width }]);
  };

  const continueDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const currentPoint = getClientCoordinates(event);
    const newLine: Line = { startPoint: lastPoint!, endPoint: currentPoint, color, width };

    setLastPoint(currentPoint);
    setLines((prevLines) => [...prevLines.slice(0, -1), newLine]);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const drawLine = (context: CanvasRenderingContext2D, line: Line) => {
    context.beginPath();
    context.strokeStyle = line.color;
    context.lineWidth = line.width;
    context.moveTo(line.startPoint.x, line.startPoint.y);
    context.lineTo(line.endPoint.x, line.endPoint.y);
    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setLines([]);
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(event.target.value));
  };

  const getClientCoordinates = (event: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    return { x: offsetX, y: offsetY };
  };

  return (
    <div className="Drawing-main">
      <DrawingBegin className="Drawing-begin" />
      <button className="Drawing-clearBtn" onClick={clearCanvas}>지우기</button>
      <div className="Drawing-board">
        <canvas
          className="Drawing-canvas"
          width={340}
          height={400}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={continueDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
        ></canvas>
        <div>
          <label htmlFor="color">색깔:</label>
          <input type="color" id="color" value={color} onChange={handleColorChange} />
          <label htmlFor="width">선 굵기:</label>
          <input type="range" id="width" min={1} max={10} value={width} onChange={handleWidthChange} />
          
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default DrawingTest;



