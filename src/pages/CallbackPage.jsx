import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const code = searchParams.get('code');
    const guildId = searchParams.get('guild_id');

    if (guildId || code) {
      const timer = setTimeout(() => {
        setStatus('success');
        const redirectTimer = setTimeout(() => {
          navigate('/');
        }, 1500);
        return () => clearTimeout(redirectTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: "'Orbitron', sans-serif",
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h2 style={{ letterSpacing: '2px', fontWeight: 'bold', fontSize: '20px', textTransform: 'uppercase', marginBottom: '12px' }}>
        CONNECTION ESTABLISHED...
      </h2>
      <p style={{ color: '#888', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
        {status === 'verifying' ? 'VERIFYING AUTHORIZATION...' : 'BOT ADDED SUCCESSFULLY! REDIRECTING...'}
      </p>
    </div>
  );
}
