import React, { useState, useRef, useEffect } from "react";

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

const DrawingBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

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

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const currentPoint = getClientCoordinates(event);

    setLastPoint(currentPoint);
    setLines((prevLines) => [...prevLines, { startPoint: currentPoint, endPoint: currentPoint, color, width }]);
  };

  // 마우스, 터치 그리기 인식
  const continueDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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

  //캔버스 그림 삭제
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

  const getClientCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    if (event.type.startsWith("touch")) {
      const touchEvent = event as React.TouchEvent<HTMLCanvasElement>;
      const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
      return { x: touch.clientX - canvas.offsetLeft, y: touch.clientY - canvas.offsetTop };
    } else {
      const mouseEvent = event as React.MouseEvent<HTMLCanvasElement>;
      return { x: mouseEvent.clientX - canvas.offsetLeft, y: mouseEvent.clientY - canvas.offsetTop };
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={continueDrawing}
        onTouchEnd={endDrawing}
        width={300}
        height={600}
        style={{ border: "1px solid #000000" }}
      ></canvas>
      <div>
        <label htmlFor="color">색깔:</label>
        <input type="color" id="color" value={color} onChange={handleColorChange} />
        <label htmlFor="width">선 굵기:</label>
        <input type="range" id="width" min={1} max={10} value={width} onChange={handleWidthChange} />
        <button onClick={clearCanvas}>지우기</button>
      </div>
    </div>
  );
};

export default DrawingBoard;
