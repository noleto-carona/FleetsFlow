import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BackgroundPrincipal from './layouts/BackgroundPrincipal';
import OperationsPage from './pages/Operations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BackgroundPrincipal />} />
        <Route path="/operacoes" element={<OperationsPage />} />
        {/* Redirecionamento temporário para facilitar navegação */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
