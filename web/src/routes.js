import LoginPage  from './pages/LoginPage'
import MapPage  from './pages/MapPage'
import FlowPage  from './pages/FlowPage'
import { Routes, Route }  from 'react-router-dom'

export default function Rotas() {
  return (
    <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/map" element={<MapPage />} />
        <Route exact path="/flow" element={<FlowPage />} />
    </Routes>
  );
}
