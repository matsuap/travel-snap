import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SharePage: React.FC = () => {
  const [params] = useSearchParams();
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

  return (
    <div className="p-4 text-center">
      {status === 'saving' && <p>スポットを保存中…</p>}
      {status === 'success' && <p>スポットを保存しました！</p>}
      {status === 'error' && <p>保存に失敗しました。後ほど再試行してください。</p>}
    </div>
  );
};

export default SharePage; 