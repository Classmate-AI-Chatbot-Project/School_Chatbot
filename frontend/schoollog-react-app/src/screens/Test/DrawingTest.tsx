import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./DrawingTest.css"
import DrawingModal from "./DrawingModal";
import axios from 'axios'
import {ReactComponent as DrawingTopic} from "../../assets/drawingtest.svg"

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
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const [Data, setData] = useState({
    image: '',
    branch : '',
    flower : '',
    leaf : '',
    root : '',
    fruit : ''
  });

  useEffect(() => {
    

    if (context && canvas) {
      context.lineJoin = "round";
      context.lineCap = "round";

      lines.forEach((line) => {
        drawLine(context, line);
      });
    }
  }, [lines]);

  const openModal = async () => {
    const imageDataURL = canvas?.toDataURL();
    
    const data = {
      image_data: imageDataURL
    };

    try {
      // Axios를 사용하여 그림 데이터를 서버로 전송
      await axios.post('http://127.0.0.1:8000/teacher/test',
      data).then((res) => {
        axios.get(
          `http://127.0.0.1:8000/teacher/test/result`
        ).then((res: any) => {
          console.log(res);
          const data = res.data;
    
          setData({
            image: `http://127.0.0.1:8000${data.img}`,
            branch : data.result.branch,
            flower : data.result.flower,
            leaf : data.result.leaf,
            root : data.result.root,
            fruit : data.result.fruit
          });
        })
      })
      console.log('그림 업로드 성공');
      // 여기에서 modal을 닫을 수 있음
      closeModal();
    } catch (error) {
      console.error('그림 업로드 실패:', error);
    } 
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
      <DrawingTopic className="Drawing-topic" />
      <button className="Drawing-clearBtn" onClick={clearCanvas}>지우기</button>
      <div className="Drawing-board">
        <canvas
          className="Drawing-canvas"
          width={340}
          height={370}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={continueDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
        ></canvas>
        <div className="Drawing-control">
          <label className="Drawing-color" htmlFor="color">색깔</label>
          <input className="Drawing-colorIn" type="color" id="color" value={color} onChange={handleColorChange} />
          <label className="Drawing-line"  htmlFor="width">굵기</label>
          <input className="Drawing-lineIn" type="range" id="width" min={1} max={10} value={width} onChange={handleWidthChange} />
        </div>
      </div>
      <button className="Drawing-submit" onClick={openModal}>제출하기</button>
      <DrawingModal open={modalOpen} close={closeModal} />
    </div>
  );
};

export default DrawingTest;