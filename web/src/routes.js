import MainPage from './components/main'
import MapPage from './components/mapPage'
import FlowPage from './components/reactFlow'
import { Routes, Route } from 'react-router-dom'

export default function Rotas() {
  return (
    <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route exact path='/map' element={<MapPage />} />
      <Route exact path='/flow' element={<FlowPage />} />
    </Routes>
  )
}
