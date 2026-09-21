import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMotorcycleById } from '../data/mockBikes';

export default function VerifyPage() {
  const { bikeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (bikeId) {
      const found = getMotorcycleById(bikeId);
      if (found) {
        navigate(`/bike/${found.id}`, { replace: true });
      } else {
        navigate(`/bikes?q=${encodeURIComponent(bikeId)}`, { replace: true });
      }
    } else {
      navigate('/bikes', { replace: true });
    }
  }, [bikeId, navigate]);

  return (
    <div className="p-12 text-center text-xs text-slate-500">
      Locating motorcycle record...
    </div>
  );
}
