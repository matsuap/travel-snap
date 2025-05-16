// @ts-nocheck
import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Share: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title') || '';
    const text = params.get('text') || '';
    const url = params.get('url') || '';

    async function saveSpot() {
      const { error } = await supabase.from('saved_spots').insert([{ title, description: text, url }]);
      if (error) console.error('Error saving shared spot:', error);
      else console.log('Shared spot saved successfully');
    }
    saveSpot();
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Thanks for sharing!</h1>
      <p>Your travel spot has been saved.</p>
    </div>
  );
};

export default Share; 