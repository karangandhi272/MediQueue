import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import Breathwork from '@/Breathwork'
import Breath from '@/breath'
import Queue from '@/waitlist'
import FaqPage from './faq'
import Funny from './funny'
import Journal from './Journal'
import ArtCycler from './gallery'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/breathwork" element={<MainLayout><Breathwork /></MainLayout>} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/queue" element={<MainLayout><Queue /></MainLayout>} />
        <Route path="faq" element={<MainLayout><FaqPage/></MainLayout>} />
        <Route path="funny" element={<MainLayout><Funny/></MainLayout>} />
        <Route path="Journal" element={<MainLayout><Journal/></MainLayout>}/>
        <Route path="gallery" element={<MainLayout><ArtCycler/></MainLayout>}/>
      
    </Routes>
    </Router>
  )
}
