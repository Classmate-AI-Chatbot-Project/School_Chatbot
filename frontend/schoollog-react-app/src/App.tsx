import Main from './Main'
import Chatbot from'./component/Chat/Chatbot';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className='Full-box'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
      <Link to="/"></Link>
    </div> 
  );
}
export default App;