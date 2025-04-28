import './App.css';

import { Main } from './pages/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DisplayVideo } from './pages/DisplayVideo';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { AIChat } from './pages/AIChat';
import { VoiceForDiary } from './pages/VoiceForDiary';
import { DiaryDetail } from './pages/DiaryDetail';
import { DiaryForm } from './pages/DiaryForm';
import { Board } from './pages/Board';
import { PostForm } from './pages/PostForm';

function App() {
  return (
    <div className="App">
    <div className="container">

      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write-form" element={<DiaryForm />} />
        <Route path="/voice-form" element={<VoiceForDiary />} />
        <Route path="/posts/:id" element={<DiaryDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/board" element={<Board />} />


        <Route path="/display-video" element={<DisplayVideo />} />
      </Routes>
    </Router>
    </div>
  </div>




  );
}

export default App;
