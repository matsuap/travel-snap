// @ts-nocheck
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Share from './pages/Share';
import SavedSpotsList from './components/SavedSpotsList';
import { supabase } from './lib/supabase';
import './index.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize anonymous auth session
    supabase.auth.refreshSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share" element={<Share />} />
        <Route
          path="/"
          element={
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Saved Spots</h1>
              <SavedSpotsList />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 