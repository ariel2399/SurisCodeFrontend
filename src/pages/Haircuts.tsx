import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHaircuts, Haircut } from '../api/haircutService';

function Haircuts() {
  const [haircuts, setHaircuts] = useState<Haircut[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getHaircuts()
      .then(data => {
        setHaircuts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching haircuts:', error);
        setLoading(false);
      });
  }, []);

  const handleSelectHaircut = (haircutId: number) => {
    navigate(`/bookings/create/${haircutId}`);
  };

  if (loading) return <p className="text-center mt-4">Cargando cortes...</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Cortes de pelo disponibles</h1>
      <div className="list-group">
        {haircuts.map(h => (
          <button
            key={h.id}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={() => handleSelectHaircut(h.id)}
          >
            <span><strong>{h.name}</strong></span>
            <span className="badge bg-primary">${h.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Haircuts;
