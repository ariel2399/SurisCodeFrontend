import { Routes, Route } from 'react-router-dom';
import Haircuts from './pages/Haircuts';
import CreateBooking from './pages/CreateBooking';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Haircuts />} />
      <Route path="/bookings/create/:haircutId" element={<CreateBooking />} />
    </Routes>
  );
}

export default App;

