import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/login';
import PublishDocument from './pages/PublishDocument';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_90%_0%,#e5f0e9_0,transparent_26rem),#f5f7f5] text-[#162a29]">
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <Dashboard sidebarOpen={sidebarOpen} onCloseSidebar={closeSidebar} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/publish" element={<PublishDocument />} />
      <Route path="/" element={<DashboardLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
