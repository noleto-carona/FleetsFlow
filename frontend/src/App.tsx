import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BackgroundPrincipal from './layouts/BackgroundPrincipal';
import OperationsPage from './pages/Operations';
import CompliancePage from './pages/Compliance';

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
          path="/compliance"
          element={
            <MainLayout>
              <CompliancePage />
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
