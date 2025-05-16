// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SavedSpot {
  id: number;
  url: string;
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  thumbnail?: string;
  created_at?: string;
}

const SavedSpotsList: React.FC = () => {
  const [spots, setSpots] = useState<SavedSpot[]>([]);

  useEffect(() => {
    // Fetch initial list
    const fetchSpots = async () => {
      const { data, error } = await supabase.from('saved_spots').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching spots:', error);
      else setSpots(data || []);
    };
    fetchSpots();

    // Subscribe to new inserts using Supabase v2 realtime API
    const channel = supabase
      .channel('public:saved_spots')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'saved_spots' },
        ({ new: newSpot }) => {
          setSpots(prev => [newSpot, ...prev]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <ul className="space-y-4">
      {spots.map((spot: SavedSpot) => (
        <li key={spot.id} className="p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            {spot.thumbnail && <img src={spot.thumbnail} alt={spot.title} className="w-16 h-16 object-cover rounded" />}
            <div>
              <h2 className="text-lg font-semibold">{spot.title}</h2>
              <p className="text-sm text-gray-600">{spot.url}</p>
              <div className="mt-2 flex space-x-2">
                {spot.category && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{spot.category}</span>}
                <select
                  className="border rounded px-2 py-1"
                  value={spot.priority || 0}
                  onChange={async e => {
                    const newPriority = Number(e.target.value);
                    await supabase.from('saved_spots').update({ priority: newPriority }).eq('id', spot.id);
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>
                      Priority {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SavedSpotsList; 