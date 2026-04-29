import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ContentRoot from './routes/content/root';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/content" replace />} />
        <Route path="/content" element={<ContentRoot />}></Route>
        <Route path="/content/:contentId" element={<ContentRoot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
