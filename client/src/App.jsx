import { useEffect, useState } from 'react';
import './App.css';

function getStatusColor(status) {
  switch (status) {
    case 'healthy':
      return '#22c55e'; // green
    case 'degraded':
      return '#eab308'; // yellow
    case 'down':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
}

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        if (!res.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await res.json();
        setServices(data.services);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e5e7eb', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        InsightFlow – Service Health
      </h1>
      <p style={{ marginBottom: '1.5rem', color: '#9ca3af' }}>
        Simple overview of your key systems and their current status.
      </p>

      {loading && <p>Loading services…</p>}
      {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                background: '#020617',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid #1f2937',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>{service.name}</h2>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: '#020617',
                    border: '1px solid #1f2937',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '999px',
                      background: getStatusColor(service.status),
                    }}
                  />
                  {service.status}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
                Response time:{' '}
                {service.responseTimeMs != null ? `${service.responseTimeMs} ms` : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
