
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Form from './form'
import Queue from './waitlist'
import Wave from './wave'
import Hospital from './hospital'


function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path="queue" element={<Queue />} />
            <Route path="form" element={<Form />} />
            <Route path="hospital" element={<Hospital />} />
            <Route path="wave" element={<Wave />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
