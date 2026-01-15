import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BackgroundPrincipal from './layouts/BackgroundPrincipal';
import OperationsPage from './pages/Operations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <BackgroundPrincipal />
            </MainLayout>
          }
        />
        <Route
          path="/operacoes"
          element={
            <MainLayout>
              <OperationsPage />
            </MainLayout>
          }
        />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
