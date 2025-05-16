import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SharePage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const title = params.get('title') || '';
  const url = params.get('url') || '';
  const text = params.get('text') || '';
  const [status, setStatus] = useState<'saving' | 'success' | 'error'>('saving');

  useEffect(() => {
    async function saveSpot() {
      try {
        // Get current user
        const { data: { user }, error: getUserError } = await supabase.auth.getUser();
        if (getUserError) throw getUserError;
        const userId = user?.id;
        const { error } = await supabase
          .from('saved_spots')
          .insert({
            user_id: userId,
            url,
            title,
            thumbnail_url: null,
            category_tags: [],
            priority: 'B'
          });
        if (error) throw error;
        setStatus('success');
      } catch (err) {
        console.error('Insert error:', err);
        setStatus('error');
      }
    }
    saveSpot();
  }, [title, url, text]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="flex items-center justify-center h-screen p-4">
      {status === 'saving' && (
        <div className="text-lg flex flex-col items-center">
          <div className="border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin w-12 h-12 mb-4"></div>
          <p>スポットを保存中…</p>
        </div>
      )}
      {status === 'success' && (
        <div className="text-lg flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p>✅ スポットを保存しました！</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-lg flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p>❌ 保存に失敗しました。後ほど再試行してください。</p>
        </div>
      )}
    </div>
  );
};

export default SharePage; 