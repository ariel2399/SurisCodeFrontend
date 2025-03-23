import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking, getAllBookings, Booking } from '../api/bookingService';

function CreateBooking() {
  const { haircutId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    date: '',
    time: '',
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const possibleTimes = [
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30'
  ];

  useEffect(() => {
    getAllBookings().then(setBookings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getAvailableTimes = (selectedDate: string): string[] => {
    const takenTimes = bookings
      .filter(b => {
        const bookingDate = new Date(b.dateTimeSlot);
        const dateString = bookingDate.toISOString().split('T')[0]; // YYYY-MM-DD
  
        return dateString === selectedDate;
      })
      .map(b => {
        const date = new Date(b.dateTimeSlot);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      });
  
    return possibleTimes.filter(time => !takenTimes.includes(time));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const existingBooking = bookings.find(b => {
        const bookingDate = getDatePart(b.dateTimeSlot);
        return (
          bookingDate === form.date &&
          b.clientEmail.toLowerCase() === form.clientEmail.toLowerCase()
        );
      });
    
      if (existingBooking) {
        alert('Ya tenes una reserva en el dia. Solo se permite una por dia.');
        return;
      }

    const dateTimeSlot = `${form.date}T${form.time}`;
    await createBooking({
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      haircutId: parseInt(haircutId!),
      dateTimeSlot: dateTimeSlot
    });
    alert('Reserva creada');
    navigate('/');
  };

  const getDatePart = (datetime: string): string => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-4">
      <h1>Crear reserva para corte #{haircutId}</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input
          type="text"
          name="clientName"
          className="form-control mb-3"
          placeholder="Tu nombre"
          value={form.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="clientEmail"
          className="form-control mb-3"
          placeholder="Tu correo"
          value={form.clientEmail}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="form-control mb-3"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select
          name="time"
          className="form-select mb-3"
          value={form.time}
          onChange={handleChange}
          required
          disabled={!form.date}
        >
          <option value="">Seleccioná un horario</option>
          {form.date &&
            getAvailableTimes(form.date).map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
        </select>
        <button type="submit" className="btn btn-primary">Confirmar reserva</button>
      </form>
    </div>
  );
}

export default CreateBooking;
